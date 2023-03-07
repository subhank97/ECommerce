import React, { useRef } from 'react'
import Link from 'next/link'
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'
import { Toast } from 'react-hot-toast'
import { useStateContext } from '@/context/StateContext'
import { urlFor } from '@/lib/client'

const Cart = () => {

    const cartRef = useRef();
    const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuantity, onRemoveFromCart } = useStateContext();

    return (
        <div className='cart-wrapper' ref={cartRef}>
            <div className='cart-container'>
                <button type='button' className='cart-heading' onClick={() => setShowCart(false)}>
                    <AiOutlineLeft />
                    <span className='heading'>Your Cart</span>
                    <span className='number-of-items'>({totalQuantities} items)</span>
                </button>

                {cartItems.length < 1 && (
                    <div className='empty-cart'>
                        <AiOutlineShopping size={150} />
                        <h3>Your Shopping bag is empty</h3>
                        <Link href='/'>
                            <button type='button' onClick={() => setShowCart(false)} className='continue-shopping-button'>Continue Shopping</button>
                        </Link>

                    </div>
                )}
                <div className='cart-products-container'>
                    {cartItems.length >= 1 && cartItems.map((item) => (
                        <div className='cart-product' key={item._id}>
                            <img src={urlFor(item?.image[0])} alt='cart-product-image' className='cart-product-image' />
                            <div className='cart-product-description'>
                                <div className='flex top'>
                                    <h5>{item.name}</h5>
                                    <h4>${item.price}</h4>
                                </div>
                                <div className='flex bottom'>
                                    <div>
                                        <p className="quantity-detail">
                                            <span className="minus" onClick={() => toggleCartItemQuantity(item._id, 'dec')}><AiOutlineMinus /></span>
                                            <span className="number">{item.quantity}</span>
                                            <span className="plus" onClick={() => toggleCartItemQuantity(item._id, 'inc')}><AiOutlinePlus /></span>
                                        </p>
                                    </div>
                                    <button type='button' className='remove-cart-item' onClick={() => onRemoveFromCart(item)}>
                                        <TiDeleteOutline />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {cartItems.length >= 1 && (
                    <div className='cart-bottom'>
                        <div className='cart-total'>
                            <h3>Subtotal:</h3>
                            <h3>${totalPrice}</h3>
                        </div>
                        <div className='checkout-button-container'>
                            <button type='button' className='checkout-button' onClick=''>
                                Pay with Stripe
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Cart