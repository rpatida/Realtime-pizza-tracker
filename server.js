const express = require("express");
const app = express();
const ejs = require("ejs");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const PORT = process.env.PORT || 3300;

//Assets
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.render("home");
});

// set template engine
console.log(path.join(__dirname, "/resources/views"));
app.use(expressLayouts);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");

app.listen(PORT, () => {
  console.log(`Listing on port ${PORT}`);
});
