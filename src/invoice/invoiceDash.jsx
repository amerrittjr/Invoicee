import React, { useState } from "react";
import { Link } from "react-router-dom";
const InvoiceDash = () => {
  return (
    <div>
      <h2>Invoices</h2>
      <div className="invoice-selection-list">
        <ol>
          <li>invoice list</li>
          <li>scheduled invoices</li>
          <li>receipts</li>
        </ol>

        <Link to="/invoiceForm">
          <button>New Invoice</button>
        </Link>
      </div>
    </div>
  );
};

export default InvoiceDash;
