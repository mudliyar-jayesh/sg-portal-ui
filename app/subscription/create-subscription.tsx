"use client";

import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
  Box,
} from "@mui/material";
import { createSubscription } from "../api/subscription";

const CreateSubscriptionPage: React.FC = () => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const handleSubmit = async () => {
    if (name.trim() === "" || code.trim() === "") {
      setError("Both Name and Code are required.");
      setSnackbarOpen(true);
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    const response = await createSubscription({
      name,
      code,
      createdAt: "",
    });

    if ("message" in response) {
      setError(response.message);
      setSnackbarOpen(true); // Display error in Snackbar
    } else {
      setSuccess(true);
      setSnackbarOpen(true); // Display success message in Snackbar
    }

    setLoading(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    setError(null); // Reset error on Snackbar close
    setSuccess(false); // Reset success state on Snackbar close
  };

  return (
    <div className=" min-h-screen flex justify-center items-center bg-gray-100 p-[8.5px] md:p-0 overflow-hidden">
      <div className="max-w-lg md:w-11/12 mx-auto scroll-m-0 justify-center items-center drop-shadow-lg  p-4 bg-white rounded-xl hover:-translate-y-1 duration-200 hover:rounded-3xl hover:drop-shadow-2xl">
        <Typography
          variant="h4"
          className="font-medium mt-3 flex justify-center "
          gutterBottom
        >
          Create New Subscription
        </Typography>

        <Box mb={2}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
            disabled={loading}
          />
          <TextField
            label="Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            fullWidth
            margin="normal"
            disabled={loading}
          />
        </Box>
        <div className="justify-center flex">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={loading}
            fullWidth
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
            {loading ? <CircularProgress size={24} /> : "Create Subscription"}
          </Button>
        </div>
      </div>

      {/* Snackbar for error or success messages */}
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
        <div>
          {error && error.length > 0 && (
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
          )}
          {(error == null || error.length < 1) && success && (
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
              Subscription Created Successfully!
            </Alert>
          )}
        </div>
      </Snackbar>
    </div>
  );
};

export default CreateSubscriptionPage;
