import './App.css';
import Navbar from './components/common/Navbar';
import {Route, Routes} from "react-router-dom"
import SignUp from './pages/SignUp';

function App() {
  return (
    <div className='min-h-screen font-inter'>
      <Navbar/>

      <Routes>
          <Route path='/signup' element={<SignUp/>}/>
      </Routes>
    </div>
  );
}

export default App;
