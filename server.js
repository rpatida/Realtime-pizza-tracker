const express = require("express");
const app = express();
const ejs = require("ejs");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const session = require("express-session");
const flash = require("express-flash");
const MongoDBStore = require("connect-mongo")(session);
const passport = require("passport");
const Emitter = require("events");

//setting up config file
dotenv.config({ path: "app/config/config.env" });

//Database connection
mongoose
  .connect(process.env.DB_LOCAL_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log("Db connected...");
  });

const connection = mongoose.connection;

//session store
let mongoStore = new MongoDBStore({
  mongooseConnection: connection,
  collection: "sessions",
});

//Event Emitter
const eventEmitter = new Emitter();
app.set("eventEmitter", eventEmitter);

//session config
app.use(
  session({
    secret: process.env.COOKIES_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, //24 hours
  })
);
//passport config
const passportInit = require("./app/config/passport");
const { Socket } = require("dgram");
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Global middleware
app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.user = req.user;
  next();
});

//Assets
app.use(express.static("public"));

// set template engine
app.use(expressLayouts);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");

require("./routes/web")(app);
app.use((req, res) => {
  res.status(404).render("errors/404");
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Listing on port ${process.env.PORT}`);
});

//socket
const io = require("socket.io")(server);
io.on("connection", (socket) => {
  //join

  socket.on("join", (orderId) => {
    socket.join(orderId);
  });
});

eventEmitter.on("orderUpdated", (data) => {
  io.to(`order_${data.id}`).emit("orderUpdated", data);
});

eventEmitter.on("orderPlaced", (data) => {
  io.to("adminRoom").emit("orderPlaced", data);
});
