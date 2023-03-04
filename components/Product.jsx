import React from 'react'
import Link from 'next/link'
import { urlFor } from '@/lib/client';

const Product = ({ product: {image, name, slug, price, details} }) => {
  return (
    <div>
        <Link href={`/product/${slug.current}`}>
            <div className='product-card'>
                <img className='product-image' src={urlFor(image && image[0])} alt='shoe-cover' width={190} height={100}/>
                <p className='product-title'>{name}</p>
                <p className='product-price'>${price}</p>
            </div>
        </Link>
    </div>
  )
}

export default Product