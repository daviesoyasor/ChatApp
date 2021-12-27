const User = require('../models/User')



//@desc    Get all current User Friend
//@route   GET api/v1/friends/:userid
//@access  Private
const getAllFriends = async (req, res, next)=>{
    try{
        const user = await User.findById(req.params.userid)
        const friends = await Promise.all(
            user.friends.map((friendId) => {
              return User.findById(friendId);
            })
          );
          let friendList = [];
            friends.map((friend) => {
            const { _id, username, profilePicture } = friend;
            friendList.push({ _id, username, profilePicture });
            });
            res.status(200).json(friendList)
        
    }catch(err){
        next(err)
    }
}

//@desc    Create current User Friend
//@route   POST api/v1/friends/
//@access  Private
const createFriend = async (req, res, next) =>{
    try{
      
        const currentUser = await User.findById(req.body.user_id);
        const userFriend = await User.findById(req.body.friend_id)
        if(currentUser.friends.includes(req.body.friend_id)){
            res.status(403).json("You are already friends with this user")
        }else{
            currentUser.friends.push(req.body.friend_id);
            userFriend.friends.push(req.body.user_id)
            await currentUser.save();
            await userFriend.save();
            res.status(200).json("User is now your friend")
        }
        
    }catch(err){
        next(err)
    }
}

module.exports = {
    getAllFriends,
    createFriend
}