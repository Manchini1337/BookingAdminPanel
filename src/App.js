import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import DataPage from './pages/DataPage/DataPage';
import NewUserPage from './pages/NewUserPage/NewUserPage';
import NewHotelPage from './pages/NewHotelPage/NewHotelPage';
import NewRoomPage from './pages/NewRoomPage/NewRoomPage';
import UserPage from './pages/UserPage/UserPage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userColumns, roomColumns, hotelColumns } from './datatablesource';
import { useEffect } from 'react';
import api from './utils/api/axios.interceptor';
import { userActions } from './store/userSlice';
import HotelPage from './pages/HotelPage/HotelPage';

function App() {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user._id) {
      api
        .get(`users/data/${user._id}`)
        .then((response) => {
          dispatch(userActions.setUserData(response.data));
        })
        .catch((err) => dispatch(userActions.resetUserData()));
    }
  }, [dispatch, user._id]);

  const ProtectedRoute = ({ children }) => {
    if (!user._id) {
      return <Navigate to='/login' />;
    }
    return children;
  };

  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />

          <Route
            path='/users'
            element={
              <ProtectedRoute>
                <DataPage columns={userColumns} />
              </ProtectedRoute>
            }
          />
          <Route
            path='/users/:id'
            element={
              <ProtectedRoute>
                <UserPage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/users/new'
            element={
              <ProtectedRoute>
                <NewUserPage />
              </ProtectedRoute>
            }
          />

          <Route
            path='/hotels'
            element={
              <ProtectedRoute>
                <DataPage columns={hotelColumns} />
              </ProtectedRoute>
            }
          />
          <Route
            path='/hotels/:id'
            element={
              <ProtectedRoute>
                <HotelPage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/hotels/new'
            element={
              <ProtectedRoute>
                <NewHotelPage />
              </ProtectedRoute>
            }
          />

          <Route
            path='/rooms'
            element={
              <ProtectedRoute>
                <DataPage columns={roomColumns} />
              </ProtectedRoute>
            }
          />
          {/* <Route
            path='/rooms/:id'
            element={
              <ProtectedRoute>
                <SinglePage />
              </ProtectedRoute>
            }
          /> */}
          <Route
            path='/rooms/new'
            element={
              <ProtectedRoute>
                <NewRoomPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
