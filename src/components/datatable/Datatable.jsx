import classes from './Datatable.module.css';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import useFetch from '../../hooks/useFetch';
import api from '../../utils/api/axios.interceptor';

const Datatable = ({ columns }) => {
  const [list, setList] = useState([]);

  const location = useLocation();
  const path = location.pathname.split('/')[1];

  const { data, error } = useFetch(`${path}`);

  useEffect(() => {
    setList(data);
  }, [data]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`${path}/${id}`);
      setList(list.filter((item) => item._id !== id));
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
            <Link to={`${params.row._id}`} style={{ textDecoration: 'none' }}>
              <div className={classes.viewButton}>View</div>
            </Link>
            <div
              className={classes.deleteButton}
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className={classes.table}>
      <div className={classes.title}>
        {path[0].toUpperCase() + path.slice(1)}
        <Link to={`/${path}/new`} className={classes.link}>
          Add New
        </Link>
      </div>
      <DataGrid
        rows={list}
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

export default Datatable;
