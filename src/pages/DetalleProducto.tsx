import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Boton from "../components/atoms/Boton";
import { CarritoContext } from "../context/CarritoContext";
import type { ProductoInventario } from "../context/CarritoContext";

const DetalleProducto = () => {
    const { id } = useParams();

    // Extraemos el inventario global desde el contexto
    const { agregarAlCarrito, carrito, inventario } =
        useContext(CarritoContext);

    // Estado local para guardar el producto que estamos mirando
    const [producto, setProducto] = useState<ProductoInventario | null>(null);

    // Buscamos el producto cada vez que cambie el ID o el inventario
    useEffect(() => {
        const prod = inventario.find((p) => p.id === parseInt(id || "0"));
        setProducto(prod || null);
    }, [id, inventario]);

    if (!producto) {
        return (
            <main className="container py-5 my-5 text-center flex-grow-1">
                <h2 className="fw-bold text-danger mb-4">
                    Producto no encontrado
                </h2>
                <Link to="/catalogo" className="btn btn-outline-dark fw-bold">
                    Volver al catálogo
                </Link>
            </main>
        );
    }

    // Buscamos cuántos de este producto ya tenemos en el carrito
    const itemEnCarrito = carrito.find((item) => item.id === producto.id);
    const cantidadLlevamos = itemEnCarrito ? itemEnCarrito.cantidad : 0;

    // ¿Se agotó el stock real del producto en la tienda?
    const productoSinStock = producto.stock <= 0;

    // ¿El usuario ya agregó a su carrito todo el stock disponible de este producto?
    const limiteAlcanzado = cantidadLlevamos >= producto.stock;

    // El botón se desactiva si no hay stock real O si el usuario ya alcanzó el límite
    const botonDeshabilitado = productoSinStock || limiteAlcanzado;

    const handleAgregarCarrito = () => {
        agregarAlCarrito(producto);
    };

    return (
        <main className="container py-5 my-5 flex-grow-1">
            <div className="mb-4">
                <Link
                    to="/catalogo"
                    className="text-decoration-none text-brand-orange fw-bold"
                >
                    &larr; Volver al catálogo
                </Link>
            </div>

            <div className="row bg-white p-4 p-md-5 rounded shadow-sm align-items-center">
                <div className="col-md-6 text-center mb-4 mb-md-0">
                    <img
                        src={`/${producto.imagen}`}
                        alt={producto.nombre}
                        className="img-fluid rounded"
                        style={{ maxHeight: "400px", objectFit: "contain" }}
                    />
                </div>

                <div className="col-md-6">
                    <p className="text-muted text-uppercase fw-bold mb-1">
                        {producto.marca}
                    </p>
                    <h1 className="fw-bold text-brand-dark mb-3">
                        {producto.nombre}
                    </h1>

                    {/* La etiqueta muestra el stock REAL. Si está en 0, dice Agotado. */}
                    <div className="mb-3">
                        <span
                            className={`badge ${productoSinStock ? "bg-danger" : "bg-success"}`}
                        >
                            {productoSinStock
                                ? "Agotado"
                                : `En Stock: ${producto.stock}`}
                        </span>
                    </div>

                    <h2 className="fw-bold text-brand-orange mb-4">
                        ${producto.precio.toLocaleString("es-CL")}
                    </h2>

                    <h5 className="fw-bold mb-2">Descripción del producto</h5>
                    <p className="text-muted mb-4">{producto.descripcion}</p>

                    <Boton
                        texto={
                            botonDeshabilitado
                                ? productoSinStock
                                    ? "Producto Agotado"
                                    : "Límite de stock alcanzado"
                                : "Agregar a mi lista"
                        }
                        variante={
                            botonDeshabilitado
                                ? "btn-secondary"
                                : "btn-brand-dark"
                        }
                        clasesAdicionales="btn-lg w-100 fw-bold"
                        deshabilitado={botonDeshabilitado}
                        onClick={handleAgregarCarrito}
                    />
                </div>
            </div>
        </main>
    );
};

export default DetalleProducto;
