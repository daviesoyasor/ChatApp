const User = require("../models/User")
const bcrypt = require('bcryptjs')

// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public

const createUser = async (req, res, next) =>{
    try{

    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      profilePicture: req.body.profilePicture
    });

    //save user and respond
    const user = await newUser.save();
    res.status(200).json({message: "user created successfully", user})
        
    }catch(err){
        next(err)
    }
}


//@desc    Login User
//@route   POST /api/v1/auth/login
//@access  Public
const loginUser = async (req, res, next) => {
    try{
        const user = await User.findOne({ email: req.body.email });
        if(!user){
            res.status(404).json({message: "User not found"})
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if(!validPassword) {
            res.status(400).json({message: "Wrong Password"})
        }

        const { password, updatedAt, ...otherfields } = user._doc
        res.status(200).json(otherfields)
    }catch(err){
        next(err)
    }
}

module.exports = {
    createUser,
    loginUser
} 