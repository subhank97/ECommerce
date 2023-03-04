import React from 'react'
import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai'

const Footer = () => {
  return (
    <div className='footer-container'>
      <p>2023 Subi's Sneaker Shop All Rights Reserved</p>
      <p className='footer-icons'>
        <AiFillInstagram />
        <AiOutlineTwitter />
      </p>
    </div>
  )
}

export default Footer