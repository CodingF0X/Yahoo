const { default: mongoose } = require('mongoose')
const User = require('../Models/UserModel')
const bcrypt = require('bcrypt')

//-- GET ALL USERS --//
exports.getAllUsers=async(req,res)=>{
    
    try{
        const users = await User.find({})
        res.status(200).json(users)    
    }catch(err){
        res.status(400).json({error:err.message})
    }
}

//-- GET A USER --//
exports.getSingleUser = async (req,res)=>{
    const id = req.params.id
   // const userId = req.user._id
    try{
        if(!mongoose.Types.ObjectId.isValid(id))
            res.status(500).json({error:'user doesnt exist'})
            

        const user = await User.findById(id)

        if(!user)
            res.status(500).json({error:'No such user'})

        // TO GETE EVERY THING EXEPT PASSWORD
        const {password, ...others} = user._doc 

        res.status(200).json({user:others})

    }catch(err){
        res.status(400).json({error:err.message})

    }
}


//-- UPDATE A USER --//
exports.updateUser = async (req,res)=>{
    const id = req.params.id

    // const admin = req.user.isAdmin
    console.log(req)

        if (req.body.password) {
            try {
              const salt = await bcrypt.genSalt(10);
              req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
              return res.status(500).json(err);
            }
          }
            try{
                
                const updatedUser = await User.findByIdAndUpdate(req.userId,{
                    $set: req.body,
                },{new:true})

                res.status(200).json(updatedUser)
            }catch(err){
                return res.status(400).json({error:err.message})

            }
     
}
//-- DELETE A USER --//
exports.deleteUser = async (req,res)=>{
    const id = req.params.id

    try{

        const deleteUser = await User.findByIdAndDelete(req.userId)

        res.status(200).json({msg:'User has been deleted'})

    }catch(err){
        res.status(400).json({error:err.message})

    }
}
//-- FOLLOW A USER --//

//-- UNFOLLOW A USER --//

//-- FRIENDS LIST --//
exports.getUserFriends = async (req,res)=>{
    const id = req.params.id
   
   try{
    const user = await User.findById(id)

    const frineds = await Promise.all(
        user.friends.map(id=> User.findById(id))
    )

    const formatted = frineds.map(
       ( {
            _id,
            firstName,
            lastName,
            email,
            profilePicture
        
        })=>{
            return {
                _id,
                firstName,
                lastName,
                email,
                profilePicture
            }
        }
    )

    res.status(200).json(formatted)
   }catch(err){
    res.status(400).json({error:err.message})
   }
}

//-- ADD REMOVE FRIENDS --//
exports.addRemoveFriends = async (req,res)=>{
    const {  id , friendId} = req.params
    if(!mongoose.Types.ObjectId.isValid(id && friendId))
        return res.status(500).json({error:'user doesnt exist'})
    
    // if(!mongoose.Types.ObjectId.isValid(friendId))
    //     return res.status(500).json({error:'user doesnt exist'})
   
    try{
        const user = await User.findById(id)
        const friend = await User.findById(friendId)

        if(user.friends.includes(friendId)){
            user.friends = user.friends.filter(id => id !== friendId)
            friend.friends = friend.friends.filter(id=>{
                id !== id
            })
        }else{
            user.friends.push(friendId)
            friend.friends.push(id)
        }

        await user.save()
        await friend.save()

        const frineds = await Promise.all(
            user.friends.map(id=> User.findById(id))
        )
    
        const formatted = frineds.map(
           ( {
                _id,
                firstName,
                lastName,
                email,
                
            })=>{
                return {
                    _id,
                    firstName,
                    lastName,
                    email,
                   
                }
            })

        res.status(200).json(formatted)
        

    }catch(err){
        res.status(400).json({error:err.message})

    }
}