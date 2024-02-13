import logo from "./logo.svg"
import "./App.css"
import Login from "./components/Login"
import { Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import Dashboard from "./components/Dashboard"
import Error from "./components/Error"
import Headers from "./components/Headers"
import SignUp from "./components/SignUp"
function App() {
  return (
    <div className="App">
    <Headers />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  )
}

export default App
