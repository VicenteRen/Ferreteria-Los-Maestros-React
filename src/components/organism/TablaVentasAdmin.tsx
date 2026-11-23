
import { useEffect, useState } from "react";
import {
    listarVentasAPI,
    anularVentaAPI,
    type VentaRegistrada
} from "../../services/pedidoService";

const TablaVentasAdmin = () => {
    const [ventas, setVentas] = useState<VentaRegistrada[]>([]);
    const [cargando, setCargando] = useState(true);
    const [anulando, setAnulando] = useState(false);

    // GET: Obtener todas las ventas
    const cargarVentas = async () => {
        try {
            setCargando(true);

            const datos = await listarVentasAPI();
            setVentas(datos);
        } catch (error) {
            console.error(error);
            alert("No se pudieron cargar las ventas.");
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        cargarVentas();
    }, []);

    // DELETE: Anular una venta con confirmacion
    const handleAnular = async (id: number) => {
        const confirmar = window.confirm(
            "¿Estás seguro de que deseas anular esta venta? " +
            "Los productos serán devueltos al inventario."
        );

        if (!confirmar) return;

        try {
            setAnulando(true);

            await anularVentaAPI(id);

            alert("Venta anulada correctamente.");
            await cargarVentas();
        } catch (error) {
            console.error(error);
            alert("No se pudo anular la venta.");
        } finally {
            setAnulando(false);
        }
    };

    return (
        <div className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="fw-bold mb-0">
                    Gestión de Ventas
                </h4>

                <button
                    className="btn btn-sm btn-outline-secondary fw-bold"
                    onClick={cargarVentas}
                    disabled={cargando || anulando}
                >
                    Actualizar lista
                </button>
            </div>

            <div className="table-responsive bg-white rounded shadow-sm border">
                <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                        <tr>
                            <th>ID</th>
                            <th>Cliente</th>
                            <th>Productos</th>
                            <th>Fecha</th>
                            <th>Total</th>
                            <th>Estado</th>
                            <th className="text-end">Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {cargando ? (
                            <tr>
                                <td colSpan={7} className="text-center py-4">
                                    Cargando ventas...
                                </td>
                            </tr>
                        ) : ventas.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="text-center py-4">
                                    No hay ventas registradas.
                                </td>
                            </tr>
                        ) : (
                            ventas.map((venta) => (
                                <tr key={venta.id}>
                                    <td>#{venta.id}</td>

                                    <td>
                                        <div className="fw-bold">
                                            {venta.nombreCliente} {venta.apellidosCliente}
                                        </div>
                                        <small className="text-muted">
                                            {venta.correoCliente}
                                        </small>
                                    </td>

                                    <td>
                                        {venta.productos.map((producto) => (
                                            <div key={producto.productoId}>
                                                {producto.nombreProducto} x{producto.cantidad}
                                            </div>
                                        ))}
                                    </td>

                                    <td>
                                        {new Date(venta.fechaPedido).toLocaleString("es-CL")}
                                    </td>

                                    <td className="fw-bold">
                                        ${Number(venta.total).toLocaleString("es-CL")}
                                    </td>

                                    <td>
                                        <span
                                            className={
                                                venta.estado === "CONFIRMADO"
                                                    ? "badge bg-success"
                                                    : "badge bg-secondary"
                                            }
                                        >
                                            {venta.estado}
                                        </span>
                                    </td>

                                    <td className="text-end">
                                        {venta.estado === "CONFIRMADO" ? (
                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                disabled={anulando}
                                                onClick={() => handleAnular(venta.id)}
                                            >
                                                Anular venta
                                            </button>
                                        ) : (
                                            <span className="text-muted">
                                                Venta anulada
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TablaVentasAdmin;
