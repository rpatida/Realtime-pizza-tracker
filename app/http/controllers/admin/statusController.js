const Order = require("../../../models/order");

const statusController = () => {
  return {
    update(req, res) {
      // find order
      Order.updateOne(
        { _id: req.body.orderId },
        { status: req.body.status },
        (err, data) => {
          if (err) {
            return res.redirect("/admin/orders");
          }
          //Emite Event f
          const eventEmitter = req.app.get("eventEmitter");
          eventEmitter.emit("orderUpdated", {
            id: req.body.orderId,
            status: req.body.status,
          });
          return res.redirect("/admin/orders");
        }
      );
    },
  };
};

module.exports = statusController;
