"use client";

import { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
  CircularProgress,
  Stack,
} from "@mui/material";
import { createTenant, Tenant } from "../api/tenant";
import { inspiredPalette } from "../ui/theme";

const CreateTenant = () => {
  const [tenantData, setTenantData] = useState<Tenant>({
    companyGuid: "",
    companyName: "",
    host: "",
    bmrmPort: 0,
    sgBizPort: 0,
    tallySyncPort: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTenantData({
      ...tenantData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const result = await createTenant(tenantData);
    setLoading(false);

    if (typeof result === "string") {
      setError(result);
      setSnackbarOpen(true);
    } else {
      setSuccessMessage("Tenant created successfully");
      setError(null);
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className=" min-h-screen flex justify-center pl-4 pr-4 pb-5 items-center bg-gradient-to-t from-white to-[#9dcce0] p-[8.5px] md:p-0 overflow-hidden">
      <div className="max-w-lg md:w-10/12 mx-auto scroll-m-0 justify-center items-center drop-shadow-lg pb-6 pr-6 pl-6 bg-gradient-to-t from-white to-[#c2eff5] rounded-xl hover:-translate-y-1 duration-200 hover:rounded-3xl hover:drop-shadow-2xl">
        <Stack alignItems={"center"} gap={0.2} mt={1}>
          <Typography
            sx={{
              fontSize: { xs: "1.5rem", sm: "1.7rem" },
              fontWeight: 405,
              marginBottom: 1.5,
              marginTop: 5,
            }}
            color={inspiredPalette.darker}
          >
            Create Tenant
          </Typography>
        </Stack>

        <TextField
          label="Company GUID"
          name="companyGuid"
          value={tenantData.companyGuid}
          onChange={handleChange}
          fullWidth
          margin="normal"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "18px",
            },
          }}
        />
        <TextField
          label="Company Name"
          name="companyName"
          value={tenantData.companyName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "18px",
            },
          }}
        />
        <TextField
          label="Host"
          name="host"
          value={tenantData.host}
          onChange={handleChange}
          fullWidth
          margin="normal"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "18px",
            },
          }}
        />
        <TextField
          label="BM/RM Port"
          name="bmrmPort"
          value={tenantData.bmrmPort}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="number"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "18px",
            },
          }}
        />
        <TextField
          label="SG Biz Port"
          name="sgBizPort"
          value={tenantData.sgBizPort}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="number"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "18px",
            },
          }}
        />
        <TextField
          label="Tally Sync Port"
          name="tallySyncPort"
          value={tenantData.tallySyncPort}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="number"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "18px",
            },
          }}
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
              width: { xs: "70%", md: "80%" },
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
            {loading ? <CircularProgress size={24} /> : "Create Tenant"}
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

export default CreateTenant;
