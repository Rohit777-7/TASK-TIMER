import { useEffect, useState } from "react"
import API from "../services/api"

function Summary() {

  const [tasks, setTasks] = useState([])

  const [logs, setLogs] = useState([])

  useEffect(() => {

    const token = localStorage.getItem("token")

    if (!token) {
      window.location.href = "/"
    }

    fetchData()

  }, [])

  const fetchData = async () => {

    try {

      const taskRes = await API.get("/tasks")

      const logRes = await API.get("/time")

      setTasks(taskRes.data)

      setLogs(logRes.data)

    } catch (error) {
      console.log(error)
    }
  }

  const totalTime = logs.reduce(
    (acc, log) => acc + log.duration,
    0
  )

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  )

  const pendingTasks = tasks.filter(
    (task) => task.status !== "Completed"
  )

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="flex items-center justify-between mb-12">

          <div>

            <h1 className="text-5xl font-bold">
              Daily Summary
            </h1>

            <p className="text-gray-400 mt-2">
              Productivity overview
            </p>

          </div>

          <button
            onClick={() => window.location.href="/dashboard"}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-xl font-semibold"
          >
            Dashboard
          </button>

        </div>

        {/* SUMMARY CARDS */}

        <div className="grid md:grid-cols-4 gap-8">

          <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-8 rounded-3xl">

            <p className="text-gray-300 text-lg">
              Total Tasks
            </p>

            <h1 className="text-6xl font-bold mt-5">
              {tasks.length}
            </h1>

          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-8 rounded-3xl">

            <p className="text-gray-300 text-lg">
              Completed
            </p>

            <h1 className="text-6xl font-bold text-green-400 mt-5">
              {completedTasks.length}
            </h1>

          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-8 rounded-3xl">

            <p className="text-gray-300 text-lg">
              Pending
            </p>

            <h1 className="text-6xl font-bold text-yellow-400 mt-5">
              {pendingTasks.length}
            </h1>

          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-8 rounded-3xl">

            <p className="text-gray-300 text-lg">
              Total Time
            </p>

            <h1 className="text-5xl font-bold text-purple-400 mt-5">
              {(totalTime / 60).toFixed(2)} min
            </h1>

          </div>

        </div>

      </div>

    </div>

  )
}

export default Summary