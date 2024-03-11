import './App.css';
import Navbar from './components/common/Navbar';
import {Route, Routes} from "react-router-dom"
import SignUp from './pages/SignUp';
import VerifyOtp from './pages/VerifyOtp';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className='min-h-screen font-inter'>
      <Navbar/>

      <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/verify-otp' element={<VerifyOtp/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/forgot-password' element={<ForgotPassword/>}/>
          <Route path='/reset-password/:token' element={<ResetPassword/>}/>
      </Routes>
    </div>
  );
}

export default App;
