import React from 'react';
import './style.scss';
import { useNavigate } from 'react-router-dom';

const Error = ({ status }) => {
  const navigate = useNavigate();
  let errorMessage = 'An unknown error occurred.';
  switch (status) {
    case 500:
      errorMessage = 'We are experiencing trouble with the server. Please try again later.';
      break;
    case 404:
      errorMessage = 'Product not found.';
      break;
    case 403:
      errorMessage = 'You do not have permission to access this page.';
      break;
    case 400:
      errorMessage = 'Bad request. Please check your input.';
      break;
    default:
      errorMessage = 'Product not found.';
  }

  return (
    <div className="error-container">
      <h1>Error {status}</h1>
      <p>{errorMessage}</p>
      <div className="btns">
      <button className='primary-btn' onClick={() => navigate('/temaj-qeramik')}>Go to Home</button>
      <button className='transparent-btn' onClick={() => navigate('/products')}>Go to Products</button>
      </div>
    </div>
  );
};

export default Error;
