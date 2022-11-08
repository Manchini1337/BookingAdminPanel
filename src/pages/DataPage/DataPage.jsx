import React from 'react';
import classes from './DataPage.module.css';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Datatable from '../../components/datatable/Datatable';

const DataPage = ({ columns }) => {
  return (
    <div className={classes.list}>
      <Sidebar />
      <div className={classes.container}>
        <Navbar />
        <Datatable columns={columns} />
      </div>
    </div>
  );
};

export default DataPage;
