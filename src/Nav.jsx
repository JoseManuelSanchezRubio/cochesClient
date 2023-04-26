import { Link } from "react-router-dom"


export default function Nav(props) {

    function logout() {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("customer");
        window.location.href = "/";
    }


    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand ps-5" to="/">Alquiler de coches</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className={props.isLogged ? "collapse navbar-collapse visually-hidden" : "collapse navbar-collapse"} id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/logup">Logup</Link>
                    </li>
                </ul>
            </div>
            <div className={props.isLogged ? "collapse navbar-collapse" : "collapse navbar-collapse visually-hidden"} id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/profile">Mi perfil</Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={logout} style={{ cursor: 'pointer' }}>Cerrar sesión</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}