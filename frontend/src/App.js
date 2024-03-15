import './App.css';
import Navbar from './components/common/Navbar';
import {Route, Routes} from "react-router-dom"
import SignUp from './pages/SignUp';
import VerifyOtp from './pages/VerifyOtp';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import HomePage from './pages/HomePage';
import ProfileInfo from './components/core/Profile/generalInformation/ProfileInfo';
import Profile from './pages/Profile';
import Orders from './components/core/Profile/orders/Orders';
import Settings from './components/core/Profile/setting/Settings';
import Wishlist from './components/core/Profile/wishlists/Wishlist';

function App() {
  return (
    <div className='min-h-screen   '>
      <Navbar/>

      <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/verify-otp' element={<VerifyOtp/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/forgot-password' element={<ForgotPassword/>}/>
          <Route path='/reset-password/:token' element={<ResetPassword/>}/>

          <Route element={<Profile/>}>
              <Route path='/profile/info' element={<ProfileInfo/>}/>
              <Route path='/profile/orders' element={<Orders/>}/>
              <Route path='/profile/setting' element={<Settings/>}/>
              <Route path='/profile/wishlists' element={<Wishlist/>}/>
          </Route>  
      </Routes>
    </div>
  );
}

export default App;
