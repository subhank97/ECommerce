import React from 'react'
import { Banner, FooterBanner, Product } from '../components'
import { client } from '../lib/client'

const Home = ({ products, bannerData} ) => {
  // console.log(products)
  return (
    <div>
      <Banner banner={bannerData[0]} />

      <div className='products-heading'>
        <h2>Best Selling</h2>
        {/* <p>Shoes of all brands</p> */}
      </div>

      {/* Loop through products */}
      <div className='products-container'>
        {products?.map((product) => <Product 
        key={product.id}
        product={product} />)}
      </div>

      <FooterBanner footer={bannerData[0]}/>
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
