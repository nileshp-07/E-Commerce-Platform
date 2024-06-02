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
import Wishlist from './components/core/Profile/Wishlist';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Error from './components/common/Error';
import AddProducts from './pages/AddProducts';
import Cart from './pages/Cart';
import Dashboard from './components/core/Profile/Dashboard';
import SellerProducts from './components/core/Profile/SellerProducts';
import BecomeSeller from './pages/BecomeSeller';
import OrderDetails from './components/core/Profile/orders/OrderDetails';
import OpenRoute from './components/core/auth/OpenRoute';
import PrivateRoute from './components/core/auth/PrivateRoute';
import { useSelector } from 'react-redux';
import Checkout from './pages/Checkout';
import PaymentSuccess from './pages/PaymentSuccess';

function App() {
  const {user} = useSelector((state) => state.user);
  return (
    <div className='min-h-screen'>
      <Navbar/>

      <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/signup' element={
                                        <OpenRoute>
                                          <SignUp/>
                                        </OpenRoute>
                                      }/>
          <Route path='/verify-otp' element={
                                            <OpenRoute>
                                              <VerifyOtp/>
                                            </OpenRoute>
                                          }/>
          <Route path='/login' element={
                                      <OpenRoute>
                                        <Login/>
                                      </OpenRoute>
                                    }/>
          <Route path='/forgot-password' element={
                                                <OpenRoute>
                                                  <ForgotPassword/>
                                                </OpenRoute>
                                              }/>
          <Route path='/reset-password/:token' element={
                                                  <OpenRoute>
                                                    <ResetPassword/>
                                                  </OpenRoute>
                                                }/>

          <Route path='/search' element={<Products/>}/>
          <Route path='/product/:id' element={<ProductDetails/>}/>
          <Route path='/cart' element={
                                      <PrivateRoute>
                                        <Cart/>
                                      </PrivateRoute>
                                    }/>

          <Route path="/order/:id" element={
                                      <PrivateRoute>
                                        <OrderDetails/>
                                      </PrivateRoute>
                                    }/>


          <Route path ="/checkout"  element={
                                      <PrivateRoute>
                                        <Checkout/>
                                      </PrivateRoute>
                                    }/>

          

          {
             user  && !user?.isSeller  && (
              <Route path="/become-seller" element={
                                                <PrivateRoute>
                                                  <BecomeSeller/>
                                                </PrivateRoute>
                                              }/>
             )
          }


          <Route element={<Profile/>}>
              <Route path='/profile/info' element={
                                                <PrivateRoute>
                                                  <ProfileInfo/>
                                                </PrivateRoute>
                                              }/>
              <Route path='/profile/orders' element={
                                                  <PrivateRoute>
                                                    <Orders/>
                                                  </PrivateRoute>
                                                }/>
              <Route path='/profile/setting' element={
                                                <PrivateRoute>
                                                  <Settings/>
                                                </PrivateRoute>
                                              }/>
              <Route path='/profile/wishlists' element={
                                              <PrivateRoute>
                                                <Wishlist/>
                                              </PrivateRoute>
                                            }/>


              {
                 user?.isSeller && (
                    <>
                      <Route path='/profile/add-product' element={<PrivateRoute>
                                                            <AddProducts/>
                                                          </PrivateRoute>}/>
                      <Route path='/profile/edit-product/:id' element={
                                                                  <PrivateRoute>
                                                                    <AddProducts/>
                                                                  </PrivateRoute>
                                                                }/>
                      <Route path='/profile/products' element={
                                                              <PrivateRoute>
                                                                <SellerProducts/>
                                                              </PrivateRoute>
                                                            }/>
                      <Route path='/profile/dashboard' element={
                                                                <PrivateRoute>
                                                                  <Dashboard/>
                                                                </PrivateRoute>
                                                              }/>
                    </>
                 )
              }
          </Route> 

          <Route path="/payment-success" element={<PaymentSuccess/>}/>
          <Route path='*' element={<Error/>}/> 
      </Routes>
    </div>
  );
}

export default App;
