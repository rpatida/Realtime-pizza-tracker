const express = require("express");
const app = express();
const ejs = require("ejs");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const PORT = process.env.PORT || 3300;

//Assets
app.use(express.static("public"));

// set template engine
console.log(path.join(__dirname, "/resources/views"));
app.use(expressLayouts);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/login", (req, res) => {
  res.render("auth/login");
});
app.get("/register", (req, res) => {
  res.render("auth/register");
});
app.get("/cart", (req, res) => {
  res.render("customers/cart");
});

app.listen(PORT, () => {
  console.log(`Listing on port ${PORT}`);
});
