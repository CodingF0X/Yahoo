const Post = require("../Models/PostModel");
const User = require("../Models/UserModel");


exports.searchFilter = async (req,res)=>{
    const {type,query} = req.body.searchTerm
  const searchTerm = query ? new RegExp(query) : ' '
  
    try{
        

        switch(type){
            case 'userProfile':
           //const users = await User.find({$text:{$search:query}})
           
            const users = await User.aggregate([{
                        $match:{
                            $or:[{
                            'firstName':{
                                $regex:searchTerm,
                            }
                        },{
                            'lastName':{
                                $regex:searchTerm
                            }
                        }]
                        }
                    }])
       
             res.status(200).json({users:users})
            break;

            case 'POSTS':
                
                    const posts = await Post.aggregate([{
                        $match:{
                            $or:[{
                                'description':{
                                    $regex:searchTerm,
                                }
                            }]
                        }
                    }])

                    res.status(200).json({posts:posts})
                    break;
                
        }
        
        
    }catch(err){
        res.status(400).json({error:err.message})
    }
}