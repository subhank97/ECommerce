import React from 'react'
import Link from 'next/link'
import { urlFor } from '@/lib/client'

const Banner = ({ banner }) => {
  return (
    <div className='banner-container'>
        <div>
            <p className='banner-product'>{banner.smallText}</p>
            {/* <h3>{banner.midText}</h3> */}
            <h1>{banner.largeText}</h1>
            <img src={urlFor(banner.image)} alt='book' className='banner-image'/>

            <div>
                <Link href='/product'>
                    <button type='button'>{banner.buttonText}</button>
                </Link>
                <div className='description'>
                    <h5>{banner.description}</h5>
                    <p></p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Banner