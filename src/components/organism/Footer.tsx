import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer-custom bg-brand-dark py-4 mt-auto">
            <div className="container d-flex flex-wrap justify-content-between align-items-center">
                <p className="col-md-4 mb-0 fw-bold text-white">
                    © 2026 Ferretería Los Maestros
                </p>

                <Link
                    to="/"
                    className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto text-decoration-none"
                >
                    <img
                        src="/img/favicon-ferreteria.png"
                        alt="Logo FM"
                        width="50"
                        height="40"
                        className="rounded"
                    />
                </Link>

                <ul className="nav col-md-4 justify-content-end">
                    <li className="nav-item">
                        <Link to="/" className="nav-link px-2 text-white">
                            Inicio
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to="/catalogo"
                            className="nav-link px-2 text-white"
                        >
                            Productos
                        </Link>
                    </li>

                    {/* --- CAMBIO: Enlaces con anclas --- */}
                    <li className="nav-item">
                        <a
                            href="/#nosotros"
                            className="nav-link px-2 text-white"
                        >
                            Nosotros
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            href="/#contacto"
                            className="nav-link px-2 text-white"
                        >
                            Contacto
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
