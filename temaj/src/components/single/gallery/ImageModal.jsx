import React from "react";
import "./style.scss";
import { IoMdClose } from "react-icons/io";

const ImageModal = ({ closeModal, image }) => {
  return (
    <div className="image-modal" onClick={closeModal}>
      <div className="image-wrapper" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={closeModal}>
          <IoMdClose
            color="#fff"
            style={{
              height: "30px",
              width: "30px",
            }}
          />
        </button>
        {image ? (
          <img src={image} alt="Selected" 
          onContextMenu={(e) => e.preventDefault()}/>
        ) : (
          <p>Image not available</p>
        )}
      </div>
    </div>
  );
};

export default ImageModal;
