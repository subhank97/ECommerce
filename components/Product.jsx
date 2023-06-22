import React from 'react'
import Link from 'next/link'
import { urlFor } from '@/lib/client';

const Product = ({ product: { image, name, slug, price } }) => {
  return (
    <a href={`/product/${slug.current}`} class="group block overflow-hidden w-[350px]">
      <div class="relative w-[300px] h-[300px]">
        <img
          src={urlFor(image && image[0])}
          alt="shoe"
          class="absolute inset-0 h-full w-full object-contain"
        />
      </div>

      <div class="relative bg-white pt-3">
        <h3 class="text-sm text-gray-700 group-hover:underline group-hover:underline-offset-4">
          {name}
        </h3>
        <p class="mt-1.5 tracking-wide text-gray-900">${price}</p>
      </div>
    </a>
  )
}

export default Product