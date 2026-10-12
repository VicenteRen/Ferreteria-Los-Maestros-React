import Boton from "../atoms/Boton"; // 1. Importa el átomo arriba

const Hero = () => {
    return (
        <section
            id="inicio"
            className="hero-section text-center text-white vh-100 d-flex align-items-center"
        >
            <div className="container">
                <h1 className="display-4 fw-bold mb-3">
                    Todo lo que necesitas para construir
                </h1>
                <p className="lead mb-4">
                    Más de 5,000 productos en herramientas y materiales con
                    atención personalizada.
                </p>

                {/* Atomo del boton */}
                <Boton
                    texto="Ver Catálogo"
                    esLink={true}
                    ruta="/catalogo"
                    clasesAdicionales="btn-lg"
                />
            </div>
        </section>
    );
};

export default Hero;
