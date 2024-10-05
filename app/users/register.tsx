"use client";

import { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
  Stack,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { IRegisterUser, registerUser } from "../api/users";
import { inspiredPalette } from "../ui/theme";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";

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
  const [showPassword, setShowPassword] = useState(false);

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
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className=" min-h-screen flex justify-center pl-4 pr-4 pb-5 items-center bg-gradient-to-t from-white to-[#9dcce0] p-[8.5px] md:p-0 overflow-hidden">
      <div className="max-w-lg md:w-10/12 mx-auto scroll-m-0 justify-center items-center drop-shadow-lg pb-6 pr-6 pl-6 bg-gradient-to-t from-white to-[#c2eff5] rounded-xl hover:-translate-y-1 duration-200 hover:rounded-3xl hover:drop-shadow-2xl">
        <Stack alignItems={"center"} gap={0.2} mt={6}>
          <Typography
            sx={{
              fontSize: "1.7rem",
              fontWeight: 405,
              marginBottom: 1.5,
              marginTop: 5,
            }}
            color={inspiredPalette.darker}
          >
            Registration From
          </Typography>
        </Stack>
        <div className="pl-5 pr-5 md:pl-10 md:pr-10">
          <TextField
            label="Name"
            name="name"
            fullWidth
            onChange={handleChange}
            value={formData.name}
            margin="normal"
            error={!!formErrors.name}
            helperText={formErrors.name}
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
                    <PersonIcon aria-label="email or mobile icon" />
                  </InputAdornment>
                ),
              },
            }}
          />
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
                    <CallIcon aria-label="email or mobile icon" />
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"} // Conditionally set type
            fullWidth
            onChange={handleChange}
            value={formData.password}
            margin="normal"
            error={!!formErrors.password}
            helperText={formErrors.password}
            className="w-full mb-4"
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
                      onClick={togglePasswordVisibility}
                      aria-label="toggle password visibility"
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
            Register
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

export default Register;
