import axios from "axios";

const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL;

export const generateInvoice = async (invoiceData) => {
  if (!invoiceData?.items?.length || !invoiceData?.to) {
    throw new Error(
      "Invalid invoice data: must include items and customer information"
    );
  }

  try {
    // Send POST request
    const response = await axios.post(BACKEND_API_URL, invoiceData, {
      responseType: "blob", // Ensure binary response for PDFs
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Check if the response data is valid
    if (!response.data) {
      console.log("no data entered");
      throw new Error("No data received from the server");
    }

    // Create a Blob for the PDF file
    const blob = new Blob([response.data], { type: "application/pdf" });
    console.log(blob);

    // Create a temporary download link
    const downloadUrl = URL.createObjectURL(blob);
    return {
      success: true,
      data: blob,
      downloadUrl,
    };
  } catch (error) {
    // Log full error for debugging
    console.error("Error generating invoice:", error);

    const errorMessage =
      error.response?.data instanceof Blob
        ? await error.response.data.text()
        : error.message;

    throw new Error(`Invoice generation failed: ${errorMessage}`);
  }
};
