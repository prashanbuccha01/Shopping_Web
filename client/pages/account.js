import React, { useState, useEffect } from "react";
import Profile from "@/components/Profile";
import { useRouter } from "next/router";
import axios from "axios";

const Account = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const fetchData = async () => {
    // Get the token from localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      // Redirect to the login page if token is not available
      router.push("/login");
      return;
    }

    try {
      // Make an API request to fetch the user data using the token
      const response = await axios.get(
        "http://localhost:8000/api/private/userdata",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(response.data.data);
    } catch (error) {
      console.error(error);
      router.push("/login");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Rendering the component is handled by the Profile component itself

  return (
    <div className="flex align-center justify-center">
      <Profile user={user} />
    </div>
  );
};

export default Account;
