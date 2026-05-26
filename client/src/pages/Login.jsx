import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import API from "../services/api"

function Login() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      const res = await API.post(
        "/auth/login",
        formData
      )

      localStorage.setItem(
        "token",
        res.data.token
      )

      navigate("/dashboard")

    } catch (error) {

      console.log(error)

      alert("Invalid Credentials")
    }
  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">

      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-lg border border-white/10 p-10 rounded-3xl w-[400px]"
      >

        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
          className="w-full bg-slate-800 text-white p-4 rounded-xl mb-5 outline-none"
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
          className="w-full bg-slate-800 text-white p-4 rounded-xl mb-5 outline-none"
        />

        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-xl font-semibold">
          Login
        </button>

        {/* REGISTER LINK */}

        <p className="text-center text-gray-300 mt-5">

          Don't have an account?

          <Link
            to="/register"
            className="text-blue-400 ml-2"
          >
            Register
          </Link>

        </p>

      </form>

    </div>

  )
}

export default Login