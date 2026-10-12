import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CarritoContext } from "../../context/CarritoContext";
import Boton from "../atoms/Boton";

// Agregamos esta declaración para evitar errores de TypeScript con Bootstrap global
declare global {
    interface Window {
        bootstrap: any;
    }
}

const CarritoOffcanvas = () => {
    const {
        carrito,
        eliminarDelCarrito,
        vaciarCarrito,
        totalArticulos,
        totalPrecio,
    } = useContext(CarritoContext);
    const navigate = useNavigate();

    const handleIrAPagar = () => {
        // Obtenemos el elemento offcanvas de Bootstrap usando su ID
        const offcanvasElement = document.getElementById("carritoOffcanvas");

        // Si existe, usamos la API de Bootstrap para ocultarlo
        if (offcanvasElement && window.bootstrap) {
            const bsOffcanvas =
                window.bootstrap.Offcanvas.getInstance(offcanvasElement);
            if (bsOffcanvas) {
                bsOffcanvas.hide();
            }
        }

        // Navegamos al checkout
        navigate("/checkout");
    };

    return (
        <div
            className="offcanvas offcanvas-end"
            tabIndex={-1}
            id="carritoOffcanvas"
            aria-labelledby="carritoOffcanvasLabel"
        >
            <div className="offcanvas-header bg-brand-dark text-white">
                <h5
                    className="offcanvas-title fw-bold d-flex align-items-center"
                    id="carritoOffcanvasLabel"
                >
                    Mi Lista de Productos
                    <span className="badge bg-secondary ms-2">
                        {totalArticulos}
                    </span>
                </h5>
                <button
                    type="button"
                    className="btn-close btn-close-white"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                ></button>
            </div>

            <div className="offcanvas-body d-flex flex-column">
                <div className="flex-grow-1 overflow-auto">
                    {carrito.length === 0 ? (
                        <p className="text-muted text-center mt-4">
                            Tu carrito está vacío.
                        </p>
                    ) : (
                        carrito.map((item) => (
                            <div
                                className="card border-0 shadow-sm mb-3"
                                key={item.id}
                            >
                                <div className="card-body d-flex align-items-center">
                                    <img
                                        src={`/${item.imagen}`}
                                        alt={item.nombre}
                                        className="rounded me-3"
                                        style={{
                                            width: "60px",
                                            height: "60px",
                                            objectFit: "cover",
                                        }}
                                    />
                                    <div className="flex-grow-1">
                                        <h6 className="fw-bold mb-1">
                                            {item.nombre}{" "}
                                            <span className="badge bg-secondary ms-1">
                                                x{item.cantidad}
                                            </span>
                                        </h6>
                                        <p className="text-brand-orange fw-bold mb-0">
                                            $
                                            {(
                                                item.precio * item.cantidad
                                            ).toLocaleString("es-CL")}
                                        </p>
                                    </div>
                                    <button
                                        className="btn btn-sm btn-danger ms-2 fw-bold"
                                        onClick={() =>
                                            eliminarDelCarrito(item.id)
                                        }
                                    >
                                        X
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="mt-auto pt-3 border-top">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="fw-bold mb-0">Total:</h5>
                        <h4 className="fw-bold text-brand-orange mb-0">
                            ${totalPrecio.toLocaleString("es-CL")}
                        </h4>
                    </div>

                    <Boton
                        texto="Vaciar Lista"
                        variante="btn-outline-danger"
                        clasesAdicionales="w-100 fw-bold mb-2"
                        onClick={vaciarCarrito}
                        deshabilitado={carrito.length === 0}
                    />

                    <Boton
                        texto="Ir a Pagar"
                        variante="btn-success"
                        clasesAdicionales={`w-100 fw-bold ${carrito.length === 0 ? "disabled" : ""}`}
                        deshabilitado={carrito.length === 0}
                        onClick={handleIrAPagar}
                    />
                </div>
            </div>
        </div>
    );
};

export default CarritoOffcanvas;
