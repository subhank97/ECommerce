import React from 'react'
import Link from 'next/link'
import { AiOutlineShopping } from 'react-icons/ai'

const Navbar = () => {
  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href='/'>Subi's Sneaker Shop</Link>
      </p>
      <button onClick='' type='button' className='cart-icon'>
        <AiOutlineShopping />
        <span className='cart-quantity'>1</span>
      </button>
    </div>
  )
}

export default Navbar