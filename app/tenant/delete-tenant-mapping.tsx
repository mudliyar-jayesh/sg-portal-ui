"use client";

import { useState } from "react";
import { Button, TextField, Typography, CircularProgress, Snackbar, Alert } from "@mui/material";
import { deleteUserTenantMapping } from "../api/tenant";

const DeleteUserTenantMapping = () => {
  const [userId, setUserId] = useState<number>(0);
  const [tenantId, setTenantId] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const result = await deleteUserTenantMapping(userId, tenantId);
    setLoading(false);

    if (typeof result === "string") {
      setError(result);
      setSnackbarOpen(true);
    } else {
      setSuccessMessage("User-Tenant mapping deleted successfully");
      setError(null);
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md max-w-lg mx-auto">
      <Typography variant="h4" gutterBottom>Delete User-Tenant Mapping</Typography>

      <TextField label="User ID" fullWidth margin="normal" type="number" value={userId} onChange={(e) => setUserId(parseInt(e.target.value, 10))} />
      <TextField label="Tenant ID" fullWidth margin="normal" type="number" value={tenantId} onChange={(e) => setTenantId(parseInt(e.target.value, 10))} />

      <Button variant="contained" color="primary" fullWidth onClick={handleSubmit} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : "Delete Mapping"}
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

export default DeleteUserTenantMapping;
