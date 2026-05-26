const Task = require("../models/Task")

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      user: req.user,
    })

    res.status(201).json(task)
  } catch (error) {
    res.status(500).json(error)
  }
}

exports.getTasks = async (req, res) => {
  const tasks = await Task.find({
    user: req.user,
  })

  res.json(tasks)
}

exports.updateTask = async (req, res) => {
  const task = await Task.findOneAndUpdate(
    {
      _id: req.params.id,
      user: req.user,
    },
    req.body,
    { new: true }
  )

  res.json(task)
}

exports.deleteTask = async (req, res) => {
  await Task.findOneAndDelete({
    _id: req.params.id,
    user: req.user,
  })

  res.json({
    message: "Task deleted",
  })
}