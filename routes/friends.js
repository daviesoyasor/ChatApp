const express = require('express')
const { getAllFriends, createFriend } = require('../controllers/friends')
const router = express.Router()


router.route("/:userid").get(getAllFriends)
router.route("/").post(createFriend)
// router.route("/:id").get(getSingleUser)


module.exports = router;