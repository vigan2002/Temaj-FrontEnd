// src/components/SkeletonLoader.js
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './SkeletonLoader.scss';

const SkeletonLoader = () => {
  return (
    <div className="skeleton-wrapper">
      <div className="skeleton-left">
        <Skeleton height={400} width="100%" />
        <div className="skeleton-thumbnails">
          <Skeleton height={100} width="100%" />
          <Skeleton height={100} width="100%" />
          <Skeleton height={100} width="100%" />
          <Skeleton height={100} width="100%" />
        </div>
      </div>
      <div className="skeleton-right">
        <Skeleton height={30} width="60%" />
        <Skeleton height={30} width="40%" />
        <Skeleton height={20} width="30%" />
        <Skeleton height={50} width="100%" />
        <Skeleton height={200} width="100%" />
        <Skeleton height={50} width="100%" />
      </div>
    </div>
  );
};

export default SkeletonLoader;
