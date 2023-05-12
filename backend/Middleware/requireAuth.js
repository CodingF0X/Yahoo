const JWT = require('jsonwebtoken')
const User = require('../Models/UserModel')
const { decode }  = require('jsonwebtoken')


const requireAuth =  async (req,res,next)=>{
    const {authorization} = req.headers
    // console.log(req.headers)
    if(!authorization){
        return res.status(400).json({error:'authorization token required'})
    }

                  // this part is the token
    /// bearer asdjnaslnflasnfasfasf.lajsfhklashfklaafasfaf.klasfklashfklahfaf

    // so we split that string :

    const token = authorization.split(' ')[1]

    
    try{
        const isCustomAuth = token.length < 500
        let decodedData

        if(token && isCustomAuth){
        // const {_id} = JWT.verify(token,process.env.SECRET)
        // req.user = await User.findOne({_id}).select('_id')
        decodedData = JWT.verify(token,process.env.SECRET)
        req.userId = decodedData?._id

        }else{
            decodedData = decode(token)
            req.userId = decodedData?.sub
        }
        next()
    }
    catch(error){
        console.log(error)
        res.status(400).json({error:'request is not authorized'})
    }


  

}

module.exports = requireAuth