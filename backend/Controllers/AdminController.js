const User = require("../Models/UserModel");

//-- GET ALL USERS --//
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    // const totalUsers = await User.countDocuments()

    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//-- UPDATE A USER --//
exports.toggleModerator = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    console.log(updatedUser);
    res.status(200).json(updatedUser);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

//-- DELETE USER --//
exports.deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    res.status(200).json(id);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


