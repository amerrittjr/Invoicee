import React, { useEffect, useState } from "react";
import { getUserProfileAndTotalInvoices } from "./api.js"; // Import the combined function

const ProfileDash = () => {
  const [profile, setProfile] = useState({});
  const [totalInvoices, setTotalInvoices] = useState(0);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const { userProfile, totalInvoices } =
          await getUserProfileAndTotalInvoices();
        setProfile(userProfile);
        setTotalInvoices(totalInvoices);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      <div>
        <h2>{profile.name}</h2>
        <p>Email: {profile.email}</p>
        <p>Total Invoices Created: {totalInvoices}</p>
        {/* Add other profile details as needed */}
      </div>
    </div>
  );
};

export default ProfileDash;
