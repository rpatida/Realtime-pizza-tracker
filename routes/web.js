const homeController = require("../app/http/controllers/homeController");
const authController = require("../app/http/controllers/authController");
const cartController = require("../app/http/controllers/cartController");
const quest = require("../app/http/middlewares/quest");

const initRoutes = (app) => {
  app.get("/", homeController().index);
  app.get("/login", quest, authController().login);
  app.post("/login", authController().postLogin);
  app.get("/register", quest, authController().register);
  app.post("/register", authController().postRegister);
  app.post("/logout", authController().logout);

  app.get("/cart", cartController().index);
  app.post("/update-cart", cartController().update);
};

module.exports = initRoutes;
