import { useEffect, useState } from "react";
import { fetchInvoices, updateInvoiceStatus } from "./invoiceHomeTable";
import { Link } from "react-router-dom";
import "./uniDash.css";

const InvoiceDash = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const getInvoices = async () => {
      const fetchedInvoices = await fetchInvoices();
      setInvoices(fetchedInvoices || []);
    };
    getInvoices();
  }, []);

  const handleStatusClick = async (invoiceId, currentStatus) => {
    const newStatus = currentStatus === "Paid" ? "Unpaid" : "Paid";
    await updateInvoiceStatus(invoiceId, newStatus);
    setInvoices(
      invoices.map((invoice) =>
        invoice.$id === invoiceId ? { ...invoice, status: newStatus } : invoice
      )
    );
  };

  return (
    <div className="dashboard">
      <Link to="/invoiceHome">
        <h5>Invoices</h5>
      </Link>
      <Link to="/invoiceForm">
        <button
          style={{
            padding: "15px 30px",
            fontSize: "16px",
            color: "#fff",
            backgroundColor: "#007bff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Create Invoice
        </button>
      </Link>
      <div className="invoice-list">
        {invoices.length > 0 ? (
          invoices.map((invoice) => (
            <div key={invoice.$id} className="invoice-item">
              <div className="invoice-info">
                <p>Invoice No: {invoice.invoiceNo}</p>
                <p>Date: {invoice.date}</p>
                <p>To: {invoice.to}</p>
                <p>Project/Service: {invoice.projectService}</p>
                <p>Due Date: {invoice.dueDate}</p>
              </div>
              <button
                className={`status-button ${
                  invoice.status === "Paid" ? "paid" : "unpaid"
                }`}
                onClick={() => handleStatusClick(invoice.$id, invoice.status)}
              >
                {invoice.status}
              </button>
            </div>
          ))
        ) : (
          <p>No invoices found.</p>
        )}
      </div>
    </div>
  );
};

export default InvoiceDash;
