const express = require('express')
const { getAllMessages, createMessage } = require('../controllers/messages')
const router = express.Router()


router.route("/:conversationId").get(getAllMessages)
router.route("/").post(createMessage)
// router.route("/:id").get(getSingleUser)


module.exports = router;