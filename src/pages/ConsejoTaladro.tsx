import { Link } from "react-router-dom";

const ConsejoTaladro = () => {
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
                        Cómo elegir el taladro correcto
                    </h1>
                    <p className="lead text-secondary mb-4">
                        Descubre las diferencias entre un taladro atornillador,
                        un taladro percutor y un rotomartillo para escoger la
                        herramienta adecuada para tu próxima obra.
                    </p>

                    {/* Imagen Principal */}
                    <img
                        src="/img/taladro-consejos-1.jpg"
                        alt="Taladro junto a diferentes herramientas de trabajo"
                        className="img-fluid rounded shadow-sm mb-5 w-100"
                        style={{ maxHeight: "400px", objectFit: "cover" }}
                    />

                    {/* Contenido */}
                    <div
                        className="text-secondary"
                        style={{ lineHeight: "1.8", fontSize: "1.05rem" }}
                    >
                        <p>
                            Elegir el taladro adecuado depende principalmente
                            del material que deseas perforar y del tipo de
                            trabajo que necesitas realizar. Aunque estas
                            herramientas pueden parecer similares, cada una está
                            diseñada para cumplir funciones diferentes.
                        </p>
                        <p>
                            Conocer sus principales características permite
                            trabajar de manera más cómoda y utilizar la
                            herramienta más apropiada para cada proyecto.
                        </p>

                        <h4 className="fw-bold text-brand-dark mt-5 mb-3">
                            ¿Qué tipo de taladro necesitas?
                        </h4>
                        <ul className="list-group list-group-flush mb-4">
                            <li className="list-group-item border-0 ps-0">
                                <i className="bi bi-tools text-brand-orange me-2"></i>
                                <strong>Taladro atornillador: </strong>
                                Es una alternativa práctica para montar muebles,
                                colocar y retirar tornillos y realizar
                                perforaciones sencillas en materiales como
                                madera, plástico y algunos metales.
                            </li>
                            <li className="list-group-item border-0 ps-0">
                                <i className="bi bi-tools text-brand-orange me-2"></i>
                                <strong>Taladro percutor: </strong>
                                Combina el movimiento de giro con pequeños
                                impactos. Esto facilita la perforación de
                                materiales de construcción como ladrillos y
                                mampostería, además de permitir trabajos
                                convencionales cuando se desactiva la percusión.
                            </li>
                            <li className="list-group-item border-0 ps-0">
                                <i className="bi bi-tools text-brand-orange me-2"></i>
                                <strong>Rotomartillo: </strong>
                                Está pensado para trabajos de mayor exigencia y
                                entrega impactos más fuertes. Resulta más
                                apropiado cuando se necesita perforar materiales
                                duros como hormigón o piedra.
                            </li>
                            <li className="list-group-item border-0 ps-0">
                                <i className="bi bi-battery-charging text-brand-orange me-2"></i>
                                <strong>¿Con cable o batería? </strong>
                                Los modelos inalámbricos ofrecen mayor movilidad
                                y comodidad. Los modelos con cable pueden ser
                                convenientes para trabajos prolongados donde se
                                dispone constantemente de una conexión
                                eléctrica.
                            </li>
                        </ul>

                        <h4 className="fw-bold text-brand-dark mt-5 mb-3">
                            Antes de elegir, considera
                        </h4>
                        <ul className="list-group list-group-flush mb-4">
                            <li className="list-group-item border-0 ps-0">
                                <i className="bi bi-check-circle text-brand-orange me-2"></i>
                                <strong>El material: </strong> madera, metal,
                                ladrillo u hormigón requieren herramientas y
                                brocas diferentes.
                            </li>
                            <li className="list-group-item border-0 ps-0">
                                <i className="bi bi-check-circle text-brand-orange me-2"></i>
                                <strong>La frecuencia de uso: </strong> para
                                trabajos ocasionales puede bastar una
                                herramienta más sencilla, mientras que un uso
                                frecuente puede requerir un equipo más robusto.
                            </li>
                            <li className="list-group-item border-0 ps-0">
                                <i className="bi bi-check-circle text-brand-orange me-2"></i>
                                <strong>Las brocas y accesorios: </strong>{" "}
                                utiliza siempre accesorios compatibles con la
                                herramienta y adecuados para el material que vas
                                a trabajar.
                            </li>
                        </ul>

                        <div className="p-4 mt-5 bg-light border-start border-4 border-warning rounded">
                            <h5 className="fw-bold text-brand-dark">
                                <i className="bi bi-exclamation-triangle-fill text-warning me-2"></i>{" "}
                                Importante
                            </h5>
                            <p className="mb-0 small">
                                Antes de perforar, comprueba qué material vas a
                                trabajar y selecciona una broca apropiada. Evita
                                forzar la herramienta y utiliza los elementos de
                                protección necesarios para el trabajo que estés
                                realizando.
                            </p>
                        </div>
                    </div>
                </article>
            </div>
        </main>
    );
};

export default ConsejoTaladro;
