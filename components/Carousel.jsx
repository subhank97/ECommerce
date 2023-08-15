import React from 'react'
import Link from 'next/link'
import { urlFor } from '@/lib/client';

const Carousel = ({ product: { image, name, slug, price } }) => {
    return (
        <div className="px-8">
            <Link href={`/product/${slug.current}`}>
                <div className="flex flex-col">
                    <div className="w-48 h-40 relative">
                        <img className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 h-full w-full object-contain" src={urlFor(image && image[0])} alt="shoe-cover" />
                    </div>

                    <p className="text-md font-semibold h-20 pt-2">{name}</p>
                    <p className="text-sm font-medium pt-3">${price}</p>
                </div>
            </Link>
        </div>

    )
}

export default Carousel