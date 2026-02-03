import axios from "../utils/axiosConfig";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Register({ setUser}) {
    const [formData, setFormData] = useState({
        name : "",
        email: "",
        password: "",
    })

    const [error, setError] = useState("");
    const nav = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/users/register", formData);
            localStorage.setItem("token", res.data.token);
            setUser(res.data.user);
            nav('/');
        } catch (error) {
            setError(error.response?.data?.message || "Register failed")
        }
    }
    
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Register
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Name
            </label>
            <input
              name='name'
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              autoComplete='off'
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Email
            </label>
            <input
              name='email'
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              autoComplete='off'
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Password
            </label>
            <input
              name='password'
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <span className="text-blue-600 cursor-pointer hover:underline">
            <Link
                to="/login"
                className="text-blue-600 hover:underline"
            >
                Login
            </Link>
          </span>
        </p>

      </div>
    </div>
  );
}

export default Register;
