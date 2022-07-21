import ReactDom from "react-dom";
import React, { useCallback, useEffect, useState } from "react";
import "./Cart.css";
import BagProductCard from "../BagProductCard/BagProductCard";
import { FaTimes } from "react-icons/fa";

const Cart = ({ addedToCart, showCart, handleClose }) => {
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/cart`, {
      method: "GET"
    })
      .then(response => response.json()).then(data => setCartProducts(data))
      .catch(error => console.log(error));
  }, [addedToCart]);

  const totalCart = cartProducts?.reduce((sum, product) => {
    sum += product.quantity * product.price;
    return sum;
  }, 0);

  const deleteProduct = useCallback(async (id) => {
    await fetch(`http://localhost:5000/cart/${id}/delete`, {
      method: "DELETE",
      body: JSON.stringify({
        id: id
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(res => res.json()).then(data => setCartProducts(data));
  }, []);

  const incrementQuantity = useCallback(async (id) => {
    await fetch(`http://localhost:5000/cart/${id}/increaseQuantity`, {
      method: "PUT",
      body: JSON.stringify({
        id: id
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(res => res.json())
      .then(data => setCartProducts(data));
  }, []);

  const decrementQuantity = useCallback(async (id) => {
    await fetch(`http://localhost:5000/cart/${id}/decreaseQuantity`, {
      method: "PUT",
      body: JSON.stringify({
        id: id
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(res => res.json())
      .then(data => setCartProducts(data));
  }, []);

  if (!showCart) {
    return null;
  }

  return ReactDom.createPortal(
    <div className="blurBackground">
      <div className="cartContainer">

        {/*Cart Header*/}
        <div className="cartHeader">
          <h3 className="cartTitle">Your Cart</h3>
          <FaTimes className="closeCartBtn" onClick={handleClose} />
        </div>

        {/*Cart Body*/}
        <div className="cartBody">{cartProducts?.map(product => (
          <BagProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            author={product.author}
            imageURL={require(`../../images/books/${product.imageURL}`)}
            price={product.price}
            quantity={product.quantity}
            deleteProduct={() => deleteProduct(product.id)}
            incrementQuantity={() => incrementQuantity(product.id)}
            decrementQuantity={() => decrementQuantity(product.id)}
          />
        ))}
        </div>
        
        {/*Cart Footer*/}
        <div className="cartFooter">
          <h4>Total:</h4>
          <p>${totalCart}</p>
        </div>
      </div>
    </div>,
    document.getElementById("portal"));
};

export default Cart;
