import { format } from 'date-fns';
import classes from '../src/components/datatable/Datatable.module.css';

export const userColumns = [
  { field: '_id', headerName: 'ID', width: 250 },
  {
    field: 'user',
    headerName: 'User',
    width: 230,
    renderCell: (params) => {
      return (
        <div className={classes.cellWithImg}>
          <img
            className={classes.cellImg}
            src={params.row.img || 'https://i.ibb.co/MBtjqXQ/no-avatar.gif'}
            alt='avatar'
          />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 230,
  },

  {
    field: 'country',
    headerName: 'Country',
    width: 100,
  },
  {
    field: 'city',
    headerName: 'City',
    width: 100,
  },
  {
    field: 'phone',
    headerName: 'Phone',
    width: 150,
  },
];

export const hotelColumns = [
  { field: '_id', headerName: 'ID', width: 250 },
  {
    field: 'name',
    headerName: 'Name',
    width: 370,
  },
  {
    field: 'type',
    headerName: 'Type',
    width: 100,
  },
  {
    field: 'title',
    headerName: 'Title',
    width: 230,
  },
  {
    field: 'city',
    headerName: 'City',
    width: 100,
  },
];

export const roomColumns = [
  { field: '_id', headerName: 'ID', width: 300 },
  {
    field: 'title',
    headerName: 'Title',
    width: 200,
  },
  {
    field: 'desc',
    headerName: 'Description',
    width: 320,
  },
  {
    field: 'price',
    headerName: 'Price',
    width: 100,
  },
  {
    field: 'maxPeople',
    headerName: 'Max People',
    width: 100,
  },
];

export const orderColumns = [
  { field: '_id', headerName: 'ID', width: 250 },
  {
    field: 'user',
    headerName: 'User',
    width: 220,
    renderCell: (params) => {
      return (
        <div className={classes.cellWithImg}>
          <img
            className={classes.cellImg}
            src={
              params.row.customer.img ||
              'https://i.ibb.co/MBtjqXQ/no-avatar.gif'
            }
            alt='avatar'
          />
          {params.row.customer.username}
        </div>
      );
    },
  },
  {
    field: 'product',
    headerName: 'Hotel',
    width: 420,
    renderCell: (params) => {
      return <div>{params.row.product.name}</div>;
    },
  },
  {
    field: 'bookedDates',
    headerName: 'Dates',
    width: 180,
    renderCell: (params) => {
      return (
        <div>
          <span style={{ display: 'block' }}>{`From: ${format(
            new Date(params.row.bookedDates[0]),
            'dd.MM.yyyy'
          )}`}</span>
          <span>{`To: ${format(
            new Date(params.row.bookedDates[1]),
            'dd.MM.yyyy'
          )}`}</span>
        </div>
      );
    },
  },
  { field: 'amount', headerName: 'Amount ($)', width: 120 },
  {
    field: 'isPaid',
    headerName: 'Status',
    width: 150,
    renderCell: (params) => {
      return (
        <span
          className={`${classes.cellWithStatus} ${
            params.row.isPaid ? classes.paid : classes.notPaid
          }`}
        >
          {params.row.isPaid ? 'Approved' : 'Pending'}
        </span>
      );
    },
  },
];
