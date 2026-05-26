import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import API from "../services/api"

function Register() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
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
        "/auth/register",
        formData
      )

      localStorage.setItem(
        "token",
        res.data.token
      )

      navigate("/dashboard")

    } catch (error) {

      console.log(error)

      alert("Register Failed")
    }
  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">

      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-lg border border-white/10 p-10 rounded-3xl w-[400px]"
      >

        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Register
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          onChange={handleChange}
          className="w-full bg-slate-800 text-white p-4 rounded-xl mb-5 outline-none"
        />

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

        <button className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-semibold">
          Register
        </button>

        <p className="text-center text-gray-300 mt-5">

          Already have account?

          <Link
            to="/"
            className="text-blue-400 ml-2"
          >
            Login
          </Link>

        </p>

      </form>

    </div>

  )
}

export default Register