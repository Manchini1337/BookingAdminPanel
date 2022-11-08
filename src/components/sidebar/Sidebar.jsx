import classes from './Sidebar.module.css';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import HotelIcon from '@mui/icons-material/Hotel';
import ApartmentIcon from '@mui/icons-material/Apartment';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../store/userSlice';
import api from '../../utils/api/axios.interceptor';

const Sidebar = () => {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.user._id);

  const handleLogout = async () => {
    localStorage.removeItem('user');
    dispatch(userActions.resetUserData());
    api.post('auth/logout');
  };

  return (
    <div className={classes.sidebar}>
      <div className={classes.top}>
        <Link to='/' style={{ textDecoration: 'none' }}>
          <span className={classes.logo}>Booking</span>
        </Link>
      </div>
      <div className={classes.bottom}>
        <ul className={classes.list}>
          <p className={classes.listTitle}>MAIN</p>
          <Link to='/' style={{ textDecoration: 'none' }}>
            <li className={classes.listItem}>
              <DashboardIcon className={classes.icon} />
              <span className={classes.desc}>Dashboard</span>
            </li>
          </Link>
          <p className={classes.listTitle}>MANAGE</p>
          <Link to='/users' style={{ textDecoration: 'none' }}>
            <li className={classes.listItem}>
              <PersonOutlineIcon className={classes.icon} />
              <span className={classes.desc}>Users</span>
            </li>
          </Link>
          <Link to='/hotels' style={{ textDecoration: 'none' }}>
            <li className={classes.listItem}>
              <ApartmentIcon className={classes.icon} />
              <span className={classes.desc}>Hotels</span>
            </li>
          </Link>
          <Link to='/rooms' style={{ textDecoration: 'none' }}>
            <li className={classes.listItem}>
              <HotelIcon className={classes.icon} />
              <span className={classes.desc}>Rooms</span>
            </li>
          </Link>
          <p className={classes.listTitle}>USER</p>
          <Link to={`/users/${userId}`} style={{ textDecoration: 'none' }}>
            <li className={classes.listItem}>
              <AccountCircleOutlinedIcon className={classes.icon} />
              <span className={classes.desc}>Profile</span>
            </li>
          </Link>
          <li onClick={handleLogout} className={classes.listItem}>
            <ExitToAppIcon className={classes.icon} />
            <span className={classes.desc}>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Sidebar;
