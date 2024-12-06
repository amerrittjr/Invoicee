import { Client, Databases } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.REACT_APP_APPWRITE_ENDPOINT)
  .setProject(process.env.REACT_APP_APPWRITE_PROJECT_ID);

const database = new Databases(client);

export const saveInvoiceMetadata = async (invoiceData, userId) => {
  try {
    await database.createDocument(
      process.env.REACT_APP_APPWRITE_INVOICE_DATABASE_ID,
      "invoices",
      {
        userId,
        invoiceData: JSON.stringify(invoiceData),
        createdAt: new Date(),
      }
    );
  } catch (error) {
    console.error("Failed to save invoice data:", error);
    throw error;
  }
};
