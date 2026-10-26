import { useState, useContext, useEffect } from "react";
import { CarritoContext, type ProductoInventario } from "../../context/CarritoContext";

interface Props {
    productoAEditar: ProductoInventario | null;
    volverATabla: () => void;
}

const FormularioProductoAdmin = ({ productoAEditar, volverATabla }: Props) => {
    const { agregarProductoAdmin, editarProductoAdmin, inventario } = useContext(CarritoContext);

    // --- ESTADOS DEL FORMULARIO ---
    const [codigo, setCodigo] = useState("");
    const [nombre, setNombre] = useState("");
    const [categoria, setCategoria] = useState("");
    const [subcategoria, setSubcategoria] = useState("");
    const [marca, setMarca] = useState("");
    const [precio, setPrecio] = useState("");
    const [stock, setStock] = useState("");
    const [stockMinimo, setStockMinimo] = useState("");
    const [imagen, setImagen] = useState(""); 
    const [descripcion, setDescripcion] = useState("");

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
            setImagen(productoAEditar.imagen || "");
            setDescripcion(productoAEditar.descripcion || "");
        }
    }, [productoAEditar]);

    const handleDescripcionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const valorIngresado = e.target.value;
        if (valorIngresado === "" || /^[a-zA-Z0-9\s.,ñÑáéíóúÁÉÍÓÚüÜ()-]*$/.test(valorIngresado)) {
            setDescripcion(valorIngresado);
        }
    };

    // Función auxiliar para transformar "tExtO eJemPLo" en "Texto ejemplo"
    const formatearTexto = (texto: string) => {
        if (!texto) return "";
        return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // 1. Limpieza y formateo automático de textos
        const codigoLimpio = codigo.trim().toUpperCase();
        const marcaLimpia = marca.trim().toUpperCase(); // Marca siempre en mayúsculas
        const nombreLimpio = formatearTexto(nombre.trim()); // Primera mayúscula, resto minúscula
        const categoriaLimpia = formatearTexto(categoria.trim());
        const subcategoriaLimpia = formatearTexto(subcategoria.trim());
        const imagenLimpia = imagen.trim();
        const descripcionLimpia = descripcion.trim();

        const precioNum = Number(precio);
        const stockNum = Number(stock);
        const stockMinNum = Number(stockMinimo) || 5;

        // 2. Validación de campos vacíos
        if (!codigoLimpio || !nombreLimpio || !precio || !stock || !imagenLimpia || !descripcionLimpia) {
            alert("Por favor llena todos los campos obligatorios (*).");
            return;
        }

        // 3. Validación de Valores Numéricos (Precio >= 1000, Stock > 0)
        if (precioNum < 1000) {
            alert("El precio de venta debe ser de al menos $1000.");
            return;
        }
        if (stockNum <= 0) {
            alert("El stock actual no puede ser 0 ni negativo.");
            return;
        }
        if (stockMinNum < 0) {
            alert("La alerta de stock mínimo no puede ser un número negativo.");
            return;
        }

        // 4. Validación de SKU Duplicado
        if (inventario && inventario.length > 0) {
            const skuDuplicado = inventario.some(
                p => p.codigo.trim().toUpperCase() === codigoLimpio && (!productoAEditar || p.id !== productoAEditar.id)
            );

            if (skuDuplicado) {
                alert(`El código SKU "${codigoLimpio}" ya está en uso por otro producto. Ingresa uno distinto.`);
                return;
            }
        }

        const productoListo: ProductoInventario = {
            id: productoAEditar ? productoAEditar.id : Date.now(), 
            codigo: codigoLimpio,
            categoria: categoriaLimpia,
            subcategoria: subcategoriaLimpia,
            nombre: nombreLimpio,
            marca: marcaLimpia,
            unidad: productoAEditar ? productoAEditar.unidad : "Unidad",
            precioCompra: productoAEditar ? productoAEditar.precioCompra : 0, 
            precio: precioNum,
            stock: stockNum,
            stockMinimo: stockMinNum,
            imagen: imagenLimpia,
            descripcion: descripcionLimpia,
        };

        if (productoAEditar) {
            editarProductoAdmin(productoAEditar.id, productoListo);
            alert("Producto editado con éxito");
        } else {
            agregarProductoAdmin(productoListo);
            alert("Producto agregado con éxito");
        }

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
                <form onSubmit={handleSubmit} noValidate>
                    <div className="row g-3">
                        <div className="col-md-3">
                            <label htmlFor="inputSku" className="form-label fw-bold">Código SKU *</label>
                            <input 
                                id="inputSku"
                                type="text" 
                                className="form-control bg-light text-uppercase" 
                                placeholder="Ej: HE009" 
                                value={codigo} 
                                onChange={(e) => setCodigo(e.target.value.toUpperCase())} 
                                required 
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputNombreProd" className="form-label fw-bold">Nombre del Producto *</label>
                            <input 
                                id="inputNombreProd"
                                type="text" 
                                className="form-control bg-light" 
                                placeholder="Ej: Taladro inalámbrico 20v" 
                                value={nombre} 
                                onChange={(e) => setNombre(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="inputMarca" className="form-label fw-bold">Marca</label>
                            <input 
                                id="inputMarca"
                                type="text" 
                                className="form-control bg-light text-uppercase" 
                                placeholder="Ej: MAKITA" 
                                value={marca} 
                                onChange={(e) => setMarca(e.target.value.toUpperCase())} 
                            />
                        </div>
                        
                        <div className="col-md-6">
                            <label htmlFor="inputCategoria" className="form-label fw-bold">Categoría</label>
                            <input 
                                id="inputCategoria"
                                type="text" 
                                className="form-control bg-light" 
                                placeholder="Ej: Herramientas"
                                value={categoria} 
                                onChange={(e) => setCategoria(e.target.value)} 
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputSubcategoria" className="form-label fw-bold">Subcategoría</label>
                            <input 
                                id="inputSubcategoria"
                                type="text" 
                                className="form-control bg-light" 
                                placeholder="Ej: Eléctricas"
                                value={subcategoria} 
                                onChange={(e) => setSubcategoria(e.target.value)} 
                            />
                        </div>
                        
                        <div className="col-md-4">
                            <label htmlFor="inputPrecio" className="form-label fw-bold text-success">Precio de Venta ($) *</label>
                            <input 
                                id="inputPrecio"
                                type="number" 
                                className="form-control border-success" 
                                placeholder="1000" 
                                value={precio} 
                                onChange={(e) => setPrecio(e.target.value)} 
                                min="1000" 
                                required 
                            />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="inputStock" className="form-label fw-bold text-primary">Stock Actual *</label>
                            <input 
                                id="inputStock"
                                type="number" 
                                className="form-control border-primary" 
                                placeholder="1" 
                                value={stock} 
                                onChange={(e) => setStock(e.target.value)} 
                                min="1" 
                                required 
                            />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="inputStockMin" className="form-label fw-bold text-danger">Alerta de Stock (Mínimo)</label>
                            <input 
                                id="inputStockMin"
                                type="number" 
                                className="form-control border-danger" 
                                placeholder="5" 
                                value={stockMinimo} 
                                onChange={(e) => setStockMinimo(e.target.value)} 
                                min="0" 
                            />
                        </div>

                        <div className="col-md-12">
                            <label htmlFor="inputImagen" className="form-label fw-bold">Ruta de la Imagen *</label>
                            <input 
                                id="inputImagen"
                                type="text" 
                                className="form-control bg-light" 
                                placeholder="Ej: img/prod_nuevo.jpg"
                                value={imagen} 
                                onChange={(e) => setImagen(e.target.value)} 
                                required
                            />
                        </div>

                        <div className="col-md-12">
                            <label htmlFor="inputDescripcion" className="form-label fw-bold">Descripción del Producto *</label>
                            <textarea 
                                id="inputDescripcion"
                                className="form-control bg-light" 
                                rows={3}
                                placeholder="Ingresa una descripción clara..."
                                value={descripcion} 
                                onChange={handleDescripcionChange} 
                                required
                            ></textarea>
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