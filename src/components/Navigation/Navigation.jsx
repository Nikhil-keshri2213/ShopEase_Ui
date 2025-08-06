import React from 'react'
import { Wishlist } from '../Common/Wishlist'
import { AccountIcon } from '../Common/AccountIcon'
import { CartIcon } from '../Common/CartIcon'
import './Navigation.css';
import { Link, NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="flex items-center py-6 px-16 justify-between gap-40">
      <div className="flex items-center gap-6">
        <a className="text-3xl text-black gap-8" href="/">
          Shop<span className="text-white bg-black">E</span>ase
        </a>
      </div>

      <div className="flex flex-wrap items-center gap-12 flex-1">
        <ul className="flex gap-16 text-gray-700">
          <li><NavLink to="/" className={({isActive}) => isActive ? 'active-link':''}>Shop</NavLink></li>
          <li><NavLink to="/mens" className={({isActive}) => isActive ? 'active-link':''}>Men</NavLink></li>
          <li><NavLink to="/womens" className={({isActive}) => isActive ? 'active-link':''}>Women</NavLink></li>
          <li><NavLink to="/kids" className={({isActive}) => isActive ? 'active-link':''}>Kids</NavLink></li>
        </ul>
      </div>

      <div className="flex justify-center">
        {/* Search bar */}
        <div className="border rounded-full flex overflow-hidden">
          <div className="flex items-center justify-center px-4 border-1">
            <svg
              className="h-4 w-4 text-grey-dark"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
                <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
            </svg>
            <input type="text" className="px-4 py-2 outline-none" placeholder="Search"/>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        {/* Action Items - icons */}
          <ul className="flex gap-8 ">
            <li><button><Wishlist /></button></li>
            <li><button onClick={() => navigate("/account-details/profile")}><AccountIcon /></button></li>
            <li><NavLink to='/cart-items'><CartIcon/></NavLink></li>
          </ul>
      </div>

    </nav>
  );
}

export default Navigation;
