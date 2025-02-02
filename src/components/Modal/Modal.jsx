// src/components/Modal/Modal.jsx
import React from 'react';
import './Modal.css';

const Modal = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          {children}
          <button className="modal-close" onClick={onClose}>
            Restart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;