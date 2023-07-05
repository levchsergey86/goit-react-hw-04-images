import React, { useState } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Modal from '../Modal/Modal';
import styles from '../ImageGallery/ImageGallery.module.css';
import PropTypes from 'prop-types';

const Gallery = ({ images }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = imageUrl => {
    setModalOpen(true);
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div>
      <ul className={styles.ImageGallery}>
        {images.map(image => (
          <ImageGalleryItem
            key={image.id}
            webformatURL={image.webformatURL}
            largeImageURL={image.largeImageURL}
            onClick={openModal}
          />
        ))}
      </ul>
      {modalOpen && (
        <Modal
          isOpen={modalOpen}
          onClose={closeModal}
          imageUrl={selectedImage}
          altText="Modal Image"
        />
      )}
    </div>
  );
};

Gallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Gallery;
