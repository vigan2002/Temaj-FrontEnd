import React, { useState, useEffect } from 'react';
import './notificationModal.scss';
import { IoMdClose } from 'react-icons/io';

const NotificationModal = ({ message, type, isVisible, onClose }) => {
  const [show, setShow] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      setTimeout(() => {
        setShow(false);
        onClose();
      }, 3000);
    }
  }, [isVisible, onClose]);

  const handleClose = () => {
    setShow(false);
    onClose();
  };

  return (
    <div className={`notification-modal ${show ? 'show' : ''} ${type}`}>
      <div className="notification-content">
        <p>{message}</p>
        <button className="close-btn" onClick={handleClose}>
          <IoMdClose color="var(--darker-color)" fontSize={"25px"} />
        </button>
      </div>
    </div>
  );
};

export default NotificationModal;
