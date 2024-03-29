const express = require('express')
const app = express()
const dotEnv = require('dotenv').config()
const mongoose = require('mongoose')
const helmet = require('helmet')
const morgan = require('morgan')
const  multer = require ("multer");
const path = require ("path");
const { fileURLToPath } = require("url");
const cors = require('cors')


//-- ROUTERS --//
const authRouter = require('./Routes/AuthRouter')
const userRouter = require('./Routes/UserRouter')
const postRouter = require('./Routes/PostRouter')
const searchRouter = require('./Routes/SearchRoutes')
const requireAuth = require('./Middleware/requireAuth')
const { createPost } = require('./Controllers/postController')

app.use(cors())
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan('common'))



mongoose.set('strictQuery', false)
const DB = mongoose.connect(process.env.MONGO_URI)

app.listen(process.env.PORT, DB,()=>{
    console.log('connected to db') 
    console.log('server is up and running')
   })


app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  const upload = multer({ storage });

app.post('/api/posts', requireAuth, upload.single("picture"), createPost);


app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)
app.use('/api/posts',postRouter)
app.use(`/api/filter/`,searchRouter)
   