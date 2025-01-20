import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Divider,
  Badge,
} from "@mui/material";
import { AccessTime, Done, Pending } from "@mui/icons-material";
import { getRecentActivities } from "../api";

const InvoiceDash = () => {
  const [invoices, setInvoices] = useState([]);
  const [receipts, setReceipts] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const activities = await getRecentActivities();
        setInvoices(
          activities.filter((activity) => activity.status !== "paid")
        );
        setReceipts(
          activities.filter((activity) => activity.status === "paid")
        );
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };

    fetchInvoices();
  }, []);

  const getStatusDot = (status) => {
    switch (status) {
      case "pending":
        return <Chip label="Pending" color="warning" size="small" />;
      case "reminderDue":
        return <Chip label="Follow-Up" color="error" size="small" />;
      case "paid":
        return <Chip label="Paid" color="success" size="small" />;
      default:
        return <Chip label="Unknown" size="small" />;
    }
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: "2rem" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Invoice Dashboard
      </Typography>

      {/* Invoice List Section */}
      <Box sx={{ marginBottom: "2rem" }}>
        <Typography variant="h6">Invoice List</Typography>
        <List>
          {invoices.map((invoice) => (
            <ListItem
              key={invoice.$Id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                border: "1px solid #ddd",
                borderRadius: "5px",
                marginBottom: "0.5rem",
                padding: "1rem",
              }}
            >
              <ListItemText
                primary={invoice.invoiceData.title}
                secondary={`Invoice title: ${invoice.invoiceData.to}`}
              />
              <ListItemIcon>
                {getStatusDot(invoice.invoiceData.status)}
              </ListItemIcon>
            </ListItem>
          ))}
        </List>
        <Link to="/invoiceForm" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="primary">
            New Invoice
          </Button>
        </Link>
      </Box>

      <Divider sx={{ marginY: "2rem" }} />

      {/* Scheduled Invoices Section */}
      <Box sx={{ marginBottom: "2rem" }}>
        <Typography variant="h6">Scheduled Invoices</Typography>
        <List>
          {invoices
            .filter((invoice) => invoice.invoiceData.status !== "paid")
            .map((invoice) => (
              <ListItem
                key={invoice.$Id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  marginBottom: "0.5rem",
                  padding: "1rem",
                }}
              >
                <ListItemText
                  primary={invoice.invoiceData.title}
                  secondary={`Due Date: ${invoice.invoiceData.dueDate}`}
                />
                <ListItemIcon>
                  {invoice.invoiceData.status === "pending" ? (
                    <Badge
                      badgeContent={<AccessTime />}
                      color="warning"
                      overlap="circular"
                    />
                  ) : (
                    <Badge
                      badgeContent={<Pending />}
                      color="error"
                      overlap="circular"
                    />
                  )}
                </ListItemIcon>
              </ListItem>
            ))}
        </List>
      </Box>

      <Divider sx={{ marginY: "2rem" }} />

      {/* Receipts Section */}
      <Box>
        <Typography variant="h6">Receipts</Typography>
        <List>
          {receipts.length > 0 ? (
            receipts.map((receipt) => (
              <ListItem
                key={receipt.$id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  marginBottom: "0.5rem",
                  padding: "1rem",
                }}
              >
                <ListItemText
                  primary={receipt.invoiceData.title}
                  secondary={`Due Date: ${receipt.invoiceData.due_date}`}
                />
                <ListItemIcon>
                  <Done color="success" />
                </ListItemIcon>
              </ListItem>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              No invoices yet.
            </Typography>
          )}
        </List>
      </Box>
    </Container>
  );
};

export default InvoiceDash;
