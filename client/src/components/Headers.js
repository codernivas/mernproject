import React, { useEffect, useState } from "react"
import axios from "axios"
const Headers = () => {
  const [userdata, setUserdata] = useState({})
  console.log("Response", userdata.email_verified)
  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:6005/login/sucess", {
        withCredentials: true,
      })
      setUserdata(response.data.user)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <div>
      Headers<h1>hi,{userdata.displayName}</h1>
    </div>
  )
}

export default Headers
