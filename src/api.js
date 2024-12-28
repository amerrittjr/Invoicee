import { Client, Account, Databases } from "appwrite";

const client = new Client();
client
  .setEndpoint(process.env.REACT_APP_APPWRITE_ENDPOINT)
  .setProject(process.env.REACT_APP_APPWRITE_PROJECT_ID);

const account = new Account(client);
const databases = new Databases(client);

export async function getUserProfile() {
  try {
    const user = await account.get();
    return {
      id: user.$id,
      name: user.name,
      email: user.email,
    };
  } catch (error) {
    console.error("there was an error fetching user details", error);
    throw error;
  }
}

export async function getTotalInvoices(userId) {
  try {
    const response = await databases.listDocuments(
      process.env.REACT_APP_APPWRITE_INVOICE_DATABASE_ID,
      process.env.REACT_APP_APPWRITE_INVOICE_COLLECTION_ID[`userId=${userId}`]
    );
    return response.total;
  } catch (error) {
    console.error(
      "there was an error processing the total invoice count request",
      error
    );
    throw error;
  }
}

export async function getUserProfileAndTotalInvoices() {
  try {
    const userProfile = await getUserProfile();
    const totalInvoices = await getTotalInvoices(userProfile.id);
    return {
      userProfile,
      totalInvoices,
    };
  } catch (error) {
    console.error(
      "there was an error loading user profile and total invoices",
      error
    );
    throw error;
  }
}

export async function getRecentActivities() {
  try {
    const response = await databases.listDocuments(
      process.env.REACT_APP_APPWRITE_INVOICE_DATABASE_ID,
      process.env.REACT_APP_APPWRITE_INVOICE_COLLECTION_ID
    );
    return response.documents;
  } catch (error) {
    console.error("Error fetching recent activities:", error);
    throw error;
  }
}
