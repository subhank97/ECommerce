import React from 'react'
import Link from 'next/link'
import { urlFor } from '@/lib/client'

const Banner = ({ banner }) => {
  return (
    <div className='banner-container'>
        <div>
            <p className='banner-product'>{banner.smallText}</p>
            <h3>{banner.midText}</h3>
            <img src={urlFor(banner.image)} alt='book' className='banner-image'/>

            <div>
                <Link href='/'>
                    <button type='button'>{banner.button}</button>
                </Link>
                <div className='description'>
                    <h5>Description</h5>
                    <p>{banner.description}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Banner