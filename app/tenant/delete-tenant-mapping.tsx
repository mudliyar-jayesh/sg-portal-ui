"use client";

import { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { deleteUserTenantMapping } from "../api/tenant";

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
    <div className=" min-h-screen flex justify-center items-center bg-gray-100 p-[8.5px] md:p-0 overflow-hidden">
      <div className="max-w-lg md:w-11/12 mx-auto scroll-m-0 justify-center items-center drop-shadow-lg  p-4 bg-white rounded-xl hover:-translate-y-1 duration-200 hover:rounded-3xl hover:drop-shadow-2xl">
        <Typography
          variant="h4"
          className="font-medium mt-3 flex justify-center "
          gutterBottom
        >
          Delete User-Tenant Mapping
        </Typography>

        <TextField
          label="User ID"
          fullWidth
          margin="normal"
          type="number"
          value={userId}
          onChange={(e) => setUserId(parseInt(e.target.value, 10))}
        />
        <TextField
          label="Tenant ID"
          fullWidth
          margin="normal"
          type="number"
          value={tenantId}
          onChange={(e) => setTenantId(parseInt(e.target.value, 10))}
        />
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
              width: { xs: "90%", md: "100%" },
              borderRadius: "12px",
              backgroundColor: "primary.main",
              color: "white",
              fontWeight: "1rem",
              fontSize: "1rem",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
                backgroundColor: "primary.dark",
                transform: "translateY(-2px)",
              },
              textTransform: "capitalize",
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
