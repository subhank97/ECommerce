import React, { useRef } from 'react'
import { useStateContext } from '@/context/StateContext'
import { urlFor } from '@/lib/client'
import getStripe from '@/lib/getStripe'
import toast from 'react-hot-toast'

const Cart = () => {

    const handleCheckout = async () => {
        try {
            const stripe = await getStripe();

            const response = await fetch('/api/stripe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cartItems),
            });

            if (!response.ok) {
                throw new Error('Failed to create Stripe session');
            }

            const data = await response.json();
            toast.loading('Redirecting...');
            stripe.redirectToCheckout({ sessionId: data.id });
        } catch (error) {
            console.error(error);
            toast.error('An error occurred during checkout');
        }
    }


    const cartRef = useRef();
    const { totalPrice, totalQuantities, cartItems, setShowCart, onRemoveFromCart } = useStateContext();

    console.log(cartItems)

    return (
        <div className="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true" ref={cartRef}>
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <div className="pointer-events-auto w-screen max-w-md">
                            <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                    <div className="flex items-start justify-between">
                                        <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Shopping cart ({totalQuantities} items)</h2>
                                        <div className="ml-3 flex h-7 items-center">
                                            <button type="button" className="-m-2 p-2 text-gray-400 hover:text-gray-500" onClick={() => setShowCart(false)}>
                                                <span className="sr-only">Close panel</span>
                                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="mt-8">
                                        <div className="flow-root">
                                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                {cartItems.map((item) => (
                                                    <li key={item._id} className="flex py-6">
                                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                            <img src={urlFor(item?.image[0])} alt={item.name} className="h-full w-full object-contain" />
                                                        </div>
                                                        <div className="ml-4 flex flex-1 flex-col">
                                                            <div>
                                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                                    <h3>{item.name}</h3>
                                                                    <p className="ml-4">${item.price}</p>
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                                <p className="text-gray-500">Qty {item.quantity}</p>
                                                                <div className="flex">
                                                                    <button type="button" onClick={() => onRemoveFromCart(item)} className="font-medium text-indigo-600 hover:text-indigo-500">
                                                                        Remove
                                                                    </button>
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
                                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                        <div className="flex justify-between text-base font-medium text-slate-800">
                                            <p>Subtotal</p>
                                            <p>${totalPrice}</p>
                                        </div>
                                        <p className="mt-0.5 text-sm text-slate-800">Shipping and taxes calculated at checkout.</p>
                                        <div className="mt-6">
                                            <button type="button" className="w-full flex items-center justify-center rounded-md border border-transparent bg-custom-rose px-6 py-3 text-base font-medium text-black shadow-sm hover:bg-custome-rose"
                                                onClick={handleCheckout}>
                                                Checkout
                                            </button>
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