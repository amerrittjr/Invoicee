import React, { useState } from "react";
import "./invoiceBuilder.css";

const InvoiceBuilder = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    invoiceDate: "",
    itemDetails: "",
    totalAmount: "",
  });

  const steps = [
    {
      key: "clientName",
      label: "Enter client name",
      placeholder: "Client Name",
    },
    {
      key: "clientEmail",
      label: "Enter client email",
      placeholder: "Client Email",
    },
    {
      key: "invoiceDate",
      label: "Enter invoice date",
      placeholder: "Invoice Date",
    },
    {
      key: "itemDetails",
      label: "Enter item details",
      placeholder: "Item Details",
    },
    {
      key: "totalAmount",
      label: "Enter total amount",
      placeholder: "Total Amount",
    },
  ];

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const editInvoice = () => {
    setCurrentStep(0); // Reset to the first step
  };

  return (
    <div className="invoice-builder">
      <h1>Invoice Builder</h1>

      {/* Conditionally Render Form or Preview */}
      {currentStep < steps.length ? (
        <>
          {/* Step Container */}
          <div className="step-container">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`step-box ${index === currentStep ? "active" : ""} ${
                  index < currentStep ? "completed" : ""
                }`}
              >
                {index === currentStep && (
                  <>
                    <label>{step.label}</label>
                    <input
                      type="text"
                      name={step.key} // Matches the key in formData
                      value={formData[step.key]} // Bind input value to formData
                      placeholder={step.placeholder}
                      onChange={handleInputChange} // Update formData on change
                      style={{
                        padding: "10px",
                        fontSize: "16px",
                        width: "80%",
                      }}
                    />
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="button-container">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              style={{ marginRight: "10px" }}
            >
              Back
            </button>
            <button onClick={nextStep}>
              {currentStep === steps.length - 1 ? "Preview" : "Next"}
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Invoice Preview */}
          <div className="invoice-preview">
            <h2>Invoice Preview</h2>
            <div className="invoice">
              <p>
                <strong>Client Name:</strong> {formData.clientName}
              </p>
              <p>
                <strong>Client Email:</strong> {formData.clientEmail}
              </p>
              <p>
                <strong>Invoice Date:</strong> {formData.invoiceDate}
              </p>
              <p>
                <strong>Item Details:</strong> {formData.itemDetails}
              </p>
              <p>
                <strong>Total Amount:</strong> ${formData.totalAmount}
              </p>
            </div>
            <button onClick={editInvoice} style={{ marginTop: "10px" }}>
              Edit Invoice
            </button>
          </div>
        </>
      )}

      {/* Debug Section to Show Collected Data */}
      <div className="debug-data">
        <h3>Collected Data:</h3>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </div>
    </div>
  );
};

export default InvoiceBuilder;
