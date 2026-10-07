const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "ユーザー名は必須です"],
      unique: true,
      trim: true,
      minlength: [2, "ユーザー名は2文字以上で入力してください"],
      maxlength: [30, "ユーザー名は30文字以内で入力してください"],
    },
    email: {
      type: String,
      required: [true, "メールアドレスは必須です"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "パスワードは必須です"],
      minlength: [4, "パスワードは4文字以上で入力してください"],
      select: false,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
module.exports = User;
