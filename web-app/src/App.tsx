import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import MerchantHome from './pages/MerchantHome.tsx';
import ProtectedRoute from './utils/ProtectedRoute';
// import ProtectedRoute from './components/ProtectedRoute';
// import {auth} from './utils/FireBaseConfig.tsx';
// import { useEffect, useState } from 'react';
import Header from './components/Header';
import { store } from './utils/store.tsx';
import { Provider } from 'react-redux'

function App() {
  
  return (
    <>
    
    <Provider store={store}>
      <Header/>
      <Router>
        <Routes>
          {/* Public Routes */}
          
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

            <Route path='/user' element={
              <ProtectedRoute>
                <MerchantHome/>
              </ProtectedRoute>
            }/>

          <Route path="/register" element={<Register />} />
        </Routes>

      </Router>
    </Provider>

    </>
  );
}

export default App;
