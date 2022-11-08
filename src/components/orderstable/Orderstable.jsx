import classes from './Orderstable.module.css';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import api from '../../utils/api/axios.interceptor';

const OrdersTable = ({ columns }) => {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState('');

  const { data, reFetch } = useFetch('orders');

  useEffect(() => {
    setList(data);
  }, [data]);

  const handleStatusChange = async (id, isPaid) => {
    try {
      await api.put(`/orders/${id}`, { isPaid: !isPaid });
      reFetch('orders');
    } catch (err) {
      console.log(err);
    }
  };

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 130,
      renderCell: (params) => {
        return (
          <div className={classes.cellAction}>
            <div
              className={classes.changeButton}
              onClick={() =>
                handleStatusChange(params.row._id, params.row.isPaid)
              }
            >
              Change Status
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className={classes.table}>
      <div className={classes.searchInputContainer}>
        <div className={classes.searchInputGroup}>
          <input
            type='text'
            placeholder='Search user...'
            className={classes.searchInput}
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <i className='bx bx-search-alt-2'></i>
        </div>
      </div>
      <DataGrid
        rows={list.filter((order) => {
          if (search === '') {
            return order;
          } else if (
            order.customer.username.toLowerCase().includes(search.toLowerCase())
          ) {
            return order;
          } else {
            return false;
          }
        })}
        sx={{
          '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
            outline: 'none !important',
          },
        }}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default OrdersTable;
