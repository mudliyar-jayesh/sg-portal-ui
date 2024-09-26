"use client";

import { useEffect, useState } from "react";
import {
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
  Box,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { getUserProfile, IUser } from "../api/users";

const Profile = () => {
  const [profile, setProfile] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // Add success state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please login.");
        setSnackbarOpen(true);
        setLoading(false);
        router.push("/login"); // Redirect to login page if no token
        return;
      }

      const result = await getUserProfile();
      if (typeof result === "string") {
        setError(result);
        setSnackbarOpen(true);
      } else {
        setProfile(result);
        setSuccessMessage("Profile loaded successfully!"); // Show success message
        setSnackbarOpen(true); // Open Snackbar on success
      }
      setLoading(false);
    };

    fetchProfile();
  }, [router]);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    setError(null); // Reset error when snackbar closes
    setSuccessMessage(null); // Reset success message
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh" // Center spinner vertically and horizontally
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      {profile ? (
        <>
          <Typography>Email: {profile.email}</Typography>
          <Typography>Name: {profile.name}</Typography>
          <Typography>Mobile Number: {profile.mobile_number}</Typography>
          <Typography>User Type: {profile.type}</Typography>
        </>
      ) : (
        <Typography color="error">No profile data available.</Typography>
      )}

      {/* Conditionally render the Snackbar only when there's a message */}
      {(error || successMessage) && (
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
        >
          {error ? (
            <Alert
              onClose={handleCloseSnackbar}
              severity="error"
              sx={{ width: "100%" }}
            >
              {error}
            </Alert>
          ) : (
            <Alert
              onClose={handleCloseSnackbar}
              severity="success"
              sx={{ width: "100%" }}
            >
              {successMessage}
            </Alert>
          )}
        </Snackbar>
      )}
    </div>
  );
};

export default Profile;
