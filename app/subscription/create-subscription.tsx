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
    <div className="p-6 bg-white shadow-md rounded-md max-w-lg mx-auto">
      <Typography variant="h4" gutterBottom>
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

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={loading}
        fullWidth
        sx={{ mt: 2 }}
      >
        {loading ? <CircularProgress size={24} /> : "Create Subscription"}
      </Button>

      {/* Snackbar for error or success messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
      >
        <div>
          {error && error.length > 0 && (
            <Alert
              onClose={handleCloseSnackbar}
              severity="error"
              sx={{ width: "100%" }}
            >
              {error}
            </Alert>
          )}
          {(error == null || error.length < 1) && success && (
            <Alert
              onClose={handleCloseSnackbar}
              severity="success"
              sx={{ width: "100%" }}
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
