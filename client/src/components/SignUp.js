import React, { useState } from "react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:6005/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          displayName,
          password
        })
      });
      if (response.ok) {
        // Registration successful
        console.log("Registration successful");
        // Redirect or show success message
      } else {
        // Registration failed
        console.error("Registration failed");
        // Handle the error, e.g., show error message to the user
      }
    } catch (error) {
      // Handle network error or other exceptions
      console.error("Error during registration:", error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="displayName">
            <strong>Name</strong>
          </label>
          <input
            type="text"
            placeholder="Name"
            name="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">
            <strong>Email</strong>
          </label>
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={email}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>Already have an account?</p>
      <a href="/login">Login</a>
    </div>
  );
};

export default SignUp;
