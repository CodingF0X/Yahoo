const { default: mongoose } = require("mongoose");
const Comment = require("../Models/CommentModel");
const Post = require("../Models/PostModel");
const User = require("../Models/UserModel");


//-- GET ALL POSTS --//
exports.getAllPosts = async (req, res) => {
    try {
      const posts = await Post.find({});
      res.status(200).json(posts);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

//-- CREATE POST --//
exports.createPost = async (req,res)=>{
    const { name,description,image,likes,comments } = req.body
    const userId = req.userId
    // console.log(req)
    try{
        const user = await User.findById(userId)
        const newPost = await Post.create({
            ...req.body,
            name : `${user.firstName} ${user.lastName}`,
            userId
            
        })

        await newPost.save()
        //const post = await Post.find()
        res.status(200).json(newPost)
    }catch(err){
        res.status(400).json({error:err.message})
    }    
}

//-- GET SINGLE POST --// 
exports.getSinglePost = async (req,res)=>{
    const id = req.params.id

    try{

        const post = await Post.findById(id).lean().populate({path:'comments',populate:{path:'author',select:['firstName','lastName','profilePicture']}})
        res.status(200).json(post)

    }catch(err){
        res.status(400).json({error:err.message})
    }
}

//-- GET TIMELINE POSTS --//
exports.timelinePosts = async (req,res)=>{
    // console.log(userId)
  
    try{
          
        const userId = req.userId
        //console.log(userId)
        // get the user of the current session
        const currentUser = await User.findById(userId)
        // get the post of the user of the current session
        const userPosts = await Post.find({userId:currentUser._id}).populate({path:'comments',populate:{path:'author',select:['firstName','lastName','profilePicture']}})
        console.log(userPosts)
        // get all posts of friends of the user mentioned above.
        const friendPosts = await Promise.all(
            currentUser.friends.map(id=>{
                // const friend =  User.find({_id:id})
               const post =Post.find({userId:id}).populate({path:'comments',populate:{path:'author',select:['firstName','lastName','profilePicture']}})
               return post
            })
        )
   

        // const userFriend = await Promise.all( currentUser.friends.map(id=>{
        //     const friend =  User.find({_id:id})
        //     return friend   
        //  })
        // )     this is used to compare the friendID with userId of post so we can show the post creator
        

        const posts = await userPosts.concat(...friendPosts)

        res.status(200).json({timeline:posts})

    }catch(err){
        res.status(400).json({error:err.message})
    }

}

// exports.timelinePosts = async (req,res)=>{
//         const userId = req.userId
//         const currentUser = await User.findById(userId)
//         // get the post of the user of the current session
//          await  Post.find({userId:currentUser._id}).lean().populate({path:'comments', populate:{path:'author',select:['firstName','lastName','profilePicture']}}).exec() 
//               .then(post=>res.json(post))

               
//                //res.json(userPosts)
// }

//-- GET PROFILE POSTS --//
exports.getProfilePosts = async (req,res)=>{
    //console.log(req)
    try{
        const userId = req.params.userId

        const posts = await Post.find({userId}).populate({path:'comments',populate:{path:'author',select:['firstName','lastName','profilePicture']}})
        
        res.status(200).json(posts)

    }catch(err){
        res.status(400).json({error:err.message})
    }
}

//-- UPDATE POST --//
exports.updatePost = async (req,res)=>{
    const id = req.params.id
    const userId = req.userId
    //console.log(req)
    try{
        
        const post = await Post.findByIdAndUpdate(id,{
            $set:req.body
        },{new:true}).populate({path:'comments',populate:{path:'author',select:['firstName','lastName','profilePicture']}})

        // if(post.userId === userId){
        //     await post.updateOne({$set:req.body})
        //     res.status(200).json(post)
        // }else{
        //     res.status(400).json({error:' permision declined'})

        // }

        // await post.updateOne({$set:req.body})
        res.status(200).json(post)

    }catch(err){
        res.status(400).json({error:err.message})
    }
}

//-- DELETE POST --//
exports.deletePost = async (req,res)=>{
    const id = req.params.id

    try{

        if(!mongoose.Types.ObjectId.isValid(id))
            return res.status(500).json({error:'Post doesnt exist'})


        const post = await Post.findById(id)

        if(!post)
            return res.status(500).json({error:'Post doesnt exist'})

            const deletePost = await Post.findByIdAndDelete(id)
             res.status(200).json(deletePost)
             console.log(deletePost)

        // if(post.userId === req.user._id){
        //     await post.deleteOne()
        //     res.status(200).json('Post has been deleted')
        // }else{
        //     res.status(400).json({error:' permision declined'})

        // }
    }catch(err){
        res.status(400).json({error:err.message})
    }
}

//-- POST LIKES --//
exports.likePost = async (req,res)=>{
    const id = req.params.id
    const  userId  = req.userId
    //console.log(userId.toString())
    try{

        
    //     const post = await Post.findById(id)
    //     const isLiked = post.likes.findIndex(id=>id===String(userId));

    //     if (isLiked) {
    //       post.likes.push(userId.toString());
    //     } else {
    //         post.likes = post.likes.filter((id) => id !== String(userId));
    //     }

    // const updatedPost = await Post.findByIdAndUpdate(
    //   id,
    //   { likes: post.likes },
    //   { new: true }
    // );
    //     res.status(200).json(updatedPost)

        const post = await Post.findById(id)
        if(!post.likes.includes(String(userId))){
            await post.updateOne({$push:{likes:String(userId)}})
            //res.status(200).json(post)
        }else{
            await post.updateOne({$pull:{likes:String(userId)}})
          // res.status(200).json(post)

        } 
        const updatedPost = await Post.findByIdAndUpdate(id,{
            post
        },{new:true}).populate({path:'comments',populate:{path:'author',select:['firstName','lastName','profilePicture']}})

        res.status(200).json(updatedPost)

    }catch(err){
        res.status(400).json({error:err.message})
    }
}

//-- POST COMMENTS --//
exports.commentPost= async (req,res)=>{
    const id = req.params.id
    try{
        const comment = await Comment.create({
            ...req.body,
            author:req.userId
        })
        //console.log(comment) 
        //comment.author = req.userId
        const post = await Post.findById(id)
        await post.updateOne({$push:{comments:comment._id}})
         //await post.comments.unshift(comment._id)
        //  await post.save()
        const updatedPost = await Post.findByIdAndUpdate(id,{
            post
        },{new:true}).populate({path:'comments',populate:{path:'author',select:['firstName','lastName','profilePicture']}})
        console.log(updatedPost)
        res.status(200).json(updatedPost)
    }catch(err){
        res.status(400).json({error:err.message})
    }
}

//-- Edit Comment --//
exports.editComment=async(req,res)=>{
    const id=req.params.id
    const commentId = req.params.commentId

    try{

        const post = await Post.findById(id)
        if(post.comments){

        
          
           await Comment.findByIdAndUpdate(commentId,{
            $set:req.body
          },{new:true})
        
          const updatedPost = await Post.findById(id).populate({path:'comments',populate:{path:'author',select:['firstName','lastName','profilePicture']}})
          res.status(200).json(updatedPost)
        }else{
            res.status(500).json({error:'post has no comments'})
        }

    }catch(err){
        res.status(400).json({error:err.message})
    }
}


//-- COMMENT LIKES --//
exports.likeComment = async (req,res)=>{
    const userId = req.userId
    const id = req.params.id
    const commentId = req.params.commentId
    // var user = mongoose.Types.ObjectId(userId)
console.log(req)
    try{

        const comment = await Comment.findById(commentId)
        if(!comment.likes.includes(userId)){
            await comment.updateOne({$push:{likes:userId}})
        }else{
            await comment.updateOne({$pull:{likes:userId}})
        }

        // await Comment.findByIdAndUpdate(commentId,{
        //     comment
        // },{new:true})

        console.log(comment)

        const updatedPost = await Post.findById(id).populate({path:'comments',populate:{path:'author',select:['firstName','lastName','profilePicture']}})
        
        console.log(updatedPost)
        res.status(200).json(updatedPost)

    }catch(err){
        res.status(400).json({error:err.message})
    }
}

//-- DELETE COMMENT --//
exports.deleteComment = async (req,res)=>{
    const userId = req.userId
    const id = req.params.id
    const commentId = req.params.commentId

    try{

        const comment = await Comment.findByIdAndDelete(commentId)
        const updatedPost = await Post.findById(id).populate({path:'comments',populate:{path:'author',select:['firstName','lastName','profilePicture']}})
        
        //console.log(updatedPost)
        res.status(200).json(updatedPost)

    }catch(err){
        res.status(400).json({error:err.message})
    }
}