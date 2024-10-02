import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { UserContext } from '../utils/UserContext';
import { setUser } from '../utils/reducer';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/FireBaseConfig';


const Login = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { user } = useSelector((state) => state);
  useEffect(() => {
    if (user.loggedIn) {
      navigate('/user');
    }
  });
  // console.log(user);


  const handleLogin = (e:React.FormEvent) => {
    e.preventDefault();
    
    try {
      signInWithEmailAndPassword(auth , email, password);
      // Dispatch the login action
      dispatch(setUser({ email, loggedIn: true }));
      // Only update the state if all required fields are present
      navigate('/user');
    } catch (error) {
      console.error('Error logging in:', error);
      alert(error.message);
    }
    
    // Simulate authentication
    // if (email === 'admin' && password === 'password') {
    //   localStorage.setItem('authToken', 'your-token');
    //   navigate('/user'); // Redirect to dashboard after login
    // } else {
    //   alert('Invalid credentials');
    // }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} id="loginForm"> 
        <div>
          <label>Email:</label>
          <input
            type="text"
            className="input-group"
            id="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            className="input-group"
            type="password"
            id="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="login-btn">Login</button>
      </form>
      <a href="/register" className="signup-link">Don't have an account? Sign Up</a>
    </div>
  );
};

export default Login;
