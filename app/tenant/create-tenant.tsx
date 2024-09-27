"use client";

import { useState } from "react";
import { Button, TextField, Typography, Snackbar, Alert, CircularProgress } from "@mui/material";
import { createTenant, Tenant } from "../api/tenant";

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
    <div className="p-6 bg-white shadow-md rounded-md max-w-lg mx-auto">
      <Typography variant="h4" gutterBottom>Create Tenant</Typography>

      <TextField
        label="Company GUID"
        name="companyGuid"
        value={tenantData.companyGuid}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Company Name"
        name="companyName"
        value={tenantData.companyName}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Host"
        name="host"
        value={tenantData.host}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="BM/RM Port"
        name="bmrmPort"
        value={tenantData.bmrmPort}
        onChange={handleChange}
        fullWidth
        margin="normal"
        type="number"
      />
      <TextField
        label="SG Biz Port"
        name="sgBizPort"
        value={tenantData.sgBizPort}
        onChange={handleChange}
        fullWidth
        margin="normal"
        type="number"
      />
      <TextField
        label="Tally Sync Port"
        name="tallySyncPort"
        value={tenantData.tallySyncPort}
        onChange={handleChange}
        fullWidth
        margin="normal"
        type="number"
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
        disabled={loading}
        sx={{ mt: 2 }}
      >
        {loading ? <CircularProgress size={24} /> : "Create Tenant"}
      </Button>

      <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={handleCloseSnackbar}>
        {error ? (
          <Alert onClose={handleCloseSnackbar} severity="error">{error}</Alert>
        ) : (
          <Alert onClose={handleCloseSnackbar} severity="success">{successMessage}</Alert>
        )}
      </Snackbar>
    </div>
  );
};

export default CreateTenant;
