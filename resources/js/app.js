let addToCart = document.querySelectorAll(".add-to-cart");
let cartCounter = document.querySelector("#cartCounter");

import axios from "axios";
const Noty = require("noty");

const updateCart = (pizza) => {
  //server request

  axios
    .post("/update-cart", pizza)
    .then((res) => {
      cartCounter.innerHTML = res.data.totalQty;

      new Noty({
        type: "success",
        timeout: 1000,
        progressBar: false,
        text: "Items added into cart",
      }).show();
    })
    .catch((err) => {
      new Noty({
        type: "error",
        timeout: 1000,
        progressBar: false,
        text: "Something went wrong",
      }).show();
    });
};

addToCart.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let pizza = JSON.parse(btn.dataset.pizza);
    updateCart(pizza);
  });
});
