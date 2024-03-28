import React, { useEffect, useState } from 'react';

function Toast({ children, type, open, setOpen }) {
  useEffect(() => {
    let timer;
    if (open) {
      timer = setTimeout(() => {
        setOpen(false); // Triggers fade out
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [open, setOpen]);

  const typeColor = (type) => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-400';
      case 'error':
        return 'bg-red-500';
      case 'success':
        return 'bg-green-500';
      default:
        return 'bg-blue-500';
    }
  };

  // Always render the container but control visibility and position with opacity and translate classes
  return (
    <div
      className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow-lg text-white ${typeColor(
        type
      )} transition-all duration-500 ease-in-out ${open ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}
      style={{
        transition: 'opacity 0.5s, transform 0.5s',
      }}
    >
      {children}
      <button onClick={() => setOpen(false)} className='text-lg leading-none px-2 ml-4' aria-label='Close'>
        &times;
      </button>
    </div>
  );
}

export default Toast;
