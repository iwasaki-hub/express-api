const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

/* ========================================
   Register
======================================== */

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({
      $or: [{ name }, { email }],
    });

    if (existingUser) {
      return res.status(409).json({
        message: "名前またはメールアドレスは既に使用されています",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "ユーザー登録が完了しました",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Register error:", error);

    res.status(500).json({
      message: "ユーザー登録に失敗しました",
    });
  }
};

/* ========================================
   Login
======================================== */

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    /* ------------------------------------
       1. ユーザーを取得
    ------------------------------------ */

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        message: "メールアドレスまたはパスワードが正しくありません",
      });
    }

    /* ------------------------------------
       2. パスワードを比較
    ------------------------------------ */

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "メールアドレスまたはパスワードが正しくありません",
      });
    }

    /* ------------------------------------
       3. JWTを発行
    ------------------------------------ */

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    /* ------------------------------------
       4. JWTをHttpOnly Cookieに保存
    ------------------------------------ */

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    /* ------------------------------------
       5. ログイン成功
    ------------------------------------ */

    res.status(200).json({
      message: "ログイン成功",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      message: "ログインに失敗しました",
    });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select(
      "_id name email createdAt",
    );

    if (!user) {
      return res.status(404).json({
        message: "ユーザーが見つかりません",
      });
    }

    res.status(200).json({
      user,
    });
  } catch (error) {
    console.error("Get me error:", error);

    res.status(500).json({
      message: "ユーザー情報の取得に失敗しました",
    });
  }
};

const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  res.status(200).json({
    message: "ログアウトしました",
  });
};

module.exports = {
  register,
  login,
  getMe,
  logout,
};
