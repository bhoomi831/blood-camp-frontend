import React, { useEffect } from 'react';
import './Modal.css';

const Modal = ({ 
  children, 
  isOpen, 
  onClose, 
  title = '', 
  size = 'medium',
  footer = null,
  backdrop = true,
  keyboard = true,
  ...props
}) => {
  useEffect(() => {
    if (keyboard && isOpen) {
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, keyboard, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {backdrop && (
        <div className="modal-backdrop fade show" onClick={onClose}></div>
      )}
      <div className={`modal ${size}`} role="dialog" aria-modal="true">
        <div className="modal-content">
          {title && (
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
            </div>
          )}
          <div className="modal-body">
            {children}
          </div>
          {footer && (
            <div className="modal-footer">
              {footer}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Modal;
