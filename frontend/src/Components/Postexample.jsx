import { Favorite, FavoriteBorder, Filter, MoreVert, Share } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  IconButton,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { timelinePosts } from "../State/Action-Creators/PostActions";



const Post = ({post}) => {
    // const dispatch = useDispatch()
    // const timeline = useSelector(state=>state.timelinePosts)
    // const {error,loading,posts} = timeline

    const userLogin = useSelector(state=>state.userLogin)
    const {user} = userLogin

    const freind_Post = useSelector(state=>state.timelinePosts)
    const { userFriend } = freind_Post

    //-- CONVERTINGT THE WHOLE user OBJECT to ARRAY --//
    var postPublisher = [...Array(user.user)].map(i=>{
      return i
    });




    // useEffect(()=>{
    //     dispatch(timelinePosts(user.token))
    //     console.log(user.token)
    // },[dispatch])

  //  const userToArray = [...Array(user)].map(i=>{
  //     return i
  // }
  // )


     
//  const x =  [...Array(user)].filter(u=> u.user._id === post.userId
//   )[0]
  
// const userToArray = [...Array(user)]
// {userToArray.find(i=>(
         
//   console.log( i.user._id === post?.userId).userName)
//   )}

const handleFriend = (x)=>{
 
  for(let i=0 ; i <= x.length ; i++){
    for(let j=0 ; j <= x[i].length ; j++){
     // console.log(freindPost.map(f=>f[i][j]._id === post.userId)[i][j].userName) 
      // userFriend[i++][j] 
      // const  friendlogic = friend._id === post.userId && friend.userName
      //  console.log(friendlogic)
      //  return friendlogic
    
    }
  // return freindPost[i][0]._id === post.userId ? freindPost[i][0].userName : freindPost[i+1][0].userName


  console.log(post.userId)
   
  // console.log(userFriend[i][0]._id === post.userId && userFriend[i][0].userName )
  //return x[i][0]._id === post.userId ? x[i][0].userName : 'someuser'


  // console.log(freindPost[i][0]._id)

  //  if(freindPost[i][0]._id === post.userId){
  //   return freindPost[i][0].userName
  //  }else{
  //    return freindPost[+i][0].userName
  //  }

 }

}

// const hadnleArrayFriedds=()=>{
//   userFriend.forEach((friend) => {
//     friend.forEach((data) => {
//        return data._id === post.userId && data.userName
//     }
//   )});
// }
  
// userFriend.forEach((friend) => {
//   friend.forEach((data) =>  data._id === post.userId && data.userName)})
  



 



const garage = [
              ['mustange','explorer','victoria'],
              ['corvette','bmw','benz'],
              ['kia','toyota','tesla']
]

// for(let i=0; i < garage.length ; i++){
//   for(let j=0; j < garage[i].length ; j++){
//     console.log(i,j,garage[i][j])
//   }

  
// }


  return (
    <Card sx={{ margin: 5 }}> 
      <CardHeader    
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title={postPublisher.find((u) =>  u._id ===post.userId )? 
          postPublisher.find((u) =>  u._id ===post.userId ).userName

        : userFriend.map((friend) => friend.map((data) =>  data._id === post.userId && data.userName))
        }
        subheader="September 14, 2022"
      />
      <CardMedia
        component="img"
        height="20%"
        image="https://images.pexels.com/photos/4534200/pexels-photo-4534200.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        alt="Paella dish"
      />
      <CardContent>
     
        <Typography variant="body2" color="text.secondary">
        {post.description}
        </Typography>
        
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite sx={{ color: "red" }} />}
          />
          {post.likes.length >0 && post.likes.length }
        </IconButton>
        <IconButton aria-label="share">
          <Share />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Post