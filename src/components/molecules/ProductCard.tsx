import Boton from "../atoms/Boton";
import { type ProductoInventario } from "../../context/CarritoContext";

interface ProductCardProps {
    producto: ProductoInventario;
}

const ProductCard = ({ producto }: ProductCardProps) => {
    // Verificamos si el stock del producto es 0 o menor
    const productoAgotado = producto.stock <= 0;

    // Si está agotado, le aplicamos una clase de opacidad para que se vea "apagado"
    const claseAgotado = productoAgotado ? "opacity-50" : "";

    return (
        <div
            className={`card h-100 shadow-sm border-0 product-card ${claseAgotado}`}
        >
            {/* Si está agotado, mostramos una pequeña etiqueta arriba de la imagen */}
            {productoAgotado && (
                <div className="position-absolute top-0 end-0 p-2">
                    <span className="badge bg-danger">Agotado</span>
                </div>
            )}

            <img
                src={`/${producto.imagen}`}
                className="card-img-top img-product-destacados"
                alt={producto.nombre}
            />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold">{producto.nombre}</h5>
                <p className="card-text text-muted mb-2">{producto.marca}</p>
                <h4 className="fw-bold text-brand-orange mt-auto mb-3">
                    ${producto.precio.toLocaleString("es-CL")}
                </h4>

                {/* Si está agotado, el botón se desactiva. Si no, lleva al detalle */}
                {productoAgotado ? (
                    <Boton
                        texto="Agotado"
                        variante="btn-secondary"
                        clasesAdicionales="w-100 mt-auto"
                        deshabilitado={true}
                    />
                ) : (
                    <Boton
                        texto="Ver detalle"
                        esLink={true}
                        ruta={`/detalle/${producto.id}`}
                        clasesAdicionales="w-100 mt-auto"
                    />
                )}
            </div>
        </div>
    );
};

export default ProductCard;
