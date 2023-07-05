import React from 'react';
import styles from '../ImageGalleryItem/ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ webformatURL, largeImageURL, onClick }) => {
  const handleClick = () => {
    onClick(largeImageURL);
  };

  return (
    <li className={styles.ImageGalleryItem}>
      <img
        className={styles['ImageGalleryItem-image']}
        src={webformatURL}
        alt=""
        onClick={handleClick}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
