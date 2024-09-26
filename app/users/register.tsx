"use client";

import { useState } from "react";
import { Button, TextField, Typography, Snackbar, Alert } from "@mui/material";
import { IRegisterUser, registerUser } from "../api/users";

// Utility function to validate email format
const validateEmail = (email: string): boolean => {
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return re.test(String(email).toLowerCase());
};

// Define an interface for form errors
interface FormErrors {
  email: string;
  name: string;
  mobile_number: string;
  password: string;
}

const Register = () => {
  const [formData, setFormData] = useState<IRegisterUser>({
    email: "",
    name: "",
    mobile_number: "",
    password: "",
    type: "client", // or 'system'
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    email: "",
    name: "",
    mobile_number: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Function to validate form fields
  const validateForm = (): boolean => {
    const errors: FormErrors = {
      email: "",
      name: "",
      mobile_number: "",
      password: "",
    };
    
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      errors.email = "Invalid email format";
    }

    if (!formData.name) {
      errors.name = "Name is required";
    }

    if (!formData.mobile_number) {
      errors.mobile_number = "Mobile number is required";
    } else if (!/^\d{10,15}$/.test(formData.mobile_number)) {
      errors.mobile_number = "Mobile number must be 10-15 digits";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setFormErrors(errors);

    // Return true if no errors
    return Object.keys(errors).every((key) => errors[key as keyof FormErrors] === "");
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

    // Encode the password as base64 before submitting
    const encodedPassword = btoa(formData.password);

    // Create a new object with the encoded password
    const submitData = {
      ...formData,
      password: encodedPassword,
    };

    const result = await registerUser(submitData);
    if (typeof result === "string") {
      setError(result);
      setSnackbarOpen(true);
    } else {
      setSuccessMessage("User registered successfully");
      setError(null);
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>

      <TextField
        label="Email"
        name="email"
        fullWidth
        onChange={handleChange}
        value={formData.email}
        margin="normal"
        error={!!formErrors.email}
        helperText={formErrors.email}
      />
      <TextField
        label="Name"
        name="name"
        fullWidth
        onChange={handleChange}
        value={formData.name}
        margin="normal"
        error={!!formErrors.name}
        helperText={formErrors.name}
      />
      <TextField
        label="Mobile Number"
        name="mobile_number"
        fullWidth
        inputMode="tel"
        onChange={handleChange}
        value={formData.mobile_number}
        margin="normal"
        error={!!formErrors.mobile_number}
        helperText={formErrors.mobile_number}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        fullWidth
        onChange={handleChange}
        value={formData.password}
        margin="normal"
        error={!!formErrors.password}
        helperText={formErrors.password}
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
        sx={{ mt: 2 }}
      >
        Register
      </Button>

      {/* Snackbar for error or success message */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
      >
        {error ? (
          <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        ) : (
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
            {successMessage}
          </Alert>
        )}
      </Snackbar>
    </div>
  );
};

export default Register;
