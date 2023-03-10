import React from 'react'
import Link from 'next/link'
import { urlFor } from '@/lib/client';

const Carousel = ({ product: {image, name, slug, price} }) => {
    return (
        <div>
            <Link className='carousel-container' href={`/product/${slug.current}`}>
                <div className='carousel-card'>
                    <img className='carousel-image' src={urlFor(image && image[0])} alt='shoe-cover' width={190} height={100} />
                    <p className='carousel-title'>{name}</p>
                    <p className='carousel-price'>${price}</p>
                </div>
            </Link>
        </div>
    )
}

export default Carousel