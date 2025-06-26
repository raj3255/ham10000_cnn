import Logout from "./Logout";
import { useNavigate } from 'react-router-dom';
function Header() {
    const name = localStorage.getItem("username")
    const navigate = useNavigate();
    return (
        <div className="container">
            <header className="py-3 mb-3 border-bottom">
                <div className="container-fluid d-grid gap-3 align-items-center" style={{ gridTemplateColumns: '1fr 2fr' }}>
                    <div className="dropdown">
                        <a href="#" className="d-flex align-items-center col-lg-4 mb-2 mb-lg-0 link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" aria-label="Bootstrap menu">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lungs-fill" viewBox="0 0 16 16">
                                <path d="M8 1a.5.5 0 0 1 .5.5v5.243L9 7.1V4.72C9 3.77 9.77 3 10.72 3c.524 0 1.023.27 1.443.592.431.332.847.773 1.216 1.229.736.908 1.347 1.946 1.58 2.48.176.405.393 1.16.556 2.011.165.857.283 1.857.24 2.759-.04.867-.232 1.79-.837 2.33-.67.6-1.622.556-2.741-.004l-1.795-.897A2.5 2.5 0 0 1 9 11.264V8.329l-1-.715-1 .715V7.214c-.1 0-.202.03-.29.093l-2.5 1.786a.5.5 0 1 0 .58.814L7 8.329v2.935A2.5 2.5 0 0 1 5.618 13.5l-1.795.897c-1.12.56-2.07.603-2.741.004-.605-.54-.798-1.463-.838-2.33-.042-.902.076-1.902.24-2.759.164-.852.38-1.606.558-2.012.232-.533.843-1.571 1.579-2.479.37-.456.785-.897 1.216-1.229C4.257 3.27 4.756 3 5.28 3 6.23 3 7 3.77 7 4.72V7.1l.5-.357V1.5A.5.5 0 0 1 8 1m3.21 8.907a.5.5 0 1 0 .58-.814l-2.5-1.786A.5.5 0 0 0 9 7.214V8.33z" />
                            </svg>
                        </a>
                        <ul className="dropdown-menu text-small shadow" >
                            <li><button className="dropdown-item active" aria-current="page" onClick={(e) => { e.preventDefault(); navigate('/overview'); }}>Overview</button></li>
                            <li><button className="dropdown-item" onClick={(e) => { e.preventDefault(); navigate('/about'); }}>About</button></li>
                            <li><a className="dropdown-item" href="#">Reports</a></li>
                        </ul>
                    </div>
                    <div className="d-flex align-items-center">
                        <form className="w-100 me-3" role="search">
                            <input type="search" className="form-control" placeholder="Search..." aria-label="Search" />
                        </form> <div className="flex-shrink-0 dropdown">
                            <a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="/logo192.png" alt="mdo" width="32" height="32" className="rounded-circle" />
                            </a>
                            <ul className="dropdown-menu text-small shadow">
                                <li><a className="dropdown-item" href="#">{`${name}`}</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><h2 className="dropdown-item"><Logout /></h2></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}
export default Header;