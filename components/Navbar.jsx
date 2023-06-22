import React from 'react';
import Cart from './Cart';
import { useStateContext } from '@/context/StateContext';

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities, isMenuOpen, setIsMenuOpen } = useStateContext();

  return (
    <div className="flex flex-wrap place-items-center">
      <section className="relative mx-auto">
        {/* <!-- navbar --> */}
        <nav className="relative flex justify-between bg-zinc-900 text-stone-100 w-screen h-16">
          <div className="px-5 xl:px-12 py-6 flex w-full items-center justify-between md:justify-start relative z-10">
            <a className="text-3xl font-bold font-heading">
              {/* <img src="/assets/logo.png" alt='logo' className="w-auto h-20 p-px" /> */}
              <h1 className='text-white'>LOGO</h1>
            </a>
            <div className={`fixed top-0 left-0 w-full h-full bg-white z-20 transform transition-transform duration-200 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
              <button className="absolute top-5 right-5" onClick={() => setIsMenuOpen(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <ul className="flex flex-col justify-center items-center h-full space-y-8 text-2xl">
                <li><a className="hover:text-cyan-200" href="/">Home</a></li>

                <li><a className="hover:text-cyan-200" href="#">Collections</a></li>
                <li><a className="hover:text-cyan-200" href="#">Contact Us</a></li>
              </ul>
            </div>
            <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
              <li><a className="hover:text-cyan-200" href="/">Home</a></li>
              <li><a className="hover:text-cyan-200" href="#">Collections</a></li>
              <li><a className="hover:text-cyan-200" href="#">Contact Us</a></li>
            </ul>
            <div className="flex items-center space-x-5 md:absolute md:right-5">
              <a className="flex items-center hover:text-cyan-200">
                <button onClick={() => setShowCart(true)} type='button'>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </button>
                {showCart && <Cart />}
                {totalQuantities > 0 && (
                  <span className="flex absolute -mt-5 ml-4">
                    <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-400"></span>
                  </span>
                )}
              </a>
            </div>
            <button className={`md:hidden ${isMenuOpen ? 'text-blue-500' : 'text-black'}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          <div className="absolute right-0 top-0 w-[0] md:w-[0] lg:w-[517px] h-full bg-custom-rose z-0"></div>
          <svg className="absolute right-0 h-full text-zinc-900 transform translate-x-[125px] md:translate-x-[250px] lg:translate-x-[-485px] -translate-y-0 z-0" viewBox="0 0 100 100" fill="currentColor" preserveAspectRatio="none slice">
            <path d="M50 0H100L50 100H0L50 0Z"></path>
          </svg>
        </nav>
      </section>
    </div>
  )
}

export default Navbar;
