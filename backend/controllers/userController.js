const User = require("../models/User");

const getUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("_id name email createdAt")
      .sort({ createdAt: -1 });
    res.status(200).json({ users });
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ message: "ユーザー一覧の取得に失敗しました" });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select(
      "_id name email createdAt",
    );

    if (!user) {
      return res.status(404).json({
        message: "ユーザーが見つかりません",
      });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Get user error:", error);

    res.status(500).json({
      message: "ユーザー情報の取得に失敗しました",
    });
  }
};
module.exports = { getUsers, getUserById };
