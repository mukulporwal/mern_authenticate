import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useState } from "react";
import { useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import axios from "../src/utils/axiosConfig";

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  // console.log(user);
  useEffect(() => {
    const fetchUser = async() => {
      const token = localStorage.getItem("token");
      if(token) {
        try {
          const res = await axios.get('/api/users/me', {
            headers: {Authorization: `Bearer ${token}`}
          })
          setUser(res.data)
        } catch (error) {
          setError("Failed to fetch user data");
          localStorage.removeItem("token")
        }
      }
    }
    fetchUser()
  }, [])

  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home user={user} error={error} />} /> 
        <Route path="/login" element={<Login setUser={setUser} /> } />
        <Route path="/register" element={<Register setUser={setUser} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
