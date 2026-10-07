const bcrypt = require("bcryptjs");
const User = require("../models/User");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // ユーザーが既に存在するか確認

    const existingUser = await User.findOne({ $or: [{ name }, { email }] });
    if (existingUser) {
      return res.status(409).json({
        message: "ユーザー名またはメールアドレスは既に使用されています",
      });
    }

    // パスワードをハッシュ化

    const hashedPassword = await bcrypt.hash(password, 10);

    // ユーザー作成

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      message: "ユーザー登録が完了しました",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "ユーザー登録に失敗しました" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // select: falseなのでpasswordを明示的に取得
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(401)
        .json({ message: "メールアドレスまたはパスワードが正しくありません" });
    }

    // パスワードを比較

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ message: "メールアドレスまたはパスワードが正しくありません" });
    }
    res.status(200).json({
      message: "ログイン成功",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "ログインに失敗しました" });
  }
};
module.exports = { register, login };
