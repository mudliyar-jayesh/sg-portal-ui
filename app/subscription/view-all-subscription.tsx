import React, { useEffect, useState } from "react";
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
  Box,
} from "@mui/material";
import { Subscription, getAllSubscriptions } from "../api/subscription";

const SubscriptionsPage: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[] | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  useEffect(() => {
    const fetchSubscriptions = async () => {
      setLoading(true);
      const response = await getAllSubscriptions();
      if ("message" in response) {
        setError(response.message);
        setSnackbarOpen(true); // Open Snackbar for error
      } else {
        setSubscriptions(response);
      }
      setLoading(false);
    };

    fetchSubscriptions();
  }, []);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-md max-w-lg mx-auto">
      <Typography variant="h4" className="mb-4">
        Subscriptions
      </Typography>

      {subscriptions && subscriptions.length > 0 ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subscriptions.map((subscription) => (
              <TableRow key={subscription.id}>
                <TableCell>{subscription.id}</TableCell>
                <TableCell>{subscription.name}</TableCell>
                <TableCell>{subscription.code}</TableCell>
                <TableCell>
                  {new Date(subscription.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography>No subscriptions available.</Typography>
      )}

      {/* Snackbar for error message */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
      >
        <div>
          {error && (
            <Alert
              onClose={handleCloseSnackbar}
              severity="error"
              sx={{ width: "100%" }}
            >
              {error}
            </Alert>
          )}
        </div>
      </Snackbar>
    </div>
  );
};

export default SubscriptionsPage;
