import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-1 right-5 text-gray-500 hover:text-red-500 text-3xl">
          &times;
        </button>

        {/* Modal Title */}
        {/* <h2 className="text-xl font-bold mb-4">{title}</h2> */}

        {/* Modal Content */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
