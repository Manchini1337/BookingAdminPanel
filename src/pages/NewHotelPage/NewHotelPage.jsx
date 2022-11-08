import classes from './NewHotelPage.module.css';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { useState } from 'react';
import { hotelInputs } from '../../formsource';
import useFetch from '../../hooks/useFetch';
import axios from 'axios';
import api from '../../utils/api/axios.interceptor';
import { useNavigate } from 'react-router-dom';

const NewHotelPage = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState('');
  const [formData, setFormData] = useState({});
  const [rooms, setRooms] = useState([]);

  const { data, loading, error } = useFetch('rooms');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelect = (e) => {
    const options = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRooms(options);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append('file', file);
          data.append('upload_preset', 'upload');
          const uploadResponse = await axios.post(
            'https://api.cloudinary.com/v1_1/dlu0vo6kc/image/upload',
            data
          );

          const { url } = uploadResponse.data;
          return url;
        })
      );

      const newHotel = {
        ...formData,
        rooms,
        photos: list,
      };
      await api.post('hotels', newHotel);
      navigate('/hotels');
    } catch (err) {
      console.log(error);
    }
  };

  return (
    <div className={classes.newHotel}>
      <Sidebar />
      <div className={classes.container}>
        <Navbar />
        <div className={classes.top}>
          <h1 className={classes.title}>Add New Hotel</h1>
        </div>
        <div className={classes.bottom}>
          <div className={classes.left}>
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
              }
              alt=''
            />
          </div>
          <div className={classes.right}>
            <form className={classes.form}>
              <div className={`${classes.formFile} ${classes.formGroup}`}>
                <label className={classes.formLabel} htmlFor='file'>
                  Images:{' '}
                  <DriveFolderUploadOutlinedIcon className={classes.formIcon} />
                </label>
                <input
                  type='file'
                  id='file'
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: 'none' }}
                />
              </div>

              <div className={classes.grid}>
                {hotelInputs.map((input) => (
                  <div className={classes.formGroup} key={input.id}>
                    <label className={classes.formLabel}>{input.label}</label>
                    <input
                      className={classes.formInput}
                      id={input.id}
                      onChange={handleChange}
                      type={input.type}
                      placeholder={input.placeholder}
                    />
                  </div>
                ))}
              </div>
              <div className={classes.grid}>
                <div className={classes.formGroup}>
                  <label className={classes.formLabel}>Featured</label>
                  <select
                    className={classes.formSelect}
                    id='featured'
                    onChange={handleChange}
                  >
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                  </select>
                </div>
                <div className={classes.selectRooms}>
                  <label className={classes.formLabel}>Rooms</label>
                  <select
                    className={classes.formSelect}
                    id='rooms'
                    multiple
                    onChange={handleSelect}
                  >
                    {loading
                      ? 'loading'
                      : data &&
                        data.map((room) => (
                          <option key={room._id} value={room._id}>
                            {room.title}
                          </option>
                        ))}
                  </select>
                </div>
              </div>
              <button className={classes.formButton} onClick={handleSubmit}>
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHotelPage;
