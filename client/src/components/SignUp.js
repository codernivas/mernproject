import React, { useState } from "react";
import axios from "axios"; // Import axios for making HTTP requests

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make HTTP POST request to the signup API
      const response = await axios.post("http://localhost:6005/register", {
        email,
        password,
      });
      console.log(response.data); // Log the response from the server
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">
            <strong>Email</strong>
          </label>
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={email} // Set value attribute to the state variable
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">
            <strong>Password</strong>
          </label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password} // Set value attribute to the state variable
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Register</button> {/* Moved button inside the form */}
      </form>
      <p>Already have an account?</p>
      <a href="/login">Login</a>
    </div>
  );
};

export default SignUp;
