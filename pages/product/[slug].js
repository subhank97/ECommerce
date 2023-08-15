import React, { useState } from 'react'
import { client, urlFor } from '@/lib/client'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useStateContext } from '@/context/StateContext';
import Carousel from '@/components/Carousel';

const ProductDetails = ({ product, products }) => {

  const { image, name, price, details } = product;
  const [index, setIndex] = useState(0)
  const { increaseQuantity, decreaseQuantity, qty, onAddToCart } = useStateContext();

  return (
    <div className='lg:pt-10'>
      <div className="md:flex gap-10 m-10 mt-12 text-slate-800 flex-col md:flex-row">
        <div className='w-3/4 '>
          <div className="pb-5 max-w-xl">
            <img src={urlFor(image && image[index])} className="w-full max-w-full h-80 object-contain cursor-pointer transition-all duration-300" />
          </div>
          <div className="flex pr-14 mt-5 overflow-x-scroll">
            {image?.map((item, i) => (
              <img key={i} src={urlFor(item)} className={i === index ? 'more-image selected-image w-2/12 h-2/12 object-contain ml-6 flex-shrink-0' : 'more-image w-2/12 h-2/12 ml-6 object-contain flex-shrink-0'}
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="w-full mt-5 md:mt-0 md:ml-12">
          <h1 className="pb-3 font-bold text-5xl">{name}</h1>
          <div className="text-xl text-orange-500 mt-2.5 gap-1 items-center">
            <div className='flex pb-5'>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
          </div>
          <p className="italic font-light mt-2.5 text-sm">{details}</p>
          <p className="pt-10 pb-10 font-bold text-3xl mt-7.5 text-slate-700">${price}</p>

          <div className="flex gap-10">
            <div className="custom-number-input h-10 w-32">
              <div className="flex flex-row h-full w-full rounded-lg relative bg-transparent mt-1">
                <button data-action="decrement" className="border border-black  text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
                  <span className="m-auto text-2xl font-thin" onClick={decreaseQuantity}> - </span>
                </button>
                <input readOnly className="border border-black focus:outline-none text-center w-full  font-semibold text-md md:text-basecursor-default flex items-center text-gray-700  outline-none" value={qty} />
                <button data-action="increment" className="border border-black  text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
                  <span className="m-auto text-2xl font-thin" onClick={increaseQuantity}> + </span>
                </button>
              </div>
            </div>

            <button type="button" className="rounded-lg font-medium py-2.5 px-5 bg-custom-rose mt-1 text-lg text-black cursor-pointer w-48 transform transition-transform duration-500 hover:scale-110"
              onClick={() => onAddToCart(product, qty)}>Add to Cart
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center pt-20">
        <h2 className="text-2xl font-semibold mb-2">You may also like</h2>

        <div className="relative overflow-hidden">

          <div className="track flex space-x-4 w-screen">
            {products.map((item) => (
              <Carousel key={item._id} product={item} />
            ))}

            {/* <div className='my-10 font-bold text-2xl'>
              <button className="absolute left-0 top-1/2"> ← </button>
              <button className="absolute right-0 top-1/2"> → </button>
            </div> */}

          </div>

        </div>
      </div>

    </div>
  )
}
export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
        slug {
        current
      }
    }
      `;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current
    }
  }));

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]'

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  console.log(product);

  return {
    props: { products, product }
  }
}

export default ProductDetails