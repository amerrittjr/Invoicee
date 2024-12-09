import { Client, Databases } from "appwrite";

const databaseId = process.env.REACT_APP_APPWRITE_INVOICE_DATABASE_ID;
const collectionId = process.env.REACT_APP_APPWRITE_INVOICE_COLLECTION_I;

const client = new Client();
client
  .setEndpoint(process.env.REACT_APP_APPWRITE_ENDPOINT) // Your Appwrite Endpoint
  .setProject(process.env.REACT_APP_APPWRITE_PROJECT_ID); // Your project ID

const databases = new Databases(client);

export const fetchInvoices = async () => {
  try {
    const response = await databases.listDocuments(databaseId, collectionId);
    return response.documents;
  } catch (error) {
    console.error("Error fetching invoices:", error);
  }
};

export const updateInvoiceStatus = async (invoiceId, status) => {
  try {
    await databases.updateDocument(databaseId, collectionId, invoiceId, {
      status,
    });
  } catch (error) {
    console.error("Error updating invoice status:", error);
  }
};
