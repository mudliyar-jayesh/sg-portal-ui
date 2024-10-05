"use client";

import { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
  Stack,
} from "@mui/material";
import { deleteUserTenantMapping } from "../api/tenant";
import { inspiredPalette } from "../ui/theme";

const DeleteUserTenantMapping = () => {
  const [userId, setUserId] = useState<number>(0);
  const [tenantId, setTenantId] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const result = await deleteUserTenantMapping(userId, tenantId);
    setLoading(false);

    if (typeof result === "string") {
      setError(result);
      setSnackbarOpen(true);
    } else {
      setSuccessMessage("User-Tenant mapping deleted successfully");
      setError(null);
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className=" min-h-screen flex justify-center pl-4 pr-4 pb-5 items-center bg-gradient-to-t from-white to-[#9dcce0] p-[8.5px] md:p-0 overflow-hidden">
      <div className="max-w-lg md:w-10/12 mx-auto scroll-m-0 justify-center items-center drop-shadow-lg pb-6 pr-6 pl-6 bg-gradient-to-t from-white to-[#c2eff5] rounded-xl hover:-translate-y-1 duration-200 hover:rounded-3xl hover:drop-shadow-2xl">
        <Stack alignItems={"center"} gap={0.2} mt={4} mb={2}>
          <Typography
            sx={{
              fontSize: "2rem",
              fontWeight: 400,
              marginTop: 1,
            }}
            color={inspiredPalette.darker}
          >
            Delete user
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: "1.2rem", fontWeight: 405 }}
            color={inspiredPalette.darkTextGrey}
          >
            Tenant Mapping
          </Typography>
        </Stack>
        <div className="pl-5 pr-5 md:pl-10 md:pr-10">
          <TextField
            label="User ID"
            fullWidth
            margin="normal"
            type="number"
            value={userId}
            onChange={(e) => setUserId(parseInt(e.target.value, 10))}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "18px", // Custom border radius
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Default shadow

                transition: "all 0.3s ease-in-out", // Smooth transition for hover effect
                "&:hover": {
                  boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)", // Stronger shadow on hover
                  backgroundColor: "rgba(255, 255, 255, 0.8)", // Slightly less transparency on hover
                },
              },
            }}
          />
          <TextField
            label="Tenant ID"
            fullWidth
            margin="normal"
            type="number"
            value={tenantId}
            onChange={(e) => setTenantId(parseInt(e.target.value, 10))}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "18px", // Custom border radius
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Default shadow

                transition: "all 0.3s ease-in-out", // Smooth transition for hover effect
                "&:hover": {
                  boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)", // Stronger shadow on hover
                  backgroundColor: "rgba(255, 255, 255, 0.8)", // Slightly less transparency on hover
                },
              },
            }}
          />
        </div>
        <div className="justify-center flex">
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            disabled={loading}
            sx={{
              mt: 2,
              mb: 2,
              padding: {
                xs: "8px 12px",
                sm: "10px 16px",
              },
              width: { xs: "65%", md: "80%" },
              borderRadius: "12px",
              backgroundImage:
                "linear-gradient(90deg, #42A5F5 0%, #1E88E5 100%)", // Gradient background
              color: "white",
              fontWeight: "1rem",
              fontSize: "1rem",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
                backgroundImage:
                  "linear-gradient(90deg, #2196F3 0%, #1565C0 100%)", // Darker gradient on hover
                transform: "translateY(-2px)",
              },
              textTransform: "capitalize",
              marginTop: 4,
            }}
          >
            {loading ? <CircularProgress size={24} /> : "Delete Mapping"}
          </Button>
        </div>
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        sx={{
          "& .MuiSnackbarContent-root": {
            backgroundColor: error ? "error.main" : "success.main",
            borderRadius: "10px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            padding: "12px 16px",
            fontSize: "1rem",
            color: "white",
            transition: "all 0.3s ease-in-out",
          },
          "& .MuiAlert-root": {
            borderRadius: "10px",
          },
        }}
      >
        {error ? (
          <Alert
            onClose={handleCloseSnackbar}
            severity="error"
            sx={{
              width: "100%",
              fontSize: "1rem",
              fontWeight: "bold",
              padding: "10px 16px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Adding shadow
            }}
          >
            {error}
          </Alert>
        ) : (
          <Alert
            onClose={handleCloseSnackbar}
            severity="success"
            sx={{
              width: "100%",
              fontSize: "1rem",
              fontWeight: "bold",
              padding: "10px 16px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Adding shadow
            }}
          >
            {successMessage}
          </Alert>
        )}
      </Snackbar>
    </div>
  );
};

export default DeleteUserTenantMapping;
