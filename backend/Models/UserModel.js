const mongoose = require('mongoose')
const schema = mongoose.Schema

const userSchema = new schema({
    firstName:{
        type:String,
        required:true,
        min:5,
        max:20,
    },
    lastName:{
        type:String,
        required:true,
        min:5,
        max:20,
    },
    userName:{
        type:String,
        default:'',
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:6
    },
    profilePicture:{
        type:String,
        default:''
    },
    coverImage:{
        type:String,
        default:''
    },
    friends: {
        type: Array,
        default: [],
    },
    age:{
        type:Number,
        required:false
    },

    // followers:{
    //     type:Array,
    //     default:[]
    // },
    // following:{
    //     type:Array,
    //     default:[]
    // },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isModerator:{
        type:Boolean,
        default:false
    },
    location:{
        type:String,
        default:''
    },
    occupation:{
        type:String,
        default:''
    }
},{timestamps:true})

userSchema.index({firstName:'text',lastName:'text',userName:'text'})

const User = mongoose.model('user',userSchema)

module.exports = User