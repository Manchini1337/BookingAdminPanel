import { useLocation } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Gallery from '../../components/gallery/Gallery';
import useFetch from '../../hooks/useFetch';
import classes from './HotelPage.module.css';

const HotelPage = () => {
  const { pathname } = useLocation();
  const hotelId = pathname.split('/')[2];

  const { data, loading, error } = useFetch(`hotels/find/${hotelId}`);

  return (
    <div className={classes.hotel}>
      <Sidebar />
      <div className={classes.container}>
        <Navbar />
        <div className={classes.hotelCard}>
          {loading ? (
            'Loading...'
          ) : (
            <div>
              <h1 className={classes.title}>Information</h1>
              <div className={classes.cardItem}>
                <img
                  alt='Hotel entrance'
                  src={
                    data.photos?.[0] || 'https://i.ibb.co/MBtjqXQ/no-avatar.gif'
                  }
                  className={classes.cardItemImg}
                />
                <div>
                  <h1 className={classes.detailsTitle}>{data.name}</h1>
                  <div className={classes.detailItem}>
                    <span className={classes.detailItemKey}>Type:</span>
                    <span className={classes.detailItemValue}>{data.type}</span>
                  </div>
                  <div className={classes.detailItem}>
                    <span className={classes.detailItemKey}>Address:</span>
                    <span className={classes.detailItemValue}>
                      {data.address}, {data.city}
                    </span>
                  </div>
                  <div className={classes.detailItem}>
                    <span className={classes.detailItemKey}>Price:</span>
                    <span className={classes.detailItemValue}>
                      ${data.cheapestPrice}
                    </span>
                  </div>
                  <div className={classes.detailItem}>
                    <span className={classes.detailItemKey}>
                      Away from city center:
                    </span>
                    <span className={classes.detailItemValue}>
                      {data.distance}m
                    </span>
                  </div>
                  <div className={classes.detailItem}>
                    <span className={classes.detailItemKey}>Featured:</span>
                    <span className={classes.detailItemValue}>
                      {data.featured ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </div>
              <div className='hotelGallery'>
                <Gallery photos={data.photos} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotelPage;
