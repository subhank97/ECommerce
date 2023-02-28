import React from 'react'

const index = () => {
  return (
    <div>
      <div className='products-heading'>
        <h2>Best Selling Books</h2>
        <p>Books of different genres</p>
      </div>

      <div className='products-container'>
        {['Insert Product','Insert Product'].map((product) => product)}
      </div>
    </div>
  )
}

export default index
