import React from 'react';
import { PlusIcon, LogoutIcon, HomeIcon } from '@heroicons/react/solid';

export default function Navbar({ handleLogout }) {
  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 bg-cyan-100 md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <a
            className="text-black text-sm uppercase hidden lg:inline-block font-semibold"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            <HomeIcon className="h-5 w-5 text-black" />
          </a>
          <PlusIcon className="h-5 w-5 text-black" />
          <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
            <li>
              <LogoutIcon
                onClick={handleLogout}
                className="h-5 w-5 text-black"
              />
            </li>
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}
