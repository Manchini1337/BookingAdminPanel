import React from 'react';
import classes from './HomePage.module.css';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Widget from '../../components/widget/Widget';
import { orderColumns } from '../../datatablesource';
import Orderstable from '../../components/orderstable/Orderstable';

const HomePage = () => {
  return (
    <div className={classes.home}>
      <Sidebar />
      <div className={classes.container}>
        <Navbar />
        <h1 className={classes.title}>In last month...</h1>
        <div className={classes.widgets}>
          <Widget type='user' />
          <Widget type='order' />
          <Widget type='earning' />
        </div>
        <h1 className={classes.title}>Search for orders</h1>
        <div className={classes.tableContainer}>
          <Orderstable columns={orderColumns} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
