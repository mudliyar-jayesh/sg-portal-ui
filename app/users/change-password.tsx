"use client";

import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { IPasswordChange, changePassword } from "../api/users";

// Utility function to encode the password in base64
const encodeBase64 = (input: string) => {
  return btoa(input);
};

// Define an interface for form errors
interface FormErrors {
  old_password: string;
  new_password: string;
  email_id: string;
}

const ChangePassword = () => {
  const [formData, setFormData] = useState<IPasswordChange>({
    old_password: "",
    new_password: "",
    email_id: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    old_password: "",
    new_password: "",
    email_id: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Utility function to validate email format
  const validateEmail = (email: string): boolean => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
  };

  // Function to validate form fields
  const validateForm = (): boolean => {
    const errors: FormErrors = {
      old_password: "",
      new_password: "",
      email_id: "",
    };

    if (!formData.old_password) {
      errors.old_password = "Old password is required";
    }

    if (!formData.new_password) {
      errors.new_password = "New password is required";
    } else if (formData.new_password.length < 6) {
      errors.new_password = "New password must be at least 6 characters";
    }

    if (!formData.email_id) {
      errors.email_id = "Email is required";
    } else if (!validateEmail(formData.email_id)) {
      errors.email_id = "Invalid email format";
    }

    setFormErrors(errors);

    // Return true if no errors
    return Object.keys(errors).every(
      (key) => errors[key as keyof FormErrors] === ""
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Reset specific field error when typing
    setFormErrors({
      ...formErrors,
      [e.target.name]: "",
    });
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return; // If validation fails, do not proceed
    }

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    // Encode the passwords as base64 before submitting
    const encodedOldPassword = encodeBase64(formData.old_password);
    const encodedNewPassword = encodeBase64(formData.new_password);

    const result = await changePassword({
      old_password: encodedOldPassword,
      new_password: encodedNewPassword,
      email_id: formData.email_id,
    });

    setLoading(false);

    if (typeof result === "string") {
      setError(result);
      setSnackbarOpen(true);
    } else {
      setSuccessMessage("Password changed successfully");
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
          Change Password
        </Typography>

        {/* Email Field */}
        <TextField
          label="Email"
          name="email_id"
          type="email"
          fullWidth
          onChange={handleChange}
          value={formData.email_id}
          margin="normal"
          error={!!formErrors.email_id}
          helperText={formErrors.email_id}
          disabled={loading}
        />

        {/* Old Password Field */}
        <TextField
          label="Old Password"
          name="old_password"
          type="password"
          fullWidth
          onChange={handleChange}
          value={formData.old_password}
          margin="normal"
          error={!!formErrors.old_password}
          helperText={formErrors.old_password}
          disabled={loading}
        />

        {/* New Password Field */}
        <TextField
          label="New Password"
          name="new_password"
          type="password"
          fullWidth
          onChange={handleChange}
          value={formData.new_password}
          margin="normal"
          error={!!formErrors.new_password}
          helperText={formErrors.new_password}
          disabled={loading}
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
            {loading ? <CircularProgress size={24} /> : "Change Password"}
          </Button>
        </div>
      </div>

      {/* Snackbar for error or success message */}
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

export default ChangePassword;
