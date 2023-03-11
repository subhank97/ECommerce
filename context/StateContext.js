import React, { useState, useEffect, createContext, useContext } from "react";
import toast from 'react-hot-toast'

const Context = createContext()


export const StateContext = ({ children }) => {
  const getLocalStorage = (name) => {
    if (typeof window !== 'undefined') {
      const storage = localStorage.getItem(name);
      if (storage) return JSON.parse(localStorage.getItem(name));
      if (name === 'cartItems') return [];
      return 0;
    }
  };

  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState(getLocalStorage('cartItems'));
  const [totalPrice, setTotalPrice] = useState(getLocalStorage('totalPrice'));
  const [totalQuantities, setTotalQuantities] = useState(getLocalStorage('totalQuantities'));
  const [quantity, setQuantity] = useState(1);

  let findProduct;
  let index;
  
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
    localStorage.setItem('totalQuantities', JSON.stringify(totalQuantities));
  }, [cartItems, totalPrice, totalQuantities]);

    const increaseQuantity = () => {
        setQuantity((quantity) => quantity + 1)
    }
    const decreaseQuantity = () => {
        setQuantity((quantity) => {
            if (quantity - 1 < 1) return 1
            return quantity - 1
        })
    }

    const onAddToCart = (product, quantity) => {
        const checkProductInCart = cartItems.find(
          (cartProduct) => cartProduct._id === product._id,
        );
        if (checkProductInCart) {
          setTotalPrice(totalPrice + product.price * quantity);
          setTotalQuantities(totalQuantities + quantity);
    
          const updatedCartItems = cartItems.map((cartProduct) => {
            if (cartProduct._id === product._id) {
              return { ...cartProduct, quantity: cartProduct.quantity + quantity };
            }
            return cartProduct;
          });
    
          setCartItems(updatedCartItems);
        } else {
          setTotalPrice(totalPrice + product.price * quantity);
          setTotalQuantities(totalQuantities + quantity);
          product.quantity = quantity;
          setCartItems([...cartItems, { ...product }]);
        }
        toast.success(`${quantity} ${product.name} added`);
      };

    const onRemoveFromCart = (product) => {
        findProduct = cartItems.find((item) => item._id === product._id);
        const tempCart = cartItems.filter((item) => item._id !== product._id);
        setTotalPrice(totalPrice - findProduct.price * findProduct.quantity);
        setTotalQuantities(totalQuantities - findProduct.quantity);
        setCartItems(tempCart);
      };

    const toggleCartItemQuantity = (id, value) => {
        findProduct = cartItems.find((item) => item._id === id)
        index = cartItems.findIndex((product) => product._id === id)
        if (value === 'inc'){
            findProduct.quantity += 1;
            cartItems[index] = findProduct;
            setTotalPrice(totalPrice + findProduct.price);
            setTotalQuantities(totalQuantities + 1);
        } else if (value === 'dec') {
            if (findProduct.quantity > 1) {
                findProduct.quantity -= 1;
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
