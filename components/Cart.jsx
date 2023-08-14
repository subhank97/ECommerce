import React, { useRef } from 'react'
import Link from 'next/link'
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'
import { useStateContext } from '@/context/StateContext'
import { urlFor } from '@/lib/client'
import getStripe from '@/lib/getStripe'
import toast from 'react-hot-toast'

const Cart = () => {

    const handleCheckout = async () => {
        const stripe = await getStripe();
        const response = await fetch('/api/stripe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cartItems),
        });
        if (response.statusCode === 500) return;

        const data = await response.json();

        toast.loading('Redirecting...');

        stripe.redirectToCheckout({ sessionId: data.id });
    }

    const cartRef = useRef();
    const { totalPrice, totalQuantities, cartItems, setShowCart, onRemoveFromCart } = useStateContext();


    return (
        <div class="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true" ref={cartRef}>
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div class="fixed inset-0 overflow-hidden">
                <div class="absolute inset-0 overflow-hidden">
                    <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <div class="pointer-events-auto w-screen max-w-md">
                            <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                    <div class="flex items-start justify-between">
                                        <h2 class="text-lg font-medium text-gray-900" id="slide-over-title">Shopping cart ({totalQuantities} items)</h2>
                                        <div class="ml-3 flex h-7 items-center">
                                            <button type="button" class="-m-2 p-2 text-gray-400 hover:text-gray-500" onClick={() => setShowCart(false)}>
                                                <span class="sr-only">Close panel</span>
                                                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="mt-8">
                                        <div class="flow-root">
                                            <ul role="list" class="-my-6 divide-y divide-gray-200">
                                                {cartItems.map((item) => (
                                                    <li class="flex py-6">
                                                        <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                            <img src={urlFor(item?.image[0])} alt={item.name} class="h-full w-full object-contain" />
                                                        </div>
                                                        <div class="ml-4 flex flex-1 flex-col">
                                                            <div>
                                                                <div class="flex justify-between text-base font-medium text-gray-900">
                                                                    <h3>{item.name}</h3>
                                                                    <p class="ml-4">${item.price}</p>
                                                                </div>
                                                            </div>
                                                            <div class="flex flex-1 items-end justify-between text-sm">
                                                                <p class="text-gray-500">Qty {item.qty}</p>
                                                                <div class="flex">
                                                                    <button type="button" onClick={() => onRemoveFromCart(item)} class="font-medium text-indigo-600 hover:text-indigo-500">Remove</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                {cartItems.length >= 1 && (
                                    <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
                                        <div class="flex justify-between text-base font-medium text-slate-800">
                                            <p>Subtotal</p>
                                            <p>${totalPrice}</p>
                                        </div>
                                        <p class="mt-0.5 text-sm text-slate-800">Shipping and taxes calculated at checkout.</p>
                                        <div class="mt-6">
                                            <button type="button" class="w-full flex items-center justify-center rounded-md border border-transparent bg-custom-rose px-6 py-3 text-base font-medium text-black shadow-sm hover:bg-custome-rose" onClick={handleCheckout}>Checkout</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
{/* <div className='cart-wrapper' >
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
                                <span className="number">{item.qty}</span>
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
                <button type='button' className='checkout-button' onClick={handleCheckout}>
                    Pay with Stripe
                </button>
            </div>
        </div>
    )}
</div>
</div> */}
export default Cart