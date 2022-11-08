import classes from './UserPage.module.css';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Table from '../../components/table/Table';
import { useLocation } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import api from '../../utils/api/axios.interceptor';

const UserPage = () => {
  const { pathname } = useLocation();
  const userId = pathname.split('/')[2];

  const { data, loading, error, reFetch } = useFetch(`users/${userId}`);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`users/${userId}`, { isAdmin: !data.isAdmin });
      reFetch(`/users/${userId}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={classes.userPage}>
      <Sidebar />
      <div className={classes.container}>
        <Navbar />
        <div>
          <div className={classes.userCard}>
            {loading ? (
              'Loading...'
            ) : (
              <div>
                <h1 className={classes.title}>Information</h1>
                <div className={classes.cardItem}>
                  <img
                    src={data.img || 'https://i.ibb.co/MBtjqXQ/no-avatar.gif'}
                    alt=''
                    className={classes.cardItemImg}
                  />
                  <div>
                    <h1 className={classes.detailsTitle}>{data.username}</h1>
                    <div className={classes.detailItem}>
                      <span className={classes.detailItemKey}>Email:</span>
                      <span className={classes.detailItemValue}>
                        {data.email}
                      </span>
                    </div>
                    <div className={classes.detailItem}>
                      <span className={classes.detailItemKey}>Phone:</span>
                      <span className={classes.detailItemValue}>
                        {data.phone}
                      </span>
                    </div>
                    <div className={classes.detailItem}>
                      <span className={classes.detailItemKey}>Address:</span>
                      <span className={classes.detailItemValue}>
                        {`${data.city}, ${data.country}`}
                      </span>
                    </div>
                    <div className={classes.detailItem}>
                      <span className={classes.detailItemKey}>Admin:</span>
                      <span className={classes.detailItemValue}>
                        {data.isAdmin ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>
                </div>
                <button className={classes.button} onClick={handleSubmit}>
                  {data.isAdmin ? 'Revoke Permission' : 'Grant Permission'}
                </button>
              </div>
            )}
          </div>
        </div>
        <div className={classes.bottom}>
          <div className={classes.table}>
            <h1 className={classes.title}>Last Transactions</h1>
            <Table userId={userId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
