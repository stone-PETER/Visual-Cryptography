import './styles.css'
export default function Register() {
  return (
    <div className="signup-container">
      <h2>Create Account</h2>
      <form id="signupForm">
        <div className="input-group">
          <input type="text" id="firstName" placeholder="First Name" required />
        </div>
        <div className="input-group">
          <input type="text" id="lastName" placeholder="Last Name" required />
        </div>
        <div className="input-group">
          <input
            type="tel"
            id="mobileNumber"
            placeholder="Mobile Number"
            required
          />
        </div>
        <div className="input-group">
          <input type="email" id="email" placeholder="Email" required />
        </div>
        <div className="input-group">
          <select title="gender" id="gender" required>
            <option value="" disabled selected>
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="input-group">
          <input type="text" id="upiID" placeholder="UPI ID" required />
        </div>
        <button type="submit" className="signup-btn">
          Sign Up
        </button>
      </form>
      <a href="login.html" className="login-link">
        Already have an account? Login
      </a>
    </div>
  );
}
