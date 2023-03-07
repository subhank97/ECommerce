import React, { useState, useEffect, createContext, useContext } from "react";
import toast from 'react-hot-toast'

const Context = createContext()

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState();
    const [totalPrice, setTotalPrice] = useState();
    const [toalQuantities, setTotalQuantity] = useState();
    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => {
        setQuantity((qty) => qty + 1)  
    }
    const decreaseQuantity = () => {
        setQuantity((qty) => {
        if(qty - 1 < 1) return 1
        return qty - 1 
        })
    }

    return (
        <Context.Provider value={{showCart, cartItems, totalPrice, toalQuantities, quantity, increaseQuantity,
                                  decreaseQuantity}}>
            {children}
        </Context.Provider>
    )
}
    export const useStateContext = () => useContext(Context);
