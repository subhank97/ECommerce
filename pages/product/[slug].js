import React from 'react'
import { client, urlFor } from '@/lib/client'
import { AiFillStar, AiOutlineMinus, AiOutlinePlus, AiOutlineStar } from 'react-icons/ai';
import { Product } from '@/components';

const ProductDetails = ({ product, products }) => {

    const {image, name, price, details} = product;

  return (
    <div>
        <div className='product-details-container'>
                <div className='image-container'>
                    <img className="product-detail-image" src={urlFor(image && image[0])} alt='shoe-style'/>
                </div>
                <div className='product-description'>
                    <h1>{name}</h1>
                    <div className='product-reviews'>
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                    </div>
                    <h4>Description:</h4>
                    <p>{details}</p>
                    <p className='product-price'>${price}</p>
                    <div className='product-quantity'>
                        <h3>Quantity:</h3>
                        <span className='minus' onClick=''><AiOutlineMinus /></span>
                        <span className='number' onClick=''>0</span>
                        <span className='plus' onClick=''><AiOutlinePlus /></span>
                    </div>
                    <div className='buttons'>
                        <button type='button' className='add-to-cart'>Add to Cart</button>
                        <button type='button' className='buy-now'>Buy Now</button>
                    </div>
                </div>
            </div>

            <div className='maylike-products-wrapper'>
              <h2>You may also Like</h2>
              <div className='marquee'>
                <div className='maylike-products-container track'>
                  {products.map((item) => (
                    <Product key={item._id}
                             product={item}/>
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
  
  export const getStaticProps = async ({ params: { slug }}) => {
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