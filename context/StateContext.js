import React, { useState, useEffect, createContext, useContext } from "react";
import toast from 'react-hot-toast'

const Context = createContext()

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
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

    const onAddToCart = (product, qty) => {
        const checkProductinCart = cartItems.find((item) => item._id === product._id)
        setTotalPrice((previousTotalPrice) => previousTotalPrice + product.price * qty)
        setTotalQuantity((previousTotalQuantity) => previousTotalQuantity + qty)
            if(checkProductinCart) {
            const updatedCartItems = cartItems.map((cartProduct) => {
                if(cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.qty + qty
                }
            })
            setCartItems(updatedCartItems);
        } else {
            product.qty = qty;
            setCartItems([...cartItems, {...product}]);
        }
        console.log('added to cart')
    }

    return (
        <Context.Provider value={{showCart, cartItems, totalPrice, toalQuantities, quantity, increaseQuantity,
                                  decreaseQuantity, onAddToCart}}>
            {children}
        </Context.Provider>
    )
}
    export const useStateContext = () => useContext(Context);
