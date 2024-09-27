"use client";

import { useState } from "react";
import { Button, TextField, Typography, CircularProgress, Snackbar, Alert } from "@mui/material";
import { mapUsersToTenant, UserTenantMapping } from "../api/tenant";

const MapUsersToTenant = () => {
  const [mappings, setMappings] = useState<UserTenantMapping[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleChange = (index: number, field: keyof UserTenantMapping, value: string | number) => {
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
    <div className="p-6 bg-white shadow-md rounded-md max-w-lg mx-auto">
      <Typography variant="h4" gutterBottom>Map Multiple Users to Tenant</Typography>

      {mappings.map((mapping, index) => (
        <div key={index}>
          <TextField label="User ID" fullWidth margin="normal" type="number" value={mapping.userId} onChange={(e) => handleChange(index, "userId", parseInt(e.target.value, 10))} />
          <TextField label="Tenant ID" fullWidth margin="normal" type="number" value={mapping.tenantId} onChange={(e) => handleChange(index, "tenantId", parseInt(e.target.value, 10))} />
        </div>
      ))}

      <Button variant="contained" color="secondary" fullWidth onClick={handleAddMapping} sx={{ mt: 2 }}>Add Another User</Button>

      <Button variant="contained" color="primary" fullWidth onClick={handleSubmit} disabled={loading} sx={{ mt: 2 }}>
        {loading ? <CircularProgress size={24} /> : "Map Users to Tenant"}
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

export default MapUsersToTenant;
