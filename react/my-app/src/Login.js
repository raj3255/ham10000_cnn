import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/login", form);
      localStorage.setItem("token", res.data.token);
      alert("Logged in!");
      navigate('/home');
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="cont">
      <div className="box">
        <form onSubmit={handleSubmit}>
          <input className="bt" name="email" placeholder="Email" onChange={handleChange} />
          <br />
          <input className="bt" type="password" name="password" placeholder="Password" onChange={handleChange} />
          <br />
          <button className="sub bt" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
