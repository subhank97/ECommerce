import React from 'react'
import Link from 'next/link'
import { urlFor } from '@/lib/client';

const Product = ({ product: {image, title, author, slug, price, details} }) => {
  return (
    <div>
        <Link href={`/product/${slug.current}`}>
            <div className='product-card'>
                <img className='product-image' src={urlFor(image && image[0])} alt='book-cover' width={200} height={250}/>
                <p className='product-title'>{title}</p>
                <p className='product-price'>{price}</p>
            </div>
        </Link>
    </div>
  )
}

export default Product