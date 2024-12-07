import React, { useState } from "react";
import { generateInvoice } from "./invoiceGenerator";
import "./invoiceForm.css";

const InvoiceForm = () => {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    logo: "",
    number: 1,
    date: new Date().toISOString().split("T")[0],
    due_date: "",
    items: [{ name: "", quantity: 1, unit_cost: 0 }],
    notes: "",
    terms: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  const handleGenerateInvoice = async () => {
    try {
      const { downloadUrl } = await generateInvoice(formData);
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
    <div className="invoice-form">
      <div className="header">
        <img src="logo.png" alt="Logo" className="logo" />
      </div>
      <div className="fields">
        <div className="field-group">
          <label>From (Your Company Info)</label>
          <input
            name="from"
            value={formData.from}
            onChange={handleInputChange}
          />
        </div>
        <div className="field-group">
          <label>To (Client Info)</label>
          <input name="to" value={formData.to} onChange={handleInputChange} />
        </div>
        <div className="field-group">
          <label>Logo URL</label>
          <input
            name="logo"
            value={formData.logo}
            onChange={handleInputChange}
          />
        </div>
        <div className="two-column">
          <div className="field-group">
            <label>Invoice Number</label>
            <input
              name="number"
              type="number"
              value={formData.number}
              onChange={handleInputChange}
            />
          </div>
          <div className="field-group">
            <label>Date</label>
            <input
              name="date"
              type="date"
              value={formData.date}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="field-group">
          <label>Due Date</label>
          <input
            name="due_date"
            type="date"
            value={formData.due_date}
            onChange={handleInputChange}
          />
        </div>
        <div className="field-group">
          <label>Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
          />
        </div>
        <div className="field-group">
          <label>Terms</label>
          <textarea
            name="terms"
            value={formData.terms}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <h3>Items</h3>
      <div className="items">
        {formData.items.map((item, index) => (
          <div key={index}>
            <input
              name="name"
              placeholder="Item Name"
              value={item.name}
              onChange={(e) => handleItemChange(index, "name", e.target.value)}
            />
            <input
              name="quantity"
              type="number"
              placeholder="Quantity"
              value={item.quantity}
              onChange={(e) =>
                handleItemChange(index, "quantity", e.target.value)
              }
            />
            <input
              name="unit_cost"
              type="number"
              placeholder="Unit Cost"
              value={item.unit_cost}
              onChange={(e) =>
                handleItemChange(index, "unit_cost", e.target.value)
              }
            />
            <button onClick={() => removeItem(index)}>Remove</button>
          </div>
        ))}
      </div>
      <button onClick={addItem}>Add Item</button>
      <button onClick={handleGenerateInvoice}>Generate Invoice</button>
    </div>
  );
};

export default InvoiceForm;
