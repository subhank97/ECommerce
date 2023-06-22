import React from 'react'

const Banner = () => {
    return (
<div class="bg-white relative flex flex-col-reverse py-16 lg:pt-0 lg:flex-col lg:pb-0">
  <div class="inset-y-0 top-0 right-0 z-0 w-full max-w-xl px-4 mx-auto md:px-0 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-7/12 lg:max-w-full lg:absolute xl:px-0">
    <svg class="absolute left-0 hidden h-full text-white transform -translate-x-1/2 lg:block" viewBox="0 0 100 100" fill="currentColor" preserveAspectRatio="none slice">
      <path d="M50 0H100L50 100H0L50 0Z"></path>
    </svg>
    <div class="bg-slate-100 object-cover w-full h-56 rounded shadow-lg lg:rounded-none lg:shadow-none md:h-96 lg:h-full" style={{backgroundImage: "url(/assets/bannerimage2.gif)", backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
  </div>
  <div class="relative flex flex-col items-start w-full max-w-xl px-4 mx-auto md:px-0 lg:px-8 lg:max-w-screen-xl">
    <div class="mb-16 lg:my-40 lg:max-w-lg lg:pr-5">
      <p class="inline-block px-1 py-px mb-4 text-xs font-semibold tracking-wider uppercase rounded-full text-cyan-100">
        Just Arrived
      </p>
      <h2 class="mb-5 font-sans text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl sm:leading-none">
        Sneakers to <br class="hidden md:block" />
        Elevate Your Style
        <span> and Performance</span>
      </h2>
      <p class="pr-5 mb-5 text-base text-slate-900 md:text-lg">
        Step into a world of exclusive, high-demand sneakers that merge style and functionality. Our curated selection features rare finds and limited edition releases from top brands. Get ready to turn heads and step up your game with our collection.
      </p>
    </div>
  </div>
</div>

    )
}

export default Banner