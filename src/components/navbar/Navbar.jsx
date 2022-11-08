import classes from './Navbar.module.css';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className={classes.navbar}>
      <div className={classes.wrapper}>
        <div className={classes.items}>
          <div className={classes.item}>
            <img
              src={user.img || 'https://i.ibb.co/MBtjqXQ/no-avatar.gif'}
              alt=''
              className={classes.avatar}
            />
          </div>
          <div className={classes.item}>
            <span className={classes.username}>{user.username}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
