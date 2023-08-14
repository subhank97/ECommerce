import React from 'react'
import { Banner, FooterBanner, Product } from '../components'
import { client } from '../lib/client'

const Home = ({ products, bannerData }) => {
  // console.log(products)
  return (
    <div>
      <Banner banner={bannerData.length && bannerData[0]} />

      <div className="flex flex-col items-center justify-center">
        <h1 className='mt-10 font-extrabold text-4xl'>MOST POPULAR</h1>
        <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {products?.map((product) => <Product key={product._id} product={product} />)}
        </div>
      </div>

      <FooterBanner footer={bannerData[0]} />
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
