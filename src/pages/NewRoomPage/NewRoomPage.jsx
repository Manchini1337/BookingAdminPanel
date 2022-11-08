import classes from './NewRoomPage.module.css';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { useState } from 'react';
import { roomInputs } from '../../formsource';
import useFetch from '../../hooks/useFetch';

import api from '../../utils/api/axios.interceptor';

const NewRoomPage = () => {
  const [formData, setFormData] = useState({});
  const [hotelId, setHotelId] = useState(null);
  const [rooms, setRooms] = useState([]);

  const { data, loading, error } = useFetch('hotels');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const roomNumbers = rooms.split(',').map((room) => ({ number: room }));

    try {
      await api.post(`rooms/${hotelId}`, {
        ...formData,
        roomNumbers,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={classes.newRoom}>
      <Sidebar />
      <div className={classes.container}>
        <Navbar />
        <div className={classes.top}>
          <h1 className={classes.title}>Add New Room</h1>
        </div>
        <div className={classes.bottom}>
          <div>
            <form className={classes.form}>
              {roomInputs.map((input) => (
                <div className={classes.formGroup} key={input.id}>
                  <label className={classes.formLabel}>{input.label}</label>
                  <input
                    className={classes.formInput}
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className={classes.formGroup}>
                <label className={classes.formLabel}>Rooms</label>
                <textarea
                  className={classes.formTextarea}
                  onChange={(e) => setRooms(e.target.value)}
                  placeholder='give comma between room numbers.'
                />
              </div>
              <div className={classes.formGroup}>
                <label className={classes.formLabel}>Choose a hotel</label>
                <select
                  className={classes.formSelect}
                  id='hotelId'
                  onChange={(e) => setHotelId(e.target.value)}
                >
                  {loading
                    ? 'loading'
                    : data &&
                      data.map((hotel) => (
                        <option key={hotel._id} value={hotel._id}>
                          {hotel.name}
                        </option>
                      ))}
                </select>
              </div>
            </form>
            <button className={classes.formButton} onClick={handleSubmit}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoomPage;
