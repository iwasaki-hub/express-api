const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // CookieからJWTを取得
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "ログインが必要です",
      });
    }

    // JWTを検証
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 認証されたユーザー情報をreqに保存
    req.user = {
      userId: decoded.userId,
    };

    next();
  } catch (error) {
    console.error("Auth error:", error);

    return res.status(401).json({
      message: "認証に失敗しました",
    });
  }
};

module.exports = authMiddleware;
