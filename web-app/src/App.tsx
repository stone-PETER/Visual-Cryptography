import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Register from './pages/register';
import Login from './pages/login';
import UserHome from './pages/UserHome';
import ProtectedRoute from './utils/ProtectedRoute';
// import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path='/user' element={
          <ProtectedRoute>
            <UserHome/>
          </ProtectedRoute>
        }/>

      </Routes>
      {/* <ProtectedRoute */}


    </Router>
  );
}

export default App;
