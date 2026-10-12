import { Link } from "react-router-dom";

const ConsejoSeguridad = () => {
    return (
        <main className="container py-5 my-3 flex-grow-1">
            <div className="row justify-content-center">
                <article className="col-lg-8 bg-white p-4 p-md-5 rounded shadow-sm">
                    {/* Botón Volver */}
                    <div className="mb-4">
                        <Link
                            to="/"
                            className="text-decoration-none text-brand-orange fw-bold"
                        >
                            &larr; Volver a Novedades
                        </Link>
                    </div>

                    {/* Título y Bajada */}
                    <h1 className="fw-bold text-brand-dark mb-3">
                        Medidas de seguridad en altura
                    </h1>
                    <p className="lead text-secondary mb-4">
                        Repasa el equipo de protección personal esencial antes
                        de subir al andamio.
                    </p>

                    {/* Imagen Ilustrativa */}
                    <img
                        src="https://images.unsplash.com/photo-1600645896997-3c00e14c0b23?q=80&w=880&auto=format&fit=crop"
                        alt="Trabajador de construcción con casco y arnés"
                        className="img-fluid rounded shadow-sm mb-5 w-100"
                        style={{ maxHeight: "400px", objectFit: "cover" }}
                    />

                    {/* Contenido */}
                    <div
                        className="text-secondary"
                        style={{ lineHeight: "1.8", fontSize: "1.05rem" }}
                    >
                        <p>
                            El trabajo en altura requiere una preparación
                            minuciosa. Un simple resbalón o un equipo mal
                            ajustado puede tener consecuencias graves. Todo
                            trabajador que supere los
                            <strong> 1.8 metros de altura </strong> debe contar
                            con Equipo de Protección Personal (EPP) certificado
                            y en óptimas condiciones.
                        </p>

                        <h4 className="fw-bold text-brand-dark mt-5 mb-3">
                            Equipamiento Básico Obligatorio
                        </h4>
                        <ul className="list-group list-group-flush mb-4">
                            <li className="list-group-item border-0 ps-0">
                                <i className="bi bi-shield-check text-brand-orange me-2"></i>
                                <strong>Arnés de cuerpo completo: </strong>
                                Distribuye la fuerza de impacto en caso de
                                caída. Debe quedar ajustado a las piernas y
                                hombros sin cortar la circulación.
                            </li>
                            <li className="list-group-item border-0 ps-0">
                                <i className="bi bi-shield-check text-brand-orange me-2"></i>
                                <strong>Línea de vida y estrobo: </strong>
                                Elementos de anclaje que conectan tu arnés a un
                                punto estructural resistente.
                            </li>
                            <li className="list-group-item border-0 ps-0">
                                <i className="bi bi-shield-check text-brand-orange me-2"></i>
                                <strong>Casco con barbiquejo: </strong>
                                El barbiquejo es esencial; asegura que el casco
                                no salga volando durante un movimiento brusco o
                                caída.
                            </li>
                            <li className="list-group-item border-0 ps-0">
                                <i className="bi bi-shield-check text-brand-orange me-2"></i>
                                <strong>
                                    Calzado de seguridad antideslizante:{" "}
                                </strong>
                                Para mantener la tracción firme en superficies
                                metálicas o andamios.
                            </li>
                        </ul>

                        <div className="p-4 mt-5 bg-light border-start border-4 border-warning rounded">
                            <h5 className="fw-bold text-brand-dark">
                                <i className="bi bi-exclamation-triangle-fill text-warning me-2"></i>{" "}
                                Importante
                            </h5>
                            <p className="mb-0 small">
                                Antes de cada uso, revisa visualmente las
                                costuras de tu arnés y el estado de los
                                mosquetones. Si detectas hilos sueltos, óxido o
                                deformaciones, <strong>no lo uses</strong> y
                                reemplázalo de inmediato.
                            </p>
                        </div>
                    </div>
                </article>
            </div>
        </main>
    );
};

export default ConsejoSeguridad;
