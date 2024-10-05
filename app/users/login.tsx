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
  Stack,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { ILoginUser, loginUser } from "../api/users";
import { inspiredPalette } from "../ui/theme";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

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

  // Navigate to the "Change Password" page
  const handleForgotPassword = () => {
    router.push("/change-password");
  };

  return (
    <div className=" min-h-screen flex justify-center pl-4 pr-4 pb-5 items-center bg-gradient-to-t from-white to-[#9dcce0] p-[8.5px] md:p-0 overflow-hidden">
      <div className="max-w-lg md:w-10/12 mx-auto scroll-m-0 justify-center items-center drop-shadow-lg pb-6 pr-6 pl-6 bg-gradient-to-t from-white to-[#d8f7fb] rounded-xl hover:-translate-y-1 duration-200 hover:rounded-3xl hover:drop-shadow-2xl">
        <Stack alignItems={"center"} gap={0.2} mt={6}>
          <Typography
            sx={{ fontSize: "1.7rem", fontWeight: 400 }}
            color={inspiredPalette.darker}
          >
            Welcome To BizOpp
          </Typography>
          <Typography variant="body1" color={inspiredPalette.darkTextGrey}>
            Your Decision Making Buddy
          </Typography>
          <Typography
            sx={{
              fontSize: "1.7rem",
              fontWeight: "1.2rem",
              marginBottom: 1,
              marginTop: 5,
            }}
            color={inspiredPalette.darker}
          >
            Login
          </Typography>
        </Stack>
        {/* Email Field */}
        <div className="pl-5 pr-5 md:pl-10 md:pr-10">
          <TextField
            label="Email"
            name="email"
            fullWidth
            onChange={handleChange}
            value={formData.email}
            margin="normal"
            error={!!formErrors.email}
            helperText={formErrors.email}
            className="w-full mb-4"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "18px",
              },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon aria-label="email or mobile icon" />
                  </InputAdornment>
                ),
              },
            }}
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
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "18px",
              },
            }}
            slotProps={{
              input: {
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
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon aria-label="email or mobile icon" />
                  </InputAdornment>
                ),
              },
            }}
          />
        </div>
        <Typography
          variant="body2"
          color="primary"
          align="right"
          sx={{ mr: { xs: 3, md: 6 }, cursor: "pointer" }}
          onClick={handleForgotPassword} // Trigger navigation to change password page
        >
          Forgot Password?
        </Typography>

        {/* Login Button */}
        <div className="justify-center flex">
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            sx={{
              mt: 2,
              mb: 2,
              padding: {
                xs: "8px 12px",
                sm: "10px 16px",
              },
              width: { xs: "60%", md: "80%" },
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
            Login
          </Button>
        </div>
      </div>

      {/* Forgot Password Link */}

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
            {error || formErrors.email || formErrors.password}
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

export default Login;
