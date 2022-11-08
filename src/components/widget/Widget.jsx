import classes from './Widget.module.css';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import useFetch from '../../hooks/useFetch';
import { formatCurrency } from '../../utils/formatCurrency';

const Widget = ({ type }) => {
  const { data: userData } = useFetch('users/userCount');
  const { data: ordersData } = useFetch('orders/ordersCount');
  const { data: earningsData } = useFetch('orders/ordersEarnings');

  const data = {
    user: {
      title: 'NEW USERS',
      isMoney: false,
      value: userData,
      percentage: 20,
      icon: (
        <PersonOutlinedIcon
          className={classes.icon}
          style={{
            color: 'crimson',
            backgroundColor: 'rgba(255, 0, 0, 0.2)',
          }}
        />
      ),
    },
    order: {
      title: 'NEW ORDERS',
      isMoney: false,
      percentage: -30,
      value: ordersData,
      icon: (
        <ShoppingCartOutlinedIcon
          className={classes.icon}
          style={{
            backgroundColor: 'rgba(218, 165, 32, 0.2)',
            color: 'goldenrod',
          }}
        />
      ),
    },
    earning: {
      title: 'EARNINGS MADE',
      isMoney: true,
      percentage: -20,
      value: formatCurrency(earningsData),
      icon: (
        <MonetizationOnOutlinedIcon
          className={classes.icon}
          style={{ backgroundColor: 'rgba(0, 128, 0, 0.2)', color: 'green' }}
        />
      ),
    },
  };

  return (
    <div className={classes.widget}>
      <div className={classes.left}>
        <span className={classes.title}>{data[type].title}</span>
        <span className={classes.counter}>{data[type].value}</span>
      </div>
      <div className={classes.right}>
        <div
          className={`${classes.percentage} ${
            data[type].percentage > 0 ? classes.positive : classes.negative
          }`}
        >
          {data[type].percentage > 0 ? (
            <KeyboardArrowUpIcon />
          ) : (
            <KeyboardArrowDownIcon />
          )}
          {data[type].percentage}%
        </div>
        {data[type].icon}
      </div>
    </div>
  );
};

export default Widget;
