import Hero from "../components/organism/Hero";
import ProductCard from "../components/molecules/ProductCard";
import { Link } from "react-router-dom";
import FormularioContacto from "../components/organism/FormularioContacto";
import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";

const Inicio = () => {
    // 2. Saca el inventario del contexto
    const { inventario } = useContext(CarritoContext);

    // 3. Toma los 4 primeros productos del inventario vivo
    const productosDestacados = inventario.slice(0, 4);

    return (
        <main>
            {/* 1. Sección Hero */}
            <Hero />

            {/* 2. Sección Destacados */}
            <section id="destacados" className="container py-5">
                <h2 className="fw-bold mb-4 text-brand-dark">
                    Productos Destacados
                </h2>
                <div className="row g-4">
                    {productosDestacados.map((producto) => (
                        <div className="col-md-3" key={producto.id}>
                            <ProductCard producto={producto} />
                        </div>
                    ))}
                </div>

                <div className="text-center mt-5">
                    <Link
                        to="/catalogo"
                        className="btn btn-outline-dark btn-lg fw-bold"
                    >
                        Ver todo el catálogo
                    </Link>
                </div>
            </section>

            {/* 3. Cualidades de Atención */}
            <div className="container px-4 py-5" id="hanging-icons">
                <h3 className="fw-bold mb-3 text-brand-dark">
                    Cómo nos diferenciamos
                </h3>
                <hr />
                <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
                    {/* Cualidad 1: Envío Gratis */}
                    <div className="col d-flex align-items-start">
                        <div className="icon-square text-white p-1 rounded-1 bg-icon-orange d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="currentColor"
                                className="bi bi-truck"
                                viewBox="0 0 16 16"
                            >
                                <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5zm1.294 7.456A2 2 0 0 1 4.732 11h5.536a2 2 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456M12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="text-body-emphasis">Envio Gratis</h4>
                            <p>
                                Por compras sobre los $49.990 enviamos gratis a
                                todo Chile
                            </p>
                        </div>
                    </div>

                    {/* Cualidad 2: Calidad Asegurada */}
                    <div className="col d-flex align-items-start">
                        <div className="icon-square text-white p-1 rounded-1 bg-icon-orange d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="currentColor"
                                className="bi bi-hammer"
                                viewBox="0 0 16 16"
                            >
                                <path d="M9.972 2.508a.5.5 0 0 0-.16-.556l-.178-.129a5 5 0 0 0-2.076-.783C6.215.862 4.504 1.229 2.84 3.133H1.786a.5.5 0 0 0-.354.147L.146 4.567a.5.5 0 0 0 0 .706l2.571 2.579a.5.5 0 0 0 .708 0l1.286-1.29a.5.5 0 0 0 .146-.353V5.57l8.387 8.873A.5.5 0 0 0 14 14.5l1.5-1.5a.5.5 0 0 0 .017-.689l-9.129-8.63c.747-.456 1.772-.839 3.112-.839a.5.5 0 0 0 .472-.334" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="text-body-emphasis">
                                Calidad Asegurada
                            </h4>
                            <p>
                                Trabajamos codo a codo con las mejores marcas y
                                proveedores de herramientas. Nada de productos
                                desechables.
                            </p>
                        </div>
                    </div>

                    {/* Cualidad 3: Asesoramiento */}
                    <div className="col d-flex align-items-start">
                        <div className="icon-square text-white p-1 rounded-1 bg-icon-orange d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="currentColor"
                                className="bi bi-question-circle"
                                viewBox="0 0 16 16"
                            >
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="text-body-emphasis">
                                Asesoramiento
                            </h4>
                            <p>
                                Si tienes dudas sobre qué herramienta elegir, o
                                sobre su uso, no te preocupes, tenemos expertos
                                para orientarte.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 4. Sección Nosotros */}
            <section id="nosotros" className="py-5 bg-white">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <h2 className="fw-bold mb-3 text-brand-dark">
                                Ferretería Los Maestros
                            </h2>
                            <p className="text-muted">
                                Somos un negocio familiar ubicado en La Serena,
                                Región de Coquimbo, con 22 años de trayectoria.
                                Atendidos directamente por sus dueños, nos
                                dedicamos a proveer materiales de construcción,
                                herramientas eléctricas y manuales, gasfitería y
                                electricidad.
                            </p>
                            <p className="text-muted">
                                Ya sea que busques soluciones para tu hogar o
                                seas un contratista que necesita abastecimiento
                                constante, ofrecemos atención personalizada y un
                                amplio catálogo.
                            </p>
                            <div className="mt-5 p-3 rounded bg-brand-muted">
                                <h5 className="fw-bold">
                                    Equipo Desarrollador
                                </h5>
                                <p className="mb-0 text-muted">
                                    Sitio web desarrollado por:{" "}
                                    <strong>Emilia Gallardo</strong>,{" "}
                                    <strong>Vicente Ponce</strong>,{" "}
                                    <strong>Vicente Céspedes</strong>.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-6 mt-4 mt-md-0">
                            <img
                                src="/img/about_us-ferreteria.jpg"
                                className="img-fluid rounded shadow-sm"
                                alt="Equipo Ferretería"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Novedades */}
            <section id="novedades" className="container py-5">
                <h2 className="fw-bold mb-4 text-brand-dark">
                    Consejos para Maestros
                </h2>
                <div className="row g-4">
                    {/* Publicación 1 */}
                    <div className="col-md-6">
                        <div className="card shadow-sm border-0 flex-md-row h-100 news-card">
                            <img
                                src="/img/taladro-consejos-1.jpg"
                                className="card-img-left img-news img-border-radius"
                                alt="Noticia 1"
                            />
                            <div className="card-body">
                                <h5 className="card-title fw-bold">
                                    Cómo elegir el taladro correcto
                                </h5>
                                <p className="card-text text-muted">
                                    Descubre las diferencias entre un taladro
                                    percutor, atornillador y rotomartillo para
                                    tu próxima obra.
                                </p>
                                <Link
                                    className="text-decoration-none fw-bold text-brand-orange"
                                    to="/consejos/taladro"
                                >
                                    Leer más &rarr;
                                </Link>
                            </div>
                        </div>
                    </div>
                    {/* Publicación 2 */}
                    <div className="col-md-6">
                        <div className="card shadow-sm border-0 flex-md-row h-100 news-card">
                            <img
                                src="/img/taladro-consejos-2.jpg"
                                className="card-img-left img-news img-border-radius"
                                alt="Noticia 2"
                            />
                            <div className="card-body">
                                <h5 className="card-title fw-bold">
                                    Medidas de seguridad en altura
                                </h5>
                                <p className="card-text text-muted">
                                    Repasa el equipo de protección personal
                                    esencial antes de subir al andamio.
                                </p>
                                <Link
                                    className="text-decoration-none fw-bold text-brand-orange"
                                    to="/consejos/seguridad"
                                >
                                    Leer más &rarr;
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Contacto */}
            <FormularioContacto />
        </main>
    );
};

export default Inicio;
