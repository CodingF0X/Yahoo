const User = require("../Models/UserModel");
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')

const createToken = (_id)=>{
    return JWT.sign({_id:_id},process.env.SECRET,{expiresIn:'1h'})
}

//-- REGISTER USER --//
exports.createUser = async (req,res)=>{
    const {firstName,lastName,email,password,profilePicture,
        coverImage} = req.body

    const  uniq = '_ID' + (new Date()).getTime()
    try{
        const salt = await bcrypt.genSalt()
        const hashedPWD = await bcrypt.hash(password,salt)

        const user = await User.create({
            firstName,
            lastName,
            email,
            password : hashedPWD,
            profilePicture,
            coverImage,
            
            userName: `${firstName}_${lastName}${uniq}` 

        })

        const token = createToken(user._id)
        res.status(200).json({result:user,token})
    }catch(err){
        res.status(400).json({error:err.message})
    }
}


//-- USER LOGIN --//
exports.userLogin = async (req,res)=>{
    const {email,password} = req.body

    try{

        const user = await User.findOne({email})
        if(!user)
            res.status(500).json({error: 'User doesnt exist'})
        
        const auth = await bcrypt.compare(password,user.password)
        if(!auth)
        return res.status(500).json({error: 'Invalid user credentials'})

        const token = createToken(user._id)

      // const {password, ...others} = user._doc

        res.status(200).json({result:user ,token})

    }catch(err){
        res.status(400).json({error:err.message})
    }
}

//-- GOOGLE AUTH --//
