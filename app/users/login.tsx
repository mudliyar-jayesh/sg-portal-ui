"use client";

import { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { ILoginUser, loginUser } from "../api/users";

// Utility function to validate email format
const validateEmail = (email: string): boolean => {
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return re.test(String(email).toLowerCase());
};

const Login = () => {
  const [formData, setFormData] = useState<ILoginUser>({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Password visibility toggle
  const router = useRouter();

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault(); // Prevent focus from leaving the field when clicking the toggle button
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

  // Function to validate the form fields
  const validateForm = (): boolean => {
    const errors = {
      email: "",
      password: "",
    };

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      errors.email = "Invalid email format";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    }

    setFormErrors(errors);

    // Return true if no errors
    return Object.keys(errors).every(
      (key) => errors[key as keyof typeof errors] === ""
    );
  };

  const handleSubmit = async () => {
    // Validate form
    if (!validateForm()) {
      setError("Please fix the validation errors.");
      setSnackbarOpen(true); // Show error messages
      return;
    }

    // Encode the password using base64
    const encodedPassword = btoa(formData.password);

    const formDataWithEncodedPassword = {
      ...formData,
      password: encodedPassword,
    };

    // Call login API
    const result = await loginUser(formDataWithEncodedPassword);
    if (typeof result === "string") {
      setError(result); // Set error message if login fails (API error)
      setSnackbarOpen(true); // Show snackbar
    } else {
      localStorage.setItem("token", result.token); // Save token in localStorage
      setSuccessMessage("Login successful!");
      setError(null);
      setSnackbarOpen(true); // Show success message
      router.push("/profile"); // Navigate to profile page
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>

      {/* Email Field */}
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

      {/* Password Field with Toggle */}
      <TextField
        label="Password"
        name="password"
        type={showPassword ? "text" : "password"} // Toggle between text and password
        fullWidth
        onChange={handleChange}
        value={formData.password}
        margin="normal"
        error={!!formErrors.password}
        helperText={formErrors.password}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
        sx={{ mt: 2 }}
      >
        Login
      </Button>

      {/* Snackbar for error or success message */}
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
            {error || formErrors.email || formErrors.password}
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
    </div>
  );
};

export default Login;
