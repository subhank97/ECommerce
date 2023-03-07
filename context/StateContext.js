import React, { useState, useEffect, createContext, useContext } from "react";
import toast from 'react-hot-toast'

const Context = useContext()

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState();
    const [totalPrice, setTotalPrice] = useState();
    const [toalQuantities, setTotalQuantity] = useState();
    const [quantity, setQuantity] = useState(1);

    return (
        <Context.Provider value={{showCart, cartItems, totalPrice, toalQuantities, quantity}}>
            {children}
        </Context.Provider>
    )
}
