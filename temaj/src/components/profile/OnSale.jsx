import React, { useState, useEffect } from 'react';
import './style.scss';
import Navigator from './Navigator';
import NotificationModal from '../notification/NotificationModal';
import { getOnSaleAllProducts } from '../../api/OnSaleApi';
import { useNavigate } from 'react-router-dom';

const OnSale = () => {
  const [allProduct, setAllProduct] = useState([]);
  const navigate = useNavigate();
  const [notification, setNotification] = useState({
    message: '',
    type: '',
    isVisible: false,
  });

  const fetchData = async () => {
    try {
      const response = await getOnSaleAllProducts();
      setAllProduct(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setNotification({
        message: 'Failed to fetch products. Please try again later.',
        type: 'error',
        isVisible: true,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="profile-wrapper">
      {notification.isVisible && (
        <NotificationModal
          message={notification.message}
          type={notification.type}
          isVisible={notification.isVisible}
          onClose={() => setNotification({ ...notification, isVisible: false })}
        />
      )}
      <div className="profile-container">
        <Navigator activeTab="onSale-section" />
        <div className="content">
          <div className="on-sale">
            <div className="title">
              <h1>On Sale</h1>
              <p>{allProduct?.filter((product) => product.discount > 0).length} Produkte</p>
            </div>
            <div className="on-sale-container">
              {allProduct
                ?.filter((product) => product.discount > 0)
                ?.map((product) => (
                <div key={product.id} className="line" style={{
                  cursor: 'pointer'
                }} onClick={() => navigate(`/product/${product.product_unique_code}`)}>
                  <p><strong>ID:</strong> {product.product_unique_code}</p>
                  <p><strong>Name:</strong> {product.product_name}</p>
                  <p><strong>Discount:</strong> {product.discount}%</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnSale;
