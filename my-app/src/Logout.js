import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/");           
  };

  return (
    <button className="btn btn-outline-danger" onClick={handleLogout}>
      Logout
    </button>
  );
}
export default Logout;