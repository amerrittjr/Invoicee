import { Client, Databases } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.REACT_APP_APPWRITE_ENDPOINT)
  .setProject(process.env.REACT_APP_APPWRITE_PROJECT_ID);

const databases = new Databases(client);

const createInvoiceCollection = async () => {
  try {
    const response = await databases.createCollection(
      process.env.REACT_APP_APPWRITE_INVOICE_DATABASE_ID,
      process.env.REACT_APP_APPWRITE_INVOICE_COLLECTION_ID,
      "Invoices",
      [
        {
          label: "userId",
          type: "text",
          required: true,
        },
        {
          label: "invoiceData",
          type: "text",
          required: true,
        },
        {
          label: "createdAt",
          type: "datetime",
          required: true,
        },
      ]
    );
    console.log("Collection created:", response);
  } catch (error) {
    console.error("Error creating collection:", error);
  }
};

createInvoiceCollection();
