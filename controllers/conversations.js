const Conversation = require('../models/Conversation')



//@desc    Get all registered Users
//@route   GET api/v1/users/
//@access  Public
const getAllMembersOfConversation = async (req, res, next)=>{
    try{
        const conversation = await Conversation.findOne({_id: req.params.conversationId});
        if(conversation){
          const  { updatedAt, createdAt, ...other } = conversation._doc
            res.status(200).json(other)
        }
        
    }catch(err){
        next(err)
    }
}


const createConversation = async (req, res, next) =>{
    try{
      
        const conversation = await Conversation.findOne({
            members: { $all: [req.body.firstUserId, req.body.secondUserId] },
          });
        if(conversation){
            const  { updatedAt, createdAt, ...other } = conversation._doc
            res.status(200).json({message:"Conversation already exist with this user", other})
            
        }else{
            const newConversation = new Conversation({
                members: [req.body.firstUserId, req.body.secondUserId],
              });
              const savedConversation = await newConversation.save();
              const  { updatedAt, ...other } = savedConversation._doc
              res.status(200).json({message:"Conversation created successfully with this user", other});
            
        }
        
    }catch(err){
        next(err)
    }
}

module.exports = {
    getAllMembersOfConversation,
    createConversation
}