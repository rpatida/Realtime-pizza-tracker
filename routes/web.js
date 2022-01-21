const homeController = require("../app/http/controllers/homeController");
const authController = require("../app/http/controllers/authController");
const cartController = require("../app/http/controllers/cartController");
const orderController = require("../app/http/controllers/orderController");
const adminOrderController = require("../app/http/controllers/admin/adminOrderController");
const statusController = require("../app/http/controllers/admin/statusController");
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
  app.get("/customer/orders/:id", auth, orderController().show);

  //Admin Routes
  app.get("/admin/orders", admin, adminOrderController().index);
  app.post("/admin/order/status", admin, statusController().update);
};

module.exports = initRoutes;
