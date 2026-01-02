require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const path = require("path");

// view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// routes
app.get("/", (req, res) => {
  console.log(req.headers);
  res.render("index", {
    title: "Home",
    message: "Hello Express + EJS 👋",
  });
});

app.get("/users", (req, res) => {
  res.render("users", {
    title: "Users List",
    message: "Hello Express + EJS 👋",
    users: ["Mario", "Luigi", "Peach"],
  });
});

app.listen(PORT, () => {
  console.log(`🚀 server is running on port ${PORT}`);
});
