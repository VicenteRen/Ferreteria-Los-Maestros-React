import { useContext } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/molecules/ProductCard";
import { CarritoContext } from "../context/CarritoContext";

const Catalogo = () => {
    // En lugar de importar el archivo estático, sacamos el 'inventario' del contexto vivo
    const { inventario } = useContext(CarritoContext);

    return (
        <main className="container py-5 my-5 flex-grow-1">
            <div className="row mb-4 align-items-center">
                <div className="col-md-8">
                    <h1 className="fw-bold text-brand-dark">
                        Nuestro Catálogo
                    </h1>
                    <p className="text-muted">
                        Encuentra las mejores herramientas y materiales para tu
                        proyecto.
                    </p>
                </div>
            </div>

            {/* Iteramos sobre el INVENTARIO vivo, no sobre el archivo base */}
            <div className="row g-4" id="contenedor-catalogo">
                {inventario.map((producto) => (
                    <div className="col-md-3" key={producto.id}>
                        <ProductCard producto={producto} />
                    </div>
                ))}
            </div>

            <div className="text-center mt-5">
                <Link to="/" className="btn btn-outline-dark btn-lg fw-bold">
                    Volver a la página de inicio
                </Link>
            </div>
        </main>
    );
};

export default Catalogo;
