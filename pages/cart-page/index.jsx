import React from "react";
import CartItem from "./../../components/CartItem/CartItem";
import img_01 from "./../../components/WishListItem/img/card-img-01.jpg";
import img_02 from "./../../components/WishListItem/img/card-img-02.jpg";
import img_03 from "./../../components/WishListItem/img/card-img-03.jpg";
import img_04 from "./../../components/WishListItem/img/card-img-04.jpg";
import Delivery from "./../../components/Auth/Delivery";
import CheckoutPrices from "./../../components/Auth/CheckoutPrices";

const cartListItems = [
  {
    title: "Ribbed polo-Neck Jumper",
    subtitle: "Neck Jumper",
    price: "$39.90",
    priceOld: "$59.90",
    img: img_01.src,
  },
  {
    title: "Ribbed polo-Neck Jumper",
    subtitle: "Jack jones",
    price: "$39.90",
    priceOld: "$59.90",
    img: img_02.src,
  },
  {
    title: "Ribbed polo-Neck Jumper",
    subtitle: "Neck Jumper",
    price: "$39.90",
    priceOld: "$59.90",
    img: img_03.src,
  },
  {
    title: "Ribbed polo-Neck Jumper",
    subtitle: "Weed Jumper",
    price: "$39.90",
    priceOld: "$59.90",
    img: img_04.src,
  },
];
const prices = {
  totalPrice: "267.90",
  discount: "7.90",
  currency: "$",
};
const ProductPage = () => {
  return (
    <section>
      <div className="container">
        <h2 className="cart__title">PRODUCT CART</h2>
        <h3 className="cart__title-small">PRODUCT ITEMS</h3>
        <div className="cart__wrapp">
          <div className="cart-list__wrapp">
            <ul className="cart-list">
              {cartListItems.map((item, index) => (
                <CartItem
                  key={index}
                  image={item.img}
                  title={item.title}
                  subtitle={item.subtitle}
                  price={item.price}
                  priceOld={item.priceOld}
                />
              ))}
            </ul>
          </div>
          <Delivery prices={prices} deviceClass="desk" />
          <CheckoutPrices prices={prices} deviceClass="mob" />
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
