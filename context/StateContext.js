import React, { useState, useEffect, createContext, useContext } from "react";
import toast from 'react-hot-toast'

const Context = createContext()

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantity] = useState(0);
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
        const checkProductinCart = cartItems.find((item) => item._id === product._id)
        setTotalPrice((previousTotalPrice) => previousTotalPrice + product.price * qty)
        setTotalQuantity((previousTotalQuantity) => previousTotalQuantity + qty)
        if (checkProductinCart) {
            const updatedCartItems = cartItems.map((cartProduct) => {
                if (cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.qty + qty
                }
            })
            setCartItems(updatedCartItems);
        } else {
            product.qty = qty;
            setCartItems([...cartItems, { ...product }]);
        }
        console.log('added to cart')
    }

    const toggleCartItemQuantity = (id, value) => {
        findProduct = cartItems.find((item) => item._id === id)
        index = cartItems.findIndex((product) => product._id === id)
        if (value === 'inc'){
            findProduct.quantity += 1;
            cartItems[index] = findProduct;
            setTotalPrice(totalPrice + findProduct.price);
            setTotalQuantity(totalQuantities + 1);
        } else if (value === 'dec') {
            if (findProduct.quantity > 1) {
                findProduct.quantity -= 1;
                cartItems[index] = findProduct;
                setTotalPrice(totalPrice - findProduct.price);
                setTotalQuantity(totalQuantities - 1);
            }
        }
    }

    return (
        <Context.Provider value={{
            showCart, setShowCart, cartItems, totalPrice, totalQuantities, quantity, increaseQuantity,
            decreaseQuantity, onAddToCart, toggleCartItemQuantity 
        }}>
            {children}
        </Context.Provider>
    )
}
export const useStateContext = () => useContext(Context);
