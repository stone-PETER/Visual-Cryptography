import "./styles.css";
export default function Login() {
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form id="loginForm">
        <div className="input-group">
          <input type="text" id="username" placeholder="Username" required />
        </div>
        <div className="input-group">
          <input
            type="password"
            id="password"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
      <a href="signup.html" className="sign-up-link">
        Don't have an account? Sign up
      </a>
    </div>
  );
}
