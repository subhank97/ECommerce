import React from 'react'
import Link from 'next/link'
import { AiOutlineShopping } from 'react-icons/ai'
import Cart from './Cart'
import { useStateContext } from '@/context/StateContext'
import  LOGO  from 'assets/logo1.png'

const Navbar = () => {
  console.log(LOGO)

  const {showCart, setShowCart, totalQuantities} = useStateContext();

  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href='/'>
          <img src={'/_next/static/media/logo1.b853a782.png'} alt='logo' />
        </Link>
      </p>
      <button onClick={() => setShowCart(true)} type='button' className='cart-icon'>
        <AiOutlineShopping />
        <span className='cart-quantity'>{totalQuantities}</span>
      </button>
      {showCart && <Cart />}
    </div>
  )
}

export default Navbar