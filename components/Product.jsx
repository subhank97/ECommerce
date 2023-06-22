import React from 'react'
import Link from 'next/link'
import { urlFor } from '@/lib/client';

const Product = ({ product: { image, name, slug, price } }) => {
  return (
    <a href={`/product/${slug.current}`} class="group block h-[30%] w-[20%] overflow-hidden">
      <div class="relative h-[50px] w-auto sm:h-[100px]">
        <img
          src={urlFor(image && image[0])}
          alt=""
          class="absolute inset-0 h-1/2 w-1/2 object-contain"
        />


      </div>

      <div class="relative bg-white pt-3">
        <h3
          class="text-sm text-gray-700 group-hover:underline group-hover:underline-offset-4"
        >
          {name}
        </h3>

        <p class="mt-1.5  text-gray-900">${price}</p>
      </div>
    </a>
    // <div className='products-card'>
    //     <Link href={`/product/${slug.current}`}>
    //         <div className='product-card'>
    //             <div className='product-image-card'>
    //             <img className='card-image' src={urlFor(image && image[0])} alt='shoe-cover' width={190} height={100}/>
    //             </div>
    //             <p className='card-title'>{name}</p>
    //             <p className='card-price'>${price}</p>
    //         </div>
    //     </Link>
    // </div>
  )
}

export default Product