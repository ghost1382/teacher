import React from 'react';
import { Link } from '@inertiajs/inertia-react';

export default function NavLink({ href, active, children }) {
  return (
    <Link
      href={href}
      className={
        active
          ? 'inline-flex items-center px-2 py-1 border-b-2 border-indigo-400 text-sm font-medium leading-5 text-white focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out'
          : 'inline-flex items-center px-2 py-1 border-b-2 border-transparent text-sm font-medium leading-5 text-white hover:text-purple-300 hover:border-gray-300 focus:outline-none focus:text-yellow-100 focus:border-gray-300 transition duration-150 ease-in-out'
      }
    >
      {children}
    </Link>
  );
}
