"use client";

import { useState } from "react";
import { Button, TextField, Typography, CircularProgress, Snackbar, Alert } from "@mui/material";
import { mapUserToTenant, UserTenantMapping } from "../api/tenant";

const MapUserToTenant = () => {
  const [mappingData, setMappingData] = useState<UserTenantMapping>({ userId: 0, tenantId: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMappingData({
      ...mappingData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const result = await mapUserToTenant(mappingData);
    setLoading(false);

    if (typeof result === "string") {
      setError(result);
      setSnackbarOpen(true);
    } else {
      setSuccessMessage("User successfully mapped to tenant");
      setError(null);
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md max-w-lg mx-auto">
      <Typography variant="h4" gutterBottom>Map User to Tenant</Typography>

      <TextField label="User ID" name="userId" fullWidth margin="normal" type="number" onChange={handleChange} />
      <TextField label="Tenant ID" name="tenantId" fullWidth margin="normal" type="number" onChange={handleChange} />

      <Button variant="contained" color="primary" fullWidth onClick={handleSubmit} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : "Map User to Tenant"}
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

export default MapUserToTenant;
