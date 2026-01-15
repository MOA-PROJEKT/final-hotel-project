// src/components/Modal.jsx
import React from 'react'

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null // если модал не открыт, ничего не рендерим

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose} // клик по затемнению закрывает модал
    >
      <div
        className="bg-white max-w-3xl w-full p-6 rounded-lg shadow-lg relative"
        onClick={(e) => e.stopPropagation()} // клики внутри окна не закрывают модал
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold"
        >
          &times;
        </button>

        {children}
      </div>
    </div>
  )
}
