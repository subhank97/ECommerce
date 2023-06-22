import React, { useState } from 'react'
import { client, urlFor } from '@/lib/client'
import { AiFillStar, AiOutlineMinus, AiOutlinePlus, AiOutlineStar } from 'react-icons/ai';
import { useStateContext } from '@/context/StateContext';
import Carousel from '@/components/Carousel';

const ProductDetails = ({ product, products }) => {

  const { image, name, price, details } = product;
  const [index, setIndex] = useState(0)
  const { increaseQuantity, decreaseQuantity, quantity, onAddToCart, setShowCart } = useStateContext();

  const handleBuyNow = () => {
    onAddToCart(product, quantity);
    setShowCart(true);
  }

  return (
    <div>
      <div className="md:flex gap-10 m-10 mt-12 text-blue-800 flex-col md:flex-row">
        <div className='w-3/4 '>
          <div className="pb-5 max-w-xl">
            <img src={urlFor(image && image[index])} className="w-full h-80 max-w-full h-64 object-contain cursor-pointer transition-all duration-300" />
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
          <h1 className="text-4xl">{name}</h1>
          <div className="text-xl text-orange-500 mt-2.5 gap-1 items-center">
            <div className='flex'>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>
              (20)
            </p>
          </div>
          <h4 className="mt-2.5 text-sm">Details: </h4>
          <p>{details}</p>
          <p className="font-bold text-5xl mt-7.5 text-red-700">${price}</p>
          <div className="text-blue-800 flex gap-5 mt-2.5 items-center w-72">
            <h3>Quantity:</h3>
            <p className="border border-orange-500 px-1.5">
              <span className="text-lg px-2.5 py-1.5 cursor-pointer text-orange-300" onClick={decreaseQuantity}><AiOutlineMinus /></span>
              <span className="border-r border-l border-orange-500 text-xl">{quantity}</span>
              <span className="text-lg px-2.5 py-1.5 cursor-pointer text-orange-300" onClick={increaseQuantity}><AiOutlinePlus /></span>
            </p>
          </div>
          <div className="flex gap-7.5">
            <button type="button" className="py-2.5 px-5 border border-red-700 mt-10 text-lg font-medium bg-white text-red-700 cursor-pointer w-48 transform transition-transform duration-500 hover:scale-110" onClick={() => onAddToCart(product, quantity)}>Add to Cart</button>
            <button type="button" className="w-48 py-2.5 px-5 bg-red-700 text-white border-none mt-10 text-lg font-medium cursor-pointer transform transition-transform duration-500 hover:scale-110" onClick={handleBuyNow}>Buy Now</button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Carousel key={item._id} product={item} />
            ))}
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