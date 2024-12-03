import React, { useEffect, useState } from "react";
import { Client, Account, Databases } from "appwrite";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const client = new Client();
    client
      .setEndpoint("https://cloud.appwrite.io/v1") // Your Appwrite endpoint
      .setProject("674e187b000f402272bd"); // Your project ID

    const account = new Account(client);
    const databases = new Databases(client);

    const checkAuth = async () => {
      try {
        await account.get();
        setIsAuthenticated(true);
      } catch (error) {
        console.error("User not authenticated", error);
        navigate("/login"); // Redirect to login page if not authenticated
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await databases.listDocuments(
          "674e1b500036e1b11a58", // Your database ID
          "674e1db7002157b274f8" // Your collection ID
        );
        setUsers(response.documents);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    checkAuth().then(() => {
      if (isAuthenticated) {
        fetchUsers();
      }
    });
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <h2>Registered Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.$id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
