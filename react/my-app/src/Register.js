import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/register", form);
      alert("Registered successfully!");
      navigate('/home');

    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="cont">
      <div className="box">
        <form onSubmit={handleSubmit}>
          <input className="bt" name="username" placeholder="Username" onChange={handleChange} />
          <br />
          <input className="bt" name="email" placeholder="Email" onChange={handleChange} />
          <br />
          <input className="bt" type="password" name="password" placeholder="Password" onChange={handleChange} />
          <br />
          <button className="bt sub" type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
