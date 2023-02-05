const mongoose = require('mongoose')
const schema = mongoose.Schema

const postSchema = new schema({
    userId:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        max:500
    },
    image:{
        type:String,
        default:''
    },
    likes:{
        type:Array,
        default:[]
    },
    comments:[{
        type:mongoose.Types.ObjectId,
        ref:'comment'
    }]

},{timestamps:true})

postSchema.index({description:'text'})

const Post = mongoose.model('post',postSchema)

module.exports = Post