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
  Stack,
  InputAdornment,
} from "@mui/material";
import { createSubscription } from "../api/subscription";
import { inspiredPalette } from "../ui/theme";
import PersonIcon from "@mui/icons-material/Person";
import CodeIcon from "@mui/icons-material/Code";

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
    <div className=" min-h-screen flex justify-center pl-4 pr-4 pb-5 items-center bg-gradient-to-t from-white to-[#9dcce0] p-[8.5px] md:p-0 overflow-hidden">
      <div className="max-w-lg md:w-10/12 mx-auto scroll-m-0 justify-center items-center drop-shadow-lg pb-6 pr-6 pl-6 bg-gradient-to-t from-white to-[#c2eff5] rounded-xl hover:-translate-y-1 duration-200 hover:rounded-3xl hover:drop-shadow-2xl">
        <Stack alignItems={"center"} gap={0.2} mt={6}>
          <Typography
            sx={{
              fontSize: "2rem",
              fontWeight: 405,
              marginTop: 1,
              color: "sky-blue",
            }}
            color={inspiredPalette.darker}
          >
            Create New
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: "1.2rem", fontWeight: 405 }}
            color={inspiredPalette.darkTextGrey}
          >
            Subscription
          </Typography>
        </Stack>
        <div className="pl-5 pr-5 md:pl-10 md:pr-10">
          <Box mb={2}>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              margin="normal"
              disabled={loading}
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
              label="Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              fullWidth
              margin="normal"
              disabled={loading}
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
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <CodeIcon aria-label="email or mobile icon" />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>
        </div>
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
