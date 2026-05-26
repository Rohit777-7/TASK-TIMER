import { useEffect, useState } from "react"
import API from "../services/api"

function Dashboard() {

  const [tasks, setTasks] = useState([])

  const [title, setTitle] = useState("")

  const [description, setDescription] = useState("")

  const [activeTask, setActiveTask] = useState(null)

  const [activeLogId, setActiveLogId] = useState(null)

  const [seconds, setSeconds] = useState(0)

  const [logs, setLogs] = useState([])

  const fetchTasks = async () => {

    try {

      const res = await API.get("/tasks")

      setTasks(res.data)

    } catch (error) {
      console.log(error)
    }
  }

  const fetchLogs = async () => {

    try {

      const res = await API.get("/time")

      setLogs(res.data)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {

    const token = localStorage.getItem("token")

    if (!token) {
      window.location.href = "/"
    }

    fetchTasks()

    fetchLogs()

  }, [])

  useEffect(() => {

    let interval = null

    if (activeTask) {

      interval = setInterval(() => {
        setSeconds((prev) => prev + 1)
      }, 1000)

    }

    return () => clearInterval(interval)

  }, [activeTask])

  const createTask = async (e) => {

    e.preventDefault()

    try {

      await API.post("/tasks", {
        title,
        description,
      })

      setTitle("")
      setDescription("")

      fetchTasks()

    } catch (error) {
      console.log(error)
    }
  }

  const deleteTask = async (id) => {

    try {

      await API.delete(`/tasks/${id}`)

      fetchTasks()

    } catch (error) {
      console.log(error)
    }
  }

  const updateStatus = async (id, status) => {

    try {

      await API.put(`/tasks/${id}`, {
        status,
      })

      fetchTasks()

    } catch (error) {
      console.log(error)
    }
  }

  const startTimer = async (taskId) => {

    try {

      const res = await API.post("/time/start", {
        taskId,
      })

      setActiveTask(taskId)

      setActiveLogId(res.data._id)

      setSeconds(0)

    } catch (error) {
      console.log(error)
    }
  }

  const stopTimer = async () => {

    try {

      await API.put(`/time/stop/${activeLogId}`)

      setActiveTask(null)

      setActiveLogId(null)

      fetchLogs()

    } catch (error) {
      console.log(error)
    }
  }

  const getTaskTime = (taskId) => {

    const taskLogs = logs.filter(
      (log) => log.task?._id === taskId
    )

    const total = taskLogs.reduce(
      (acc, log) => acc + log.duration,
      0
    )

    return total
  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">

      <div className="max-w-7xl mx-auto p-8">

        {/* HEADER */}

        <div className="flex items-center justify-between mb-10">

          <div>

            <h1 className="text-5xl font-bold">
              TaskFlow
            </h1>

            <p className="text-gray-400 mt-2">
              Track tasks and productivity
            </p>

          </div>

          <div className="flex gap-4">

            <button
              onClick={() => window.location.href="/summary"}
              className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-xl font-semibold"
            >
              Summary
            </button>

            <button
              onClick={() => {
                localStorage.removeItem("token")
                window.location.href = "/"
              }}
              className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-xl font-semibold"
            >
              Logout
            </button>

          </div>

        </div>

        {/* SUMMARY */}

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/10">

            <p className="text-gray-300">
              Total Tasks
            </p>

            <h1 className="text-5xl font-bold mt-3">
              {tasks.length}
            </h1>

          </div>

          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/10">

            <p className="text-gray-300">
              Completed
            </p>

            <h1 className="text-5xl font-bold text-green-400 mt-3">
              {
                tasks.filter(
                  (task) => task.status === "Completed"
                ).length
              }
            </h1>

          </div>

          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/10">

            <p className="text-gray-300">
              Pending
            </p>

            <h1 className="text-5xl font-bold text-yellow-400 mt-3">
              {
                tasks.filter(
                  (task) => task.status !== "Completed"
                ).length
              }
            </h1>

          </div>

        </div>

        {/* CREATE TASK */}

        <form
          onSubmit={createTask}
          className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/10 mb-10"
        >

          <h2 className="text-3xl font-bold mb-6">
            Create Task
          </h2>

          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 p-4 rounded-xl mb-5 outline-none"
          />

          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 p-4 rounded-xl mb-5 outline-none h-[120px]"
          />

          <button className="bg-blue-500 hover:bg-blue-600 px-8 py-4 rounded-xl font-semibold">
            Add Task
          </button>

        </form>

        {/* EMPTY STATE */}

        {tasks.length === 0 && (

          <div className="text-center mt-20">

            <h1 className="text-3xl font-bold text-gray-300">
              No Tasks Yet
            </h1>

            <p className="text-gray-400 mt-3">
              Create your first task 🚀
            </p>

          </div>

        )}

        {/* TASK CARDS */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {tasks.map((task) => (

            <div
              key={task._id}
              className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-6 hover:scale-105 transition duration-300"
            >

              <div className="flex items-center justify-between mb-4">

                <h2 className="text-2xl font-bold">
                  {task.title}
                </h2>

                <span className={`
                  px-3 py-1 rounded-full text-sm

                  ${task.status === "Completed"
                    ? "bg-green-500"
                    : task.status === "In Progress"
                    ? "bg-blue-500"
                    : "bg-yellow-500"
                  }
                `}>
                  {task.status}
                </span>

              </div>

              <p className="text-gray-300 mb-4">
                {task.description}
              </p>

              <p className="mb-5 font-semibold text-purple-300">
                ⏱ Total Time: {(getTaskTime(task._id) / 60).toFixed(2)} min
              </p>

              <div className="flex flex-wrap gap-3 mb-5">

                <button
                  onClick={() =>
                    updateStatus(task._id, "Pending")
                  }
                  className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg"
                >
                  Pending
                </button>

                <button
                  onClick={() =>
                    updateStatus(task._id, "In Progress")
                  }
                  className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
                >
                  Progress
                </button>

                <button
                  onClick={() =>
                    updateStatus(task._id, "Completed")
                  }
                  className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg"
                >
                  Complete
                </button>

              </div>

              <div className="mb-5">

                {activeTask === task._id ? (

                  <div>

                    <p className="text-2xl font-bold mb-3">
                      ⏱ {seconds} sec
                    </p>

                    <button
                      onClick={stopTimer}
                      className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
                    >
                      Stop Timer
                    </button>

                  </div>

                ) : (

                  <button
                    onClick={() => startTimer(task._id)}
                    className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-lg"
                  >
                    Start Timer
                  </button>

                )}

              </div>

              <button
                onClick={() => deleteTask(task._id)}
                className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg"
              >
                Delete
              </button>

            </div>

          ))}

        </div>

      </div>

    </div>

  )
}

export default Dashboard