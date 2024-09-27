"use client";

import { useEffect, useState } from "react";
import {
  CircularProgress,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Snackbar,
  Alert,
} from "@mui/material";
import { Tenant, getAllTenants } from "../api/tenant";

const TenantList = () => {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetchTenants = async () => {
      setLoading(true);
      const result = await getAllTenants();
      setLoading(false);

      if (typeof result === "string") {
        setError(result);
        setSnackbarOpen(true);
      } else {
        setTenants(result);
      }
    };

    fetchTenants();
  }, []);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md max-w-lg mx-auto">
      <Typography variant="h4" gutterBottom>
        Tenant List
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : tenants.length > 0 ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell>Host</TableCell>
              <TableCell>Ports</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tenants.map((tenant) => (
              <TableRow key={tenant.id}>
                <TableCell>{tenant.id}</TableCell>
                <TableCell>{tenant.companyName}</TableCell>
                <TableCell>{tenant.host}</TableCell>
                <TableCell>
                  BM/RM: {tenant.bmrmPort}, SG Biz: {tenant.sgBizPort}, Tally
                  Sync: {tenant.tallySyncPort}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography>No tenants available</Typography>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
      >
        <div>
          {error && (
            <Alert onClose={handleCloseSnackbar} severity="error">
              {error}
            </Alert>
          )}
        </div>
      </Snackbar>
    </div>
  );
};

export default TenantList;
