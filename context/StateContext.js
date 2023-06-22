import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  let foundProduct;
  let index;
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

  const onAddToCart = (product, qty) => {
    const checkProductInCart = cartItems.find((item) => item._id === product._id);
    
    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * qty);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + qty);
    
    if(checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if(cartProduct._id === product._id) return {
          ...cartProduct,
          qty: cartProduct.qty + qty
        }
      })

      setCartItems(updatedCartItems);
    } else {
      product.qty = qty;
      
      setCartItems([...cartItems, { ...product }]);
    }

    toast.success(`${qty} ${product.name} added to the cart.`);
  } 

  const onRemoveFromCart = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice -foundProduct.price * foundProduct.qty);
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.qty);
    setCartItems(newCartItems);
  }

  const toggleCartItemQuanitity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id)
    index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id)

    if(value === 'inc') {
      setCartItems([...newCartItems, { ...foundProduct, qty: foundProduct.qty + 1 } ]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
      setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
    } else if(value === 'dec') {
      if (foundProduct.qty > 1) {
        setCartItems([...newCartItems, { ...foundProduct, qty: foundProduct.qty - 1 } ]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
      }
    }
  }

  const increaseQuantity = () => {
    setQuantity((prevQty) => prevQty + 1);
  }

  const decreaseQuantity = () => {
    setQuantity((prevQty) => {
      if(prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  }

  return (
    <Context.Provider
      value={{ showCart, setShowCart, cartItems, totalPrice, totalQuantities, quantity, increaseQuantity, 
               decreaseQuantity, onAddToCart, toggleCartItemQuanitity, onRemoveFromCart, setCartItems, 
               setTotalPrice, setTotalQuantities, isMenuOpen, setIsMenuOpen, shiftImages
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);