import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Forms/Forms.css";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://everyones-blog-be.vercel.app/api/users/register",
        {
          email,
          password,
        }
      );
      const token = response.data.token;
      localStorage.setItem("token", token);
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <main className="form-main">
      <div className="form-wrapper">
        <div className="form-header">
          <header>
            <h1>Register here</h1>
          </header>
        </div>
        <div className="form">
          <form onSubmit={handleSubmit} className="register-login">
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="form-button" type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default RegisterForm;
