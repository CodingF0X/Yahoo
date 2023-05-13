const Chat = require("../../Models/Messenger/chatModel");
const Message = require("../../Models/Messenger/messageModel");
const User = require("../../Models/UserModel");

exports.createChat = async (req, res) => {
  // const { members, firstMessage } = req.body;
  //const sender = req.userId
  const { sender, reciever, firstMessage } = req.body;
  try {
    const user = await User.findOne({_id:sender});
    const newChat = await new Chat();
    const msg = await Message.create({
      sender: user._id,
      content: firstMessage,
      chatId: newChat._id,
    });

    newChat.members = [user._id, reciever],
    newChat.firstMessage = firstMessage,
    newChat.latestMessages = msg._id
    newChat.save();

    res.status(200).json(newChat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//-- GET ALL CHATS --//
exports.getAllChats = async (req, res) => {
  try {
    const chats = await Chat.find()
      .lean()
      .populate({
        path: "members",
        select: ["firstName", "lastName", "Picture"],
      })
      .populate({ path: "latestMessages", select: ["content"] });

    res.status(200).json(chats);
    // console.log(chats)
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//-- GET SINGLE CHAT BY USER ID --//
exports.getSingleChat = async (req, res) => {
  const { userId } = req.params;
  try {
    // const msg = await Message.find()
    const singleChat = await Chat.findOne({
      members: { $in: [userId] },
    }).populate({path:'latestMessages',select:'content'}).sort({'createdAt': -1})


    res.status(200).json(singleChat);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//-- CREATE NEW CHAT --//
// exports.createChat = async (req,res)=>{
//     const sender = req.userId
//     const reciever = req.body.recieverId
//     try{
//         const user = await User.findOne(sender)
//         const newChat = await new Chat()
//         const msg = await Message.create({
//             sender: user._id,
//             content: req.body.message,
//             chat: newChat._id
//         })

//         newChat.users = [user._id,reciever],
//         newChat.firstMessage = req.body.message,
//         newChat.latestMessages =  msg._id
//         newChat.save()

//         res.status(200).json(newChat)

//     }catch(err){
//         res.status(400).json({error:err.message})
//     }
// }
