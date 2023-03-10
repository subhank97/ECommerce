import React, {useState, useEffect}from 'react'
import Link from 'next/link'
import { BsBagCheckFill } from 'react-icons/bs'
import { useStateContext } from '@/context/StateContext'

const Success = () => {

    const {setCartItems, setTotalPrice, setTotalQuantities} = useStateContext();

    useEffect(() => {
        localStorage.clear();
        setCartItems([]);
        setTotalPrice(0);
        setTotalQuantities(0);
    }, [])

  return (
    <div className='success-wrapper'>
        <div className='success'>
            <p className='icon'><BsBagCheckFill /></p>
            <h2>Thanks for your order!</h2>
            <p className='email-msg'>Check your email for email confirmation</p>
            <p className='description'>
                If you have any questions, please email
                <a className='email' href='customerservice@subissneakers.com'>customerservice@subissneakers.com</a>
            </p>
            <Link href='/'>
                <button type='button' width={250} className='btn'>Continue Shopping</button>
            </Link>
        </div>
    </div>
  )
}

export default Success