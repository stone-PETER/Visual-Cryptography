import React, { useEffect, useState } from 'react';
import './styles.css';
import { auth, db } from '../utils/FireBaseConfig'; // Import Firestore along with auth
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    email: '',
    gender: '',
    upiID: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const signUp = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the form from refreshing the page on submit

    const { email, password, firstName, lastName, mobileNumber, gender, upiID } = formData;

    try {
      // Create the user in Firebase Authentication const userCredential =
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store the additional user data in Firestore
      const userDocRef = doc(collection(db, 'users'), user.uid); // Store users by their UID
      await setDoc(userDocRef, {
        firstName,
        lastName,
        mobileNumber,
        email,
        gender,
        upiID,
        createdAt: new Date(),
      });

      alert('User registered successfully!');
    } catch (error) {
      console.error('Error registering user:', error);
      alert(error.message);
    }
  };
  
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (auth.currentUser) {
        navigate('/user');
      }else{
        navigate('/register');
      }
    });
  }, [auth.onAuthStateChanged]);

  return (
    
    <div className="signup-container">
      <h2>Create Account</h2>
      <form id="signupForm" onSubmit={signUp}>
        <div className="input-group">
          <input
            type="text"
            id="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="text"
            id="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="tel"
            id="mobileNumber"
            placeholder="Mobile Number"
            value={formData.mobileNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-group">
          <select id="gender" value={formData.gender} onChange={handleInputChange} required>
            <option value="" disabled>
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="input-group">
          <input
            type="text"
            id="upiID"
            placeholder="UPI ID"
            value={formData.upiID}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="signup-btn">
          Sign Up
        </button>
      </form>
      <a href="/login" className="login-link">
        Already have an account? Login
      </a>
    </div>
  );
};

export default Register;
