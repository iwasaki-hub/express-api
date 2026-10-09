require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(morgan("dev"));

app.use((req, res, next) => {
  console.log(req.headers["user-agent"].split(" ")[0] || "unknown");
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "Hello Express 👋" });
});

// Auth routes
app.use("/api/auth", require("./routes/authRoutes"));
// User routes
app.use("/api/users", require("./routes/userRoutes"));
// Study record routes
app.use("/api/study-records", require("./routes/studyRecordRoutes"));

app.listen(PORT, async () => {
  await connectDB();
  console.log(`🚀 Server is ruuning on port ${PORT}`);
});
