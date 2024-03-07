import './App.css';
import Navbar from './components/common/Navbar';
import {Route, Routes} from "react-router-dom"
import SignUp from './pages/SignUp';
import VerifyOtp from './pages/VerifyOtp';

function App() {
  return (
    <div className='min-h-screen font-inter'>
      <Navbar/>

      <Routes>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/verify-otp' element={<VerifyOtp/>}/>
      </Routes>
    </div>
  );
}

export default App;
