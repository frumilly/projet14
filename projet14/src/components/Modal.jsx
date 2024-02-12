import React from 'react';

const Modal = ({ isOpen, message = "Hello modal", buttons = [], onClose, color = "black", background = "white" }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" style={{ backgroundColor: background }}>
      <div className="modal active" style={{ color: color }}>
        <button className="close-btn" onClick={onClose}>X</button> 
        <p>{message}</p>
        <div>
          {buttons.map((button, index) => (
            <button key={index} onClick={button.action} style={{ backgroundColor: button.color }}>
              {button.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;
