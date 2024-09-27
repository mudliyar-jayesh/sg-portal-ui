"use client";

import { useState } from "react";
import { Button, TextField, Typography, CircularProgress, Snackbar, Alert } from "@mui/material";
import { updateTenant } from "../api/tenant";

const UpdateTenant = ({ tenantId }: { tenantId: number }) => {
  const [tenantUpdates, setTenantUpdates] = useState<Partial<{ companyName: string; host: string; bmrmPort: number; sgBizPort: number; tallySyncPort: number }>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTenantUpdates({
      ...tenantUpdates,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const result = await updateTenant(tenantId, tenantUpdates);
    setLoading(false);

    if (typeof result === "string") {
      setError(result);
      setSnackbarOpen(true);
    } else {
      setSuccessMessage("Tenant updated successfully");
      setError(null);
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md max-w-lg mx-auto">
      <Typography variant="h4" gutterBottom>Update Tenant</Typography>

      <TextField label="Company Name" name="companyName" fullWidth margin="normal" onChange={handleChange} />
      <TextField label="Host" name="host" fullWidth margin="normal" onChange={handleChange} />
      <TextField label="BM/RM Port" name="bmrmPort" fullWidth margin="normal" type="number" onChange={handleChange} />
      <TextField label="SG Biz Port" name="sgBizPort" fullWidth margin="normal" type="number" onChange={handleChange} />
      <TextField label="Tally Sync Port" name="tallySyncPort" fullWidth margin="normal" type="number" onChange={handleChange} />

      <Button variant="contained" color="primary" fullWidth onClick={handleSubmit} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : "Update Tenant"}
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

export default UpdateTenant;
