import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  let foundProduct;
  const productsPerView = 6;

  const shiftImages = () => {
    setStartIndex((prevIndex) => {
      let nextIndex = prevIndex + productsPerView;
      if (nextIndex >= products.length) {
        nextIndex = 0;
      }
      return nextIndex;
    });
  };

  const onAddToCart = (product, quantity) => {
    const checkProductInCart = cartItems.find((item) => item._id === product._id);
    
    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    
    if(checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if(cartProduct._id === product._id) return {
          ...cartProduct,
          quantity: cartProduct.quantity + quantity
        }
      })

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      
      setCartItems([...cartItems, { ...product }]);
    }

    toast.success(`${quantity} ${product.name} added to the cart.`);
  } 

  const onRemoveFromCart = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
    setCartItems(newCartItems);
  }

  const increaseQuantity = () => {
    setQty((prevQty) => prevQty + 1);
  }

  const decreaseQuantity = () => {
    setQty((prevQty) => {
      if(prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  }

  return (
    <Context.Provider
      value={{ showCart, setShowCart, cartItems, totalPrice, totalQuantities, qty, increaseQuantity, 
               decreaseQuantity, onAddToCart, onRemoveFromCart, setCartItems, 
               setTotalPrice, setTotalQuantities, isMenuOpen, setIsMenuOpen, shiftImages
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);