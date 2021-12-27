const Message = require('../models/Message')



//@desc    Get all registered Users
//@route   GET api/v1/users/
//@access  Public
const getAllMessages = async (req, res, next)=>{
    try{
        const message = await Message.find({
            conversationId: req.params.conversationId,
          });
        res.status(200).json(message)
        
        
    }catch(err){
        next(err)
    }
}


const createMessage = async (req, res, next) =>{
    try{
      
        const newMessage = new Message(req.body);
        //save user and respond
        const message = await newMessage.save();
        const  { updatedAt, createdAt, ...other } = message._doc
        res.status(200).json(other)    
    }catch(err){
        next(err)
    }
}

module.exports = {
    getAllMessages,
    createMessage
}