import React from 'react'
import Link from 'next/link'
import { urlFor } from '@/lib/client';

const Product = ({ product: { image, name, slug, price } }) => {
  return (
    <a href={`/product/${slug.current}`} className="group block overflow-hidden w-96 mx-10 my-5">
      <div className="relative w-10/12 h-60">
        <img
          src={urlFor(image && image[0])}
          alt="shoe"
          className="absolute inset-0 h-full w-full object-contain"
        />
      </div>

      <div className="relative bg-white">
        <h3 className="text-sm text-gray-700 group-hover:underline group-hover:underline-offset-4">
          {name}
        </h3>
        <p className="mt-1.5 tracking-wide text-gray-900">${price}</p>
      </div>
    </a>
  )
}

export default Product