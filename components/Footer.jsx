import { urlFor } from '@/lib/client'
import React from 'react'

const Footer = ({ footer }) => {
  return (
    <div className='footer-container'>
        <div className='f-description'>
            <div className='left'>
                <p>{footer.discount}</p>
                <h3>{footer.midText}</h3>
                <h3>{footer.largeText}</h3>
                <p>{footer.saleTime}</p>
            </div>
            <img className='footer-image' src={urlFor(footer.image)} alt='bookshelf' />
        </div>
    </div>
  )
}

export default Footer