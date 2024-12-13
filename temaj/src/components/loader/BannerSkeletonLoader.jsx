// src/components/BannerSkeletonLoader.js
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './BannerSkeletonLoader.scss';

const BannerSkeletonLoader = () => {
  return (
    <div className="banner-skeleton-overlay">
      <div className="banner-skeleton-content">
        <Skeleton height={400} width="100%" />
      </div>
      <div className="spinner"></div>
    </div>
  );
};

export default BannerSkeletonLoader;
