import React, { useState } from 'react';
import { Wishlist } from '../Common/Wishlist';
import { AccountIcon } from '../Common/AccountIcon';
import { CartIcon } from '../Common/CartIcon';
import './Navigation.css';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { countCartItems } from '../../store/features/cart';
import { Menu, X } from 'lucide-react';

function Navigation({ variant = "default" }) {
  const cartLength = useSelector(countCartItems);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex flex-wrap items-center justify-between py-4 px-6 md:px-12 lg:px-16 bg-white shadow-sm relative">
      
      {/* Logo */}
      <div className="flex items-center justify-between w-full md:w-auto">
        <a className="text-3xl text-black font-semibold" href="/">
          Shop<span className="text-white bg-black px-1">E</span>ase
        </a>

        {/* Hamburger icon */}
        <button
          className="md:hidden text-black"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Nav Links */}
      {variant === "default" && (
        <div
          className={`${
            isOpen ? 'flex' : 'hidden'
          } md:flex flex-col md:flex-row items-center w-full md:w-auto gap-6 md:gap-12 mt-4 md:mt-0`}
        >
          <ul className="flex flex-col md:flex-row gap-6 md:gap-12 text-gray-700 text-center">
            <li><NavLink to="/" className={({ isActive }) => isActive ? 'active-link' : ''}>Shop</NavLink></li>
            <li><NavLink to="/mens" className={({ isActive }) => isActive ? 'active-link' : ''}>Men</NavLink></li>
            <li><NavLink to="/womens" className={({ isActive }) => isActive ? 'active-link' : ''}>Women</NavLink></li>
            <li><NavLink to="/kids" className={({ isActive }) => isActive ? 'active-link' : ''}>Kids</NavLink></li>
          </ul>
        </div>
      )}

      {/* Search */}
      {variant === "default" && (
        <div
          className={`${
            isOpen ? 'flex' : 'hidden'
          } md:flex w-full md:w-auto justify-center mt-4 md:mt-0`}
        >
          <div className="border rounded-full flex overflow-hidden hover:border-black w-full md:w-auto">
            <div className="flex items-center justify-center px-4 w-full md:w-auto">
              <svg
                className="h-4 w-4 text-grey-dark"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
              </svg>
              <input
                type="text"
                className="px-4 py-2 outline-none w-full md:w-48"
                placeholder="Search"
              />
            </div>
          </div>
        </div>
      )}

      {/* Icons / Auth Buttons */}
      <div
        className={`${
          isOpen ? 'flex' : 'hidden'
        } md:flex items-center justify-center gap-4 md:gap-8 w-full md:w-auto mt-4 md:mt-0`}
      >
        {variant === "default" && (
          <ul className="flex gap-8 items-center">
            <li><button><Wishlist /></button></li>
            <li><button onClick={() => navigate("/account-details/profile")}><AccountIcon /></button></li>
            <li>
              <Link to="/cart-items" className="flex flex-wrap relative">
                <CartIcon />
                {cartLength > 0 && (
                  <div className="absolute ml-6 inline-flex items-center justify-center h-5 w-5 bg-black rounded-full text-white text-xs border-white border-1">
                    {cartLength}
                  </div>
                )}
              </Link>
            </li>
          </ul>
        )}

        {variant === "auth" && (
          <ul className="flex gap-4 flex-col md:flex-row">
            <li className="text-black border border-black hover:bg-slate-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none">
              <NavLink to="/v1/login" className={({ isActive }) => isActive ? 'active-link' : ''}>Login</NavLink>
            </li>
            <li className="text-black border border-black hover:bg-slate-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none">
              <NavLink to="/v1/register" className={({ isActive }) => isActive ? 'active-link' : ''}>Register</NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
