import { Client, Databases, ID } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.REACT_APP_APPWRITE_ENDPOINT)
  .setProject(process.env.REACT_APP_APPWRITE_PROJECT_ID);

const database = new Databases(client);

export const saveInvoiceMetadata = async (invoiceData, userId) => {
  try {
    await database.createDocument(
      process.env.REACT_APP_APPWRITE_INVOICE_DATABASE_ID,
      process.env.REACT_APP_APPWRITE_INVOICE_COLLECTION_ID,
      ID.unique(),
      {
        userId,
        invoiceData: JSON.stringify(invoiceData),
        createdAt: new Date().toISOString(),
        to: invoiceData.to,
        from: invoiceData.from,
        totalAmount: invoiceData.totalAmount,
        due_date: invoiceData.due_date,
      }
    );
    console.log("Successfully saved your invoice to the cloud");
  } catch (error) {
    console.error("Failed to save invoice data:", error);
    throw error;
  }
};
