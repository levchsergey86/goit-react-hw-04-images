import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar/SearchBar';
import Gallery from './ImageGallery/ImageGallery';
import { getPicture } from './services/getPicture';
import MyLoader from './Loader/Loader';
import styles from './App.module.css';
import LoadMoreButton from './LoadMoreButton/LoadMoreButton';

const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [totalHits, setTotalHits] = useState(0);

  const handleSearch = searchText => {
    setImages([]);
    setPage(1);
    setSearchText(searchText);
    setIsLoading(true);
    fetchImages(searchText, 1);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    fetchImages(searchText, nextPage);
  };

  const fetchImages = (searchText, page) => {
    getPicture(searchText, page)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error fetching images');
        }
        return response.json();
      })
      .then(data => {
        const newImages = data.hits.map(hit => ({
          id: hit.id,
          webformatURL: hit.webformatURL,
          largeImageURL: hit.largeImageURL,
        }));
        setImages(prevImages => [...prevImages, ...newImages]);
        setPage(page);
        setIsLoading(false);
        setIsFirstLoad(false);
        setTotalHits(data.totalHits);
      })
      .catch(error => {
        console.error('Error fetching images:', error);
        setIsLoading(false);
        setIsFirstLoad(false);
      });
  };

  const showLoadMoreButton =
    !isLoading && images.length > 0 && images.length < totalHits;

  return (
    <div className={styles.App}>
      <SearchBar handleSearch={handleSearch} />
      {isLoading ? (
        <MyLoader />
      ) : (
        <>
          {!isFirstLoad && images.length === 0 && (
            <p className={styles.NoImageText}>No images found😢</p>
          )}
          {images.length > 0 && (
            <>
              <Gallery images={images} />
              {showLoadMoreButton && (
                <LoadMoreButton onClick={handleLoadMore} />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

App.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  page: PropTypes.number.isRequired,
  searchText: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isFirstLoad: PropTypes.bool.isRequired,
  handleSearch: PropTypes.func.isRequired,
  handleLoadMore: PropTypes.func.isRequired,
};

export default App;
