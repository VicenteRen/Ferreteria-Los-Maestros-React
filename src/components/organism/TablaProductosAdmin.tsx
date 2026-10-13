import { useContext } from "react";
// CORRECCIÓN: Agregamos la palabra "type" antes de ProductoInventario
import { CarritoContext, type ProductoInventario } from "../../context/CarritoContext";

// Contrato: Le decimos a la tabla que debe recibir la función onEditar
interface Props {
    onEditar: (producto: ProductoInventario) => void;
}

const TablaProductosAdmin = ({ onEditar }: Props) => {
    const { inventario, eliminarProductoAdmin, sumarStockRapido } = useContext(CarritoContext);

    return (
        <div className="table-responsive bg-white rounded shadow-sm border">
            <table className="table table-hover align-middle mb-0">
                <thead className="bg-light text-dark border-bottom">
                    <tr>
                        <th className="py-3 px-3">Cód.</th>
                        <th className="py-3">Nombre</th>
                        <th className="py-3">Cat. / Subcat.</th>
                        <th className="py-3">Marca</th>
                        <th className="py-3">Precio</th>
                        <th className="py-3">Stock</th>
                        <th className="py-3 text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {inventario.map((producto) => {
                        let claseEtiqueta = "bg-success";
                        let textoStock = "Normal";

                        if (producto.stock <= 0) {
                            claseEtiqueta = "bg-secondary";
                            textoStock = "Sin Stock";
                        } else if (producto.stock <= producto.stockMinimo) {
                            claseEtiqueta = "bg-danger";
                            textoStock = "Crítico";
                        } else if (producto.stock <= producto.stockMinimo + 5) {
                            claseEtiqueta = "bg-warning text-dark";
                            textoStock = "Bajo";
                        }

                        return (
                            <tr key={producto.id}>
                                <td className="px-3 text-muted fw-bold">{producto.codigo}</td>
                                <td className="fw-bold">{producto.nombre}</td>
                                <td>
                                    {producto.categoria}<br />
                                    <small className="text-muted">{producto.subcategoria}</small>
                                </td>
                                <td>{producto.marca}</td>
                                <td className="fw-bold text-dark">
                                    ${producto.precio.toLocaleString("es-CL")}
                                </td>
                                <td>
                                    <span className={`badge ${claseEtiqueta}`}>
                                        {producto.stock} uni. ({textoStock})
                                    </span>
                                </td>
                                <td className="text-center">
                                    <div className="btn-group gap-1">
                                        {/* Botón sumar 10 uni. stock */}
                                        <button 
                                            className="btn btn-sm btn-outline-success"
                                            onClick={() => sumarStockRapido(producto.id)}
                                            title="Sumar 10 unidades al stock">
                                            <i className="bi bi-plus-lg"></i>
                                        </button>
                                        
                                        {/* Botón Editar conectado */}
                                        <button 
                                            className="btn btn-sm btn-outline-primary"
                                            onClick={() => onEditar(producto)}
                                        >
                                            <i className="bi bi-pencil"></i>
                                        </button>
                                        
                                        {/* Botón Eliminar conectado */}
                                        <button 
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => {
                                                if(window.confirm(`¿Seguro que deseas eliminar ${producto.nombre}?`)) {
                                                    eliminarProductoAdmin(producto.id);
                                                }
                                            }}
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default TablaProductosAdmin;