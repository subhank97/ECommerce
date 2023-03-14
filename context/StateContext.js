import React, { useState, useEffect, createContext, useContext } from "react";
import toast from 'react-hot-toast'

const Context = createContext()

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [quantity, setQuantity] = useState(1);

  let findProduct;
  let index;

    const increaseQuantity = () => {
        setQuantity((qty) => qty + 1)
    }
    const decreaseQuantity = () => {
        setQuantity((qty) => {
            if (qty - 1 < 1) return 1
            return qty - 1
        })
    }

    const onAddToCart = (product, qty) => {
        const checkProductInCart = cartItems.find(
          (cartProduct) => cartProduct._id === product._id,
        );
        if (checkProductInCart) {
          setTotalPrice(totalPrice + product.price * qty);
          setTotalQuantities(totalQuantities + qty);
    
          const updatedCartItems = cartItems.map((cartProduct) => {
            if (cartProduct._id === product._id) {
              return { ...cartProduct, qty: cartProduct.qty + qty };
            }
            return cartProduct;
          });
    
          setCartItems(updatedCartItems);
        } else {
          setTotalPrice(totalPrice + product.price * qty);
          setTotalQuantities(totalQuantities + qty);
          product.qty = qty;
          setCartItems([...cartItems, { ...product }]);
        }
        toast.success(`${quantity} ${product.name} added`);
      };

    const onRemoveFromCart = (product) => {
        findProduct = cartItems.find((item) => item._id === product._id);
        const tempCart = cartItems.filter((item) => item._id !== product._id);
        setTotalPrice(totalPrice - findProduct.price * findProduct.qty);
        setTotalQuantities(totalQuantities - findProduct.qty);
        setCartItems(tempCart);
      };

    const toggleCartItemQuantity = (id, value) => {
        findProduct = cartItems.find((item) => item._id === id)
        index = cartItems.findIndex((product) => product._id === id)
        if (value === 'inc'){
            findProduct.qty += 1;
            cartItems[index] = findProduct;
            setTotalPrice(totalPrice + findProduct.price);
            setTotalQuantities(totalQuantities + 1);
        } else if (value === 'dec') {
            if (findProduct.qty > 1) {
                findProduct.qty -= 1;
                cartItems[index] = findProduct;
                setTotalPrice(totalPrice - findProduct.price);
                setTotalQuantities(totalQuantities - 1);
            }
        }
    }

    return (
        <Context.Provider value={{
            showCart, setShowCart, cartItems, totalPrice, totalQuantities, quantity, increaseQuantity,
            decreaseQuantity, onAddToCart, onRemoveFromCart, toggleCartItemQuantity, setCartItems, 
            setTotalPrice, setTotalQuantities
        }}>
            {children}
        </Context.Provider>
    )
}
export const useStateContext = () => useContext(Context);
