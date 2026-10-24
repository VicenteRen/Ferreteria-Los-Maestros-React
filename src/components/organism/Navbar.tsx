import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CarritoContext } from "../../context/CarritoContext";
import Boton from "../atoms/Boton";

const Navbar = () => {
    const { totalArticulos } = useContext(CarritoContext);
        //AGREGADO PARA MANTENER SESIÓN DEL CLIENTE
    const navegar = useNavigate();
    const ubicacion = useLocation();

    const [sesion, setSesion] = useState(() => {
    return (
        localStorage.getItem("usuarioSesion") ||
        sessionStorage.getItem("usuarioSesion")
    );
    });

    let nombreUsuario = "Usuario";
    let rolUsuario = "";

    if (sesion) {
        try {
            const datosSesion = JSON.parse(sesion);
            nombreUsuario = datosSesion.nombre || "Usuario";
            rolUsuario = datosSesion.rol || "";
        } catch {
            nombreUsuario = "Usuario";
            rolUsuario = "";
        }
    }

    useEffect(() => {
        setSesion(
            localStorage.getItem("usuarioSesion") ||
            sessionStorage.getItem("usuarioSesion")
        );
    }, [ubicacion.pathname]);

    const cerrarSesion = () => {
    localStorage.removeItem("usuarioSesion");
    sessionStorage.removeItem("usuarioSesion");
    setSesion(null);
    navegar("/");
    };

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-brand-dark fixed-top">
                <div className="container">
                    <Link className="navbar-brand fw-bold" to="/">
                        <span className="logo-box">FM</span>
                        Ferretería Los Maestros
                    </Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto align-items-center">
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/">
                                    Inicio
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className="nav-link text-white"
                                    to="/catalogo"
                                >
                                    Productos
                                </Link>
                            </li>

                            {/* --- CAMBIO: Usamos <a> para el scroll hacia las secciones --- */}
                            <li className="nav-item">
                                <a
                                    className="nav-link text-white"
                                    href="/#nosotros"
                                >
                                    Nosotros
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link text-white"
                                    href="/#contacto"
                                >
                                    Contacto
                                </a>
                            </li>
                            {/* ------------------------------------------------------------- */}

                            <li className="nav-item ms-lg-3">
                                <a
                                    className="nav-link text-brand-white fw-bold d-flex align-items-center"
                                    data-bs-toggle="offcanvas"
                                    href="#carritoOffcanvas"
                                    role="button"
                                >
                                    🛒 Mi Carrito
                                    <span className="badge bg-danger rounded-pill ms-2">
                                        {totalArticulos}
                                    </span>
                                </a>
                            </li>
                            
                            <li
                                className="nav-item ms-lg-3 mt-2 mt-lg-0"
                                id="menu-sesion"
                            >
                                {sesion ? (
                                 <div className="d-flex flex-column flex-lg-row gap-2">
                                    <span className="text-white d-flex align-items-center">
                                        <i className="bi bi-person-circle me-2" aria-hidden="true" />
                                        Hola, {nombreUsuario}
                                    </span>

                                    {rolUsuario === "admin" && (
                                        <Link
                                            to="/admin"
                                            className="nav-link text-white d-flex align-items-center gap-2"
                                        >
                                            <i className="bi bi-speedometer2" aria-hidden="true"></i>
                                            Panel administrativo
                                        </Link>
                                    )}

                                    <Boton
                                        texto="Cerrar sesión"
                                        onClick={cerrarSesion}
                                    />
                                 </div>
                                ) : (
                                 <Link className="btn btn-orange w-100" to="/login">
                                    Iniciar Sesión
                                 </Link>
                                )}
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
