import React from 'react';

export default function({onClick, children, isActive}) {
	let className = 'btn border-2 border-gray-600 px-4 py-2 rounded transition-transform duration-300 ease-in-out transform-gpu ';
  
	if (isActive) {
	  className += ' bg-gray-600 text-white shadow-md hover:scale-105';
	} else {
	  className += ' bg-gray-100 hover:bg-gray-300 hover:shadow-md';
	}
  
	return (
	  <button className={className} onClick={onClick}>{children}</button>
	)
}
