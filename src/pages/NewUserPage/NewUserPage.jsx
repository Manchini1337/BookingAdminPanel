import classes from './NewUserPage.module.css';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { useState } from 'react';
import axios from 'axios';
import { userInputs } from '../../formsource';
import api from '../../utils/api/axios.interceptor';

const NewUserPage = () => {
  const [file, setFile] = useState('');
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'upload');
    try {
      const uploadResponse = await axios.post(
        'https://api.cloudinary.com/v1_1/dlu0vo6kc/image/upload',
        data
      );

      const { url } = uploadResponse.data;

      const newUser = {
        ...formData,
        img: url,
      };

      await api.post(`auth/register`, newUser);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={classes.newUser}>
      <Sidebar />
      <div className={classes.container}>
        <Navbar />
        <div className={classes.top}>
          <h1 className={classes.title}>Add New User</h1>
        </div>
        <div className={classes.bottom}>
          <div className={classes.left}>
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
              }
              alt=''
            />
          </div>
          <div className={classes.right}>
            <form className={classes.form}>
              <div className={`${classes.formFile} ${classes.formGroup}`}>
                <label className={classes.formLabel} htmlFor='file'>
                  Image:{' '}
                  <DriveFolderUploadOutlinedIcon className={classes.formIcon} />
                </label>
                <input
                  className={classes.formInput}
                  type='file'
                  id='file'
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: 'none' }}
                />
              </div>
              <div className={classes.grid}>
                {userInputs.map((input) => (
                  <div className={classes.formGroup} key={input.id}>
                    <label className={classes.formLabel}>{input.label}</label>
                    <input
                      className={classes.formInput}
                      onChange={handleChange}
                      type={input.type}
                      placeholder={input.placeholder}
                      id={input.id}
                    />
                  </div>
                ))}
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

export default NewUserPage;
