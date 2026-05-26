const router = require("express").Router()

const auth = require("../middleware/authMiddleware")

const {
  startTimer,
  stopTimer,
  getLogs,
} = require("../controllers/timeController")

router.use(auth)

router.post("/start", startTimer)

router.put("/stop/:id", stopTimer)

router.get("/", getLogs)

module.exports = router