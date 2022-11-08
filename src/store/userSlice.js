import { createSlice } from '@reduxjs/toolkit';

const initialUserState = {
  _id: JSON.parse(localStorage.getItem('user'))?._id || null,
  username: JSON.parse(localStorage.getItem('user'))?.username || '',
  email: JSON.parse(localStorage.getItem('user'))?.email || '',
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    setUserData: (state, action) => {
      return { ...action.payload };
    },
    resetUserData: (state, action) => {
      return { _id: null, username: '', email: '' };
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
