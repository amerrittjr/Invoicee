import axios from "axios";

const BACKEND_API_URL = "http://localhost:5000/generate-invoice";

export const generateInvoice = (invoiceData) => {
  if (!invoiceData?.items?.length || !invoiceData?.to) {
    throw new Error(
      "Invalid invoice data: must include items and customer information"
    );
  }

  try {
    const response = axios.post(BACKEND_API_URL, invoiceData, {
      responseType: "blob",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const blob = new Blob([response.data], { type: "application/pdf" });
    return {
      success: true,
      data: blob,
      downloadUrl: URL.createObjectURL(blob),
    };
  } catch (error) {
    const errorMessage =
      error.response?.data instanceof Blob
        ? error.response.data.text()
        : error.message;

    throw new Error(`Invoice generation failed: ${errorMessage}`);
  }
};
