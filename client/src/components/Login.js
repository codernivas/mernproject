import React from "react"

const Login = () => {
  const loginWithGoogle = () => {
    window.open("http://localhost:6005/auth/google/callback", "_self")
  }
  return (
    <div>
      <h1>Login Page</h1>

      <button onClick={loginWithGoogle}>Login with google</button>
    </div>
  )
}

export default Login
