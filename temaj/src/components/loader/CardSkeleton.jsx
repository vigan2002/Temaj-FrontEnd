import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './CardSkeleton.scss';

const CardSkeleton = () => {
  return (
    <div className="card-skeleton">
      <div className="skeleton-image">
        <Skeleton height={200} />
      </div>
      <div className="skeleton-content">
        <div className="skeleton-new">
          <Skeleton width={50} height={20} />
        </div>
        <div className="skeleton-title">
          <Skeleton width={100} height={20} />
        </div>
        <div className="skeleton-description">
          <Skeleton width={150} height={20} />
        </div>
        <div className="skeleton-price">
          <Skeleton width={60} height={20} />
        </div>
        <div className="skeleton-button">
          <Skeleton width={100} height={30} />
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
