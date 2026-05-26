const TimeLog = require("../models/TimeLog")

exports.startTimer = async (req, res) => {
  const log = await TimeLog.create({
    user: req.user,
    task: req.body.taskId,
    startTime: new Date(),
  })

  res.status(201).json(log)
}

exports.stopTimer = async (req, res) => {
  const log = await TimeLog.findById(req.params.id)

  log.endTime = new Date()

  log.duration =
    (new Date(log.endTime) - new Date(log.startTime)) / 1000

  await log.save()

  res.json(log)
}

exports.getLogs = async (req, res) => {
  const logs = await TimeLog.find({
    user: req.user,
  }).populate("task")

  res.json(logs)
}