import React from "react"
import axios from "axios"
const Dashboard = () => {
  const handleLogout = async () => {
    try {
      // Make API call to logout endpoint
      await axios.get("http://localhost:6005/logout", { withCredentials: true });
      // Assuming the logout endpoint clears the server session
      // Redirect user to login page or perform any other necessary actions
      window.location.href = "/login";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <div>
      Dashboard
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}

export default Dashboard
