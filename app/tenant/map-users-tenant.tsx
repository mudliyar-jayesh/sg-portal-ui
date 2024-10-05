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
import { mapUsersToTenant, UserTenantMapping } from "../api/tenant";
import { inspiredPalette } from "../ui/theme";

const MapUsersToTenant = () => {
  const [mappings, setMappings] = useState<UserTenantMapping[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleChange = (
    index: number,
    field: keyof UserTenantMapping,
    value: string | number
  ) => {
    const newMappings = [...mappings];
    newMappings[index] = {
      ...newMappings[index],
      [field]: value,
    };
    setMappings(newMappings);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const result = await mapUsersToTenant(mappings);
    setLoading(false);

    if (typeof result === "string") {
      setError(result);
      setSnackbarOpen(true);
    } else {
      setSuccessMessage("Users successfully mapped to tenant");
      setError(null);
      setSnackbarOpen(true);
    }
  };

  const handleAddMapping = () => {
    setMappings([...mappings, { userId: 0, tenantId: 0 }]);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="min-h-screen flex justify-center p-4 items-center bg-gradient-to-t from-white to-[#9dcce0] overflow-hidden">
      <div className="max-w-lg w-full mx-auto flex flex-col justify-center items-center drop-shadow-lg pb-6 pr-6 pl-6 bg-gradient-to-t from-white to-[#c2eff5] rounded-xl hover:-translate-y-1 duration-200 hover:rounded-3xl hover:drop-shadow-2xl">
        <Stack alignItems={"center"} gap={0.2} mt={4} mb={2}>
          <Typography
            sx={{
              fontSize: "2rem",
              fontWeight: 400,
              marginTop: 1,
            }}
            color={inspiredPalette.darker}
          >
            Map Multiple
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: "1.2rem", fontWeight: 405 }}
            color={inspiredPalette.darkTextGrey}
          >
            Users to Tenant
          </Typography>
        </Stack>

        {mappings.map((mapping, index) => (
          <div key={index}>
            <TextField
              label="User ID"
              fullWidth
              margin="normal"
              type="number"
              value={mapping.userId}
              onChange={(e) =>
                handleChange(index, "userId", parseInt(e.target.value, 10))
              }
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
              value={mapping.tenantId}
              onChange={(e) =>
                handleChange(index, "tenantId", parseInt(e.target.value, 10))
              }
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
        ))}
        <div className="justify-center flex  mt-7 md:md-7 flex-col gap-3 md:flex-row  w-full">
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={handleAddMapping}
            sx={{
              mt: { xs: 0, md: 0 }, // Margin top for mobile view only
              mb: { xs: 0, md: 2 },
              padding: {
                xs: "10px 16px", // Consistent padding for mobile
                sm: "10px 16px",
              },
              borderRadius: "12px",
              backgroundImage:
                "linear-gradient(to left bottom, #ff7272, #ff6a5e, #ff6448, #ff602e, #fe5e00)", // New gradient background
              color: "white",
              fontWeight: "1rem",
              fontSize: "1rem",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
                backgroundImage:
                  "linear-gradient(to left bottom, #ff7272, #ff6a5e, #ff6448, #ff602e, #fe5e00)", // Keep the same gradient on hover or adjust if needed
                transform: "translateY(-2px)",
              },
              textTransform: "capitalize",
            }}
          >
            Add Another User
          </Button>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            disabled={loading}
            sx={{
              mt: { xs: 0, md: 0 }, // Margin top for mobile view only
              mb: 2,
              padding: {
                xs: "10px 16px", // Consistent padding for mobile
                sm: "10px 16px",
              },
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
            }}
          >
            {loading ? <CircularProgress size={24} /> : "Map Users to Tenant"}
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

export default MapUsersToTenant;
