import classes from './Table.module.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useFetch from '../../hooks/useFetch';
import { format } from 'date-fns';

const List = ({ userId }) => {
  const { data, loading } = useFetch(`/orders/${userId}`);

  if (loading) return <p>Loading...</p>;

  return (
    <TableContainer style={{ maxWidth: 1200 }} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableCell}>Order Id</TableCell>
            <TableCell className={classes.tableCell}>Customer</TableCell>
            <TableCell className={classes.tableCell}>Hotel</TableCell>
            <TableCell className={classes.tableCell}>Dates</TableCell>
            <TableCell className={classes.tableCell}>Amount</TableCell>
            <TableCell className={classes.tableCell}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((order) => (
            <TableRow key={order._id}>
              <TableCell style={{ width: 200 }} className={classes.tableCell}>
                {order._id}
              </TableCell>
              <TableCell style={{ width: 300 }} className={classes.tableCell}>
                <div className={classes.cellWrapper}>
                  <img
                    src={
                      order.customer.img ||
                      'https://i.ibb.co/MBtjqXQ/no-avatar.gif'
                    }
                    alt=''
                    className={classes.image}
                  />
                  {order.customer.username}
                </div>
              </TableCell>
              <TableCell style={{ width: 400 }} className={classes.tableCell}>
                {order.product.name}
              </TableCell>
              <TableCell style={{ width: 300 }} className={classes.tableCell}>
                <span style={{ display: 'block' }}>{`From: ${format(
                  new Date(order.bookedDates[0]),
                  'dd.MM.yyyy'
                )}`}</span>
                <span>{`To: ${format(
                  new Date(order.bookedDates[1]),
                  'dd.MM.yyyy'
                )}`}</span>
              </TableCell>
              <TableCell style={{ width: 150 }} className={classes.tableCell}>
                {`$${order.amount}`}
              </TableCell>
              <TableCell style={{ width: 150 }} className={classes.tableCell}>
                <span
                  className={`${classes.status} ${
                    order.isPaid ? classes.paid : classes.notPaid
                  }`}
                >
                  {order.isPaid ? 'Approved' : 'Pending'}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
