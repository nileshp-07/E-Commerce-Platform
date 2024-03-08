import './App.css';
import Navbar from './components/common/Navbar';
import {Route, Routes} from "react-router-dom"
import SignUp from './pages/SignUp';
import VerifyOtp from './pages/VerifyOtp';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  return (
    <div className='min-h-screen font-inter'>
      <Navbar/>

      <Routes>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/verify-otp' element={<VerifyOtp/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/forgot-password' element={<ForgotPassword/>}/>
      </Routes>
    </div>
  );
}

export default App;
