import React from 'react';

export default function Button({ type = 'submit', className = '', processing, children, color = 'red' }) {
    const colors = {
        blue: 'bg-blue-500 hover:bg-blue-600 text-white',
        red: 'bg-red-500 hover:bg-red-600 text-white',
        green: 'bg-green-500 hover:bg-green-600 text-white',
        yellow: 'bg-yellow-500 hover:bg-yellow-600 text-white',
        // Add more color options as needed
    };

    return (
        <button
            type={type}
            className={
                `button ${
                    processing && 'opacity-25'
                } ${colors[color]} ` + className
            }
            disabled={processing}
        >
            {children}
        </button>
    );
}
