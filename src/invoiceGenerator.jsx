import axios from "axios";

const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL;

export const generateInvoice = async (invoiceData) => {
  if (!invoiceData?.items?.length || !invoiceData?.to) {
    throw new Error(
      "Invalid invoice data: must include items and customer information"
    );
  }

  try {
    const response = await axios.post(BACKEND_API_URL, invoiceData, {
      responseType: "blob",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Create download link for PDF
    const blob = new Blob([response.data], { type: "application/pdf" });
    return {
      success: true,
      data: blob,
      downloadUrl: URL.createObjectURL(blob),
    };
  } catch (error) {
    const errorMessage =
      error.response?.data instanceof Blob
        ? await error.response.data.text()
        : error.message;

    throw new Error(`Invoice generation failed: ${errorMessage}`);
  }
};
