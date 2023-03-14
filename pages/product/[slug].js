import React, { useState } from 'react'
import { client, urlFor } from '@/lib/client'
import { AiFillStar, AiOutlineMinus, AiOutlinePlus, AiOutlineStar } from 'react-icons/ai';
import { useStateContext } from '@/context/StateContext';
import Carousel from '@/components/Carousel';

const ProductDetails = ({ product, products }) => {

  const { image, name, price, details } = product;
  const [index, setIndex] = useState(0)
  const { increaseQuantity, decreaseQuantity, qty, onAddToCart, setShowCart } = useStateContext();

  const handleBuyNow = () => {
    onAddToCart(product, qty);
    setShowCart(true);
  }

  return (
    <div>
      <div className="product-details-container">
        <div>
          <div className="image-container">
            <img src={urlFor(image && image[index])} className="product-detail-image" />
          </div>
          <div className="more-images-container">
            {image?.map((item, i) => (
              <img key={i} src={urlFor(item)} className={i === index ? 'more-image selected-image' : 'more-image'}
                   onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="product-description">
          <h1>{name}</h1>
          <div className="product-reviews">
            <div>
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
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="product-price">${price}</p>
          <div className="product-quantity">
            <h3>Quantity:</h3>
            <p className="quantity-detail">
              <span className="minus" onClick={decreaseQuantity}><AiOutlineMinus /></span>
              <span className="number">{qty}</span>
              <span className="plus" onClick={increaseQuantity}><AiOutlinePlus /></span>
            </p>
          </div>
          <div className="product-buttons">
          <button type="button" className="add-to-cart" onClick={() => onAddToCart(product, qty)}>Add to Cart</button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>Buy Now</button>
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