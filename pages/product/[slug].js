import React from 'react'
import { client, urlFor } from '@/lib/client'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const ProductDetails = ({ product, products }) => {

    const {image, name, price, details} = product;

  return (
    <div>
        <div className='product-details-container'>
            <div>
                <div className='image-container'>
                    <img src={urlFor(image[0])} alt='shoe-style' width={400} height={200}/>
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
                    <div className='button'>
                        <button type='button' className='add-to-cart'>Add to Cart</button>
                        <button type='button' className='buy-now'>Buy Now</button>
                    </div>
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