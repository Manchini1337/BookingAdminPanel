import axios from 'axios';

export default axios.create({
  baseURL: 'https://manchini1337bookingapi.herokuapp.com/api/',
  withCredentials: true,
});
