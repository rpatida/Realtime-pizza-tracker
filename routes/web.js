const homeController = require("../app/http/controllers/homeController");
const authController = require("../app/http/controllers/authController");
const cartController = require("../app/http/controllers/cartController");
const orderController = require("../app/http/controllers/orderController");
const adminOrderController = require("../app/http/controllers/admin/adminOrderController");
const quest = require("../app/http/middlewares/quest");
const auth = require("../app/http/middlewares/auth");
const admin = require("../app/http/middlewares/admin");

const initRoutes = (app) => {
  app.get("/", auth, homeController().index);
  app.get("/login", quest, authController().login);
  app.post("/login", authController().postLogin);
  app.get("/register", quest, authController().register);
  app.post("/register", authController().postRegister);
  app.post("/logout", authController().logout);

  app.get("/cart", auth, cartController().index);
  app.post("/update-cart", cartController().update);

  //customer route
  app.post("/orders", auth, orderController().store);
  app.get("/customer/orders", auth, orderController().index);

  //Admin Routes
  app.get("/admin/orders", admin, adminOrderController().index);
};

module.exports = initRoutes;
