import React from 'react';
import './Modal.css'; // Assurez-vous que le chemin vers votre fichier CSS est correct

const Modal = ({ isOpen, message = "Hello modal", onOk, onClose }) => {
  if (!isOpen) {
    return null;
  }

  const handleOkButtonClick = () => {
    onOk();
    onClose(); 
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-content">
          <button className="close-btn" onClick={onClose}>X</button>
          <p>{message}</p>
          <div className="modal-buttons">
            <button onClick={handleOkButtonClick}>OK</button>
         
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
