import React, {useState, useEffect}from 'react'
import Link from 'next/link'
import { BsFillBagXFill } from 'react-icons/bs'
import { useStateContext } from '@/context/StateContext'

const canceled = () => {

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
            <p className='icon'><BsFillBagXFill /></p>
            <h2>Sorry to see you go </h2>
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

export default canceled