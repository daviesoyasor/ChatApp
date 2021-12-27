const express = require('express')
const { getAllMembersOfConversation, createConversation } = require('../controllers/conversations')
const router = express.Router()


router.route("/:conversationId").get(getAllMembersOfConversation)
router.route("/").post(createConversation)
// router.route("/:id").get(getSingleUser)


module.exports = router;