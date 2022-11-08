import { useState } from 'react';
import classes from './Gallery.module.css';

const Gallery = ({ photos }) => {
  const [modal, setModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const getImg = (img) => {
    setSelectedImage(img);
    setModal(true);
  };

  if (!photos || photos.length === 0) return null;

  return (
    <>
      <div className={`${classes.modal} ${modal ? classes.active : ''}`}>
        <img src={selectedImage} alt='Hotel entrance' />
        <button className={classes.button} onClick={() => setModal(false)}>
          x
        </button>
      </div>
      <div className={classes.gallery}>
        <h2 className={classes.title}>Hotel Photos</h2>
        {photos?.map((photo, i) => (
          <div
            key={i}
            className={classes.galleryImg}
            onClick={() => getImg(photo)}
          >
            <img
              src={photo}
              className={classes.galleryImg}
              alt='inside hotel'
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Gallery;
