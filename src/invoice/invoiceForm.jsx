import React, { useState, useEffect } from "react";
import { generateInvoice } from "./invoiceGenerator";
import { getUserProfile } from "../api";
import { Client, Storage, ID } from "appwrite";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  Box,
  Divider,
} from "@mui/material";
import { AddCircle, DeleteForever } from "@mui/icons-material";
import "./invoiceForm.css";

const client = new Client()
  .setEndpoint(process.env.REACT_APP_APPWRITE_ENDPOINT)
  .setProject(process.env.REACT_APP_APPWRITE_PROJECT_ID);

const storage = new Storage(client);

const InvoiceForm = () => {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    logo: "",
    number: 1,
    date: new Date().toISOString().split("T")[0],
    due_date: new Date(new Date().setDate(new Date().getDate() + 7))
      .toISOString()
      .split("T")[0],
    items: [{ name: "", quantity: 1, unit_cost: 0 }],
    notes: "",
    terms: "",
  });
  const [userId, setUserId] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [errors, setErrors] = useState({ from: false, to: false });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfile = await getUserProfile();
        setUserId(userProfile.id);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "date") {
      const newDueDate = new Date(value);
      newDueDate.setDate(newDueDate.getDate() + 7);
      setFormData((prev) => ({
        ...prev,
        due_date: newDueDate.toISOString().split("T")[0],
      }));
    }
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index][field] = value;
    setFormData((prev) => ({ ...prev, items: updatedItems }));
  };

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { name: "", quantity: 1, unit_cost: 0 }],
    }));
  };

  const removeItem = (index) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, items: updatedItems }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, logo: e.target.files[0] }));
  };

  const handleFileUpload = async () => {
    if (!formData.logo) {
      setUploadStatus("Please select a file first.");
      return;
    }

    try {
      const response = await storage.createFile(
        process.env.REACT_APP_INVOICE_BUCKET_ID,
        ID.unique(),
        formData.logo
      );
      console.log(response); // Success
      setUploadStatus("File uploaded successfully!");
      setFormData((prev) => ({ ...prev, logo: response.$id })); // Store the file ID
    } catch (error) {
      console.error(error); // Failure
      setUploadStatus("File upload failed.");
    }
  };

  const handleGenerateInvoice = async () => {
    const newErrors = {
      from: !formData.from,
      to: !formData.to,
    };
    setErrors(newErrors);

    if (newErrors.from || newErrors.to) {
      return;
    }
    try {
      const { downloadUrl } = await generateInvoice(formData, userId);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", "invoice.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Failed to generate invoice:", error.message);
    }
  };

  return (
    <Box sx={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom align="center">
        Create New Invoice
      </Typography>
      <Paper sx={{ padding: "2rem", boxShadow: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="From (Your Company Info)"
              name="from"
              value={formData.from}
              onChange={handleInputChange}
              variant="outlined"
              error={errors.from}
              helperText={errors.from ? "Please enter your company info" : ""}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="To (Client Info)"
              name="to"
              value={formData.to}
              onChange={handleInputChange}
              variant="outlined"
              error={errors.to}
              helperText={errors.to ? "Please enter client info" : ""}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <input type="file" onChange={handleFileChange} />
            <Button
              variant="contained"
              onClick={handleFileUpload}
              sx={{ mt: 2 }}
            >
              Upload Logo
            </Button>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              {uploadStatus}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Invoice Number"
              name="number"
              type="number"
              value={formData.number}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label=""
              name=""
              type="date"
              value={formData.due_date}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              variant="outlined"
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Terms"
              name="terms"
              value={formData.terms}
              onChange={handleInputChange}
              variant="outlined"
              multiline
              rows={4}
            />
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        <Typography variant="h6">Items</Typography>
        {formData.items.map((item, index) => (
          <Box key={index} sx={{ display: "flex", gap: "1rem", mb: 2 }}>
            <TextField
              label="Item Name"
              name="name"
              value={item.name}
              onChange={(e) => handleItemChange(index, "name", e.target.value)}
              variant="outlined"
              fullWidth
            />
            <TextField
              label="Quantity"
              type="number"
              name="quantity"
              value={item.quantity}
              onChange={(e) =>
                handleItemChange(index, "quantity", e.target.value)
              }
              variant="outlined"
              fullWidth
            />
            <TextField
              label="Unit Cost"
              type="number"
              name="unit_cost"
              value={item.unit_cost}
              onChange={(e) =>
                handleItemChange(index, "unit_cost", e.target.value)
              }
              variant="outlined"
              fullWidth
            />
            <Button
              variant="outlined"
              color="error"
              onClick={() => removeItem(index)}
              sx={{ alignSelf: "flex-end" }}
            >
              <DeleteForever />
            </Button>
          </Box>
        ))}
        <Button
          variant="contained"
          startIcon={<AddCircle />}
          onClick={addItem}
          sx={{ mb: 2 }}
        >
          Add Item
        </Button>
        <Button
          variant="contained"
          onClick={handleGenerateInvoice}
          sx={{ mt: 3, width: "100%" }}
        >
          Generate Invoice
        </Button>
      </Paper>
    </Box>
  );
};

export default InvoiceForm;
