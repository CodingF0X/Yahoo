const Chat = require("../../Models/Messenger/chatModel");
const Message = require("../../Models/Messenger/messageModel");


exports.createMessage = async (req, res) => {
    //const sender = req.userId
  try {
    //sender hoa al user mn auth
    // content ta5th.ha mn al textbox (ast5dm usestate)
    // chat id mn allMessages behn al chtId ;)
    const userId = req.userId
    const { content, chatId } = req.body;
    const message = new Message({ sender:userId, content, chatId });
    await Chat.findByIdAndUpdate({_id:chatId},{
        latestMessages: message._id
    },{new:true})
    await message.save();
    res.status(201).json(message);
    console.log({sender:userId,body:content,chatId: chatId})
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMessagesByChat = async (req, res) => {
  try {
    const chatId = req.params.chatId;
    const messages = await Message.find({ chatId });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};