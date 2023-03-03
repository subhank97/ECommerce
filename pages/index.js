import React from 'react'
import { Banner, Product } from '../components'
import { client } from '../lib/client'

const Home = ({ products, bannerData} ) => {
  console.log(products)
  return (
    <div>
      <Banner banner={bannerData[0]} />

      <div className='products-heading'>
        <h2>Best Selling Books</h2>
        <p>Books of different genres</p>
      </div>

      {/* Loop through products */}
      <div className='products-container'>
        {products?.map((product) => <Product 
        key={product.id}
        product={product} />)}
      </div>
    </div>
  )
};

  export const getServerSideProps = async () => {
  const query = '*[_type == "product"]'
  const products = await client.fetch(query)

  const bannerQuery = '*[_type == "banner"]'
  const bannerData = await client.fetch(bannerQuery)

  return {
    props: { products, bannerData }
  }
}

export default Home
