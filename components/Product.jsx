import React from 'react'
import Link from 'next/link'
import { urlFor } from '@/lib/client';

const Product = ({ product: { image, name, slug, price } }) => {
  return (
    <div className='products-card'>
        <Link href={`/product/${slug.current}`}>
            <div className='product-card'>
                <div className='product-image-card'>
                <img className='card-image' src={urlFor(image && image[0])} alt='shoe-cover' width={190} height={100}/>
                </div>
                <p className='card-title'>{name}</p>
                <p className='card-price'>${price}</p>
            </div>
        </Link>
    </div>
      // <section class="cardss">
      //   <div class="images">
      //     <img src={urlFor(image && image[0])} alt="OFF-white Red Edition" draggable="false" />
      //   </div>
      //   <div class="products-info">
      //     <h2>{name}</h2>
      //     <div class="prices">${price}</div>
      //   </div>
      //   <div class="btns">
      //     <button class="buy-btns">Buy Now</button>
      //   </div>
      // </section>
  )
}

export default Product