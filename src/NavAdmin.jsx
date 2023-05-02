import { Link } from "react-router-dom";

export default function NavAdmin({ changeSection }) {
    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark ps-5">
            <Link className="navbar-brand">Admin</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link" id="categorias" onClick={(e) => { changeSection(e.target.id) }}>Categorías</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" id="clientes" onClick={(e) => { changeSection(e.target.id) }}>Clientes</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" id="coches" onClick={(e) => { changeSection(e.target.id) }}>Coches</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" id="reservas" onClick={(e) => { changeSection(e.target.id) }}>Reservas</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" id="sucursales" onClick={(e) => { changeSection(e.target.id) }}>Sucursales</Link>
                    </li>
                </ul>
                <div className="navbar-nav me-5">
                    <Link className="nav-link" to={'/'}>Alquiler de coches</Link>
                </div>
            </div>
        </nav>
    )
}