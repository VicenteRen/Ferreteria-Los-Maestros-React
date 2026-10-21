import { useState, useContext, useEffect } from "react";
import { CarritoContext, type ProductoInventario } from "../../context/CarritoContext";

interface Props {
    productoAEditar: ProductoInventario | null;
    volverATabla: () => void;
}

const FormularioProductoAdmin = ({ productoAEditar, volverATabla }: Props) => {
    const { agregarProductoAdmin, editarProductoAdmin } = useContext(CarritoContext);

    // --- ESTADOS DEL FORMULARIO ---
    const [codigo, setCodigo] = useState("");
    const [nombre, setNombre] = useState("");
    const [categoria, setCategoria] = useState("");
    const [subcategoria, setSubcategoria] = useState("");
    const [marca, setMarca] = useState("");
    const [precio, setPrecio] = useState("");
    const [stock, setStock] = useState("");
    const [stockMinimo, setStockMinimo] = useState("");
    const [imagen, setImagen] = useState("img/prod_1_sierra-circular.jpg"); // Imagen por defecto

    // --- EFECTO: Si recibimos un producto para editar, llenamos los campos ---
    useEffect(() => {
        if (productoAEditar) {
            setCodigo(productoAEditar.codigo);
            setNombre(productoAEditar.nombre);
            setCategoria(productoAEditar.categoria);
            setSubcategoria(productoAEditar.subcategoria);
            setMarca(productoAEditar.marca);
            setPrecio(productoAEditar.precio.toString());
            setStock(productoAEditar.stock.toString());
            setStockMinimo(productoAEditar.stockMinimo.toString());
            setImagen(productoAEditar.imagen);
        }
    }, [productoAEditar]);

    // --- FUNCIÓN AL ENVIAR EL FORMULARIO ---
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Evitamos que la página se recargue

        // Validaciones súper básicas
        if (!codigo || !nombre || !precio || !stock) {
            alert("Por favor, llena los campos obligatorios (Código, Nombre, Precio, Stock).");
            return;
        }

        const productoListo: ProductoInventario = {
            id: productoAEditar ? productoAEditar.id : Date.now(), // ID falso para nuevos
            codigo,
            categoria,
            subcategoria,
            nombre,
            marca,
            unidad: "Unidad",
            precioCompra: 0,
            precio: Number(precio),
            stock: Number(stock),
            stockMinimo: Number(stockMinimo) || 5,
            imagen,
            descripcion: "Producto agregado desde el panel",
        };

        if (productoAEditar) {
            editarProductoAdmin(productoAEditar.id, productoListo);
            alert("Producto editado con éxito");
        } else {
            agregarProductoAdmin(productoListo);
            alert("Producto agregado con éxito");
        }

        // Devolvemos al usuario a la vista de la tabla
        volverATabla();
    };

    return (
        <div className="card shadow-sm border-0">
            <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center py-3">
                <h5 className="mb-0 fw-bold">
                    <i className={`bi ${productoAEditar ? "bi-pencil-square" : "bi-plus-circle"} me-2`}></i>
                    {productoAEditar ? "Editar Producto" : "Agregar Nuevo Producto"}
                </h5>
                <button className="btn btn-sm btn-outline-light" onClick={volverATabla}>
                    <i className="bi bi-x-lg"></i> Cerrar
                </button>
            </div>
            
            <div className="card-body p-4 bg-white">
                <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                        <div className="col-md-4">
                            <label className="form-label fw-bold">Código SKU *</label>
                            <input type="text" className="form-control bg-light" placeholder="Ej: HE009" value={codigo} onChange={(e) => setCodigo(e.target.value)} required />
                        </div>
                        <div className="col-md-8">
                            <label className="form-label fw-bold">Nombre del Producto *</label>
                            <input type="text" className="form-control bg-light" placeholder="Ej: Taladro Inalámbrico 20V" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                        </div>
                        
                        <div className="col-md-4">
                            <label className="form-label fw-bold">Categoría</label>
                            <input type="text" className="form-control bg-light" value={categoria} onChange={(e) => setCategoria(e.target.value)} />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label fw-bold">Subcategoría</label>
                            <input type="text" className="form-control bg-light" value={subcategoria} onChange={(e) => setSubcategoria(e.target.value)} />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label fw-bold">Marca</label>
                            <input type="text" className="form-control bg-light" placeholder="Ej: Makita" value={marca} onChange={(e) => setMarca(e.target.value)} />
                        </div>

                        <div className="col-md-4">
                            <label className="form-label fw-bold text-success">Precio de Venta ($) *</label>
                            <input type="number" className="form-control border-success" placeholder="0" value={precio} onChange={(e) => setPrecio(e.target.value)} min="0" required />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label fw-bold text-primary">Stock Actual *</label>
                            <input type="number" className="form-control border-primary" placeholder="0" value={stock} onChange={(e) => setStock(e.target.value)} min="0" required />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label fw-bold text-danger">Alerta de Stock (Mínimo)</label>
                            <input type="number" className="form-control border-danger" placeholder="5" value={stockMinimo} onChange={(e) => setStockMinimo(e.target.value)} min="0" />
                        </div>
                    </div>

                    <hr className="my-4" />
                    
                    <div className="d-flex justify-content-end gap-2">
                        <button type="button" className="btn btn-secondary fw-bold px-4" onClick={volverATabla}>Cancelar</button>
                        <button type="submit" className="btn btn-dark fw-bold px-4">
                            {productoAEditar ? "Guardar Cambios" : "Crear Producto"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormularioProductoAdmin;