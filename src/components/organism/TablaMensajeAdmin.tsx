import { useEffect, useState } from "react";

export interface Contacto {
    id: number;
    nombreCompleto: string;
    correo: string;
    mensaje: string;
    estado: string;
    fechaCreacion: string;
}

const TablaMensajesAdmin = () => {
    const [mensajes, setMensajes] = useState<Contacto[]>([]);
    const [cargando, setCargando] = useState(true);

    const cargarMensajes = async () => {
        try {
            setCargando(true);
            const respuesta = await fetch(
                "http://localhost:8082/api/contactos",
            );
            if (!respuesta.ok) {
                throw new Error("Error al consultar los mensajes");
            }
            const datos = await respuesta.json();
            setMensajes(datos);
        } catch (error) {
            console.error(error);
            alert("No se pudieron cargar los mensajes desde el servidor.");
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        cargarMensajes();
    }, []);

    // PUT: Cambiar estado de PENDIENTE a ATENDIDO
    const handleMarcarAtendido = async (id: number) => {
        try {
            const respuesta = await fetch(
                `http://localhost:8082/api/contactos/${id}`,
                {
                    method: "PUT",
                },
            );

            if (!respuesta.ok) {
                throw new Error("Error al actualizar el estado");
            }

            cargarMensajes();
        } catch (error) {
            console.error(error);
            alert("No se pudo marcar el mensaje como atendido.");
        }
    };

    // DELETE: Eliminar con confirmación previa
    const handleEliminar = async (id: number) => {
        const confirmar = window.confirm(
            "¿Estás seguro de que deseas eliminar este mensaje permanentemente?",
        );
        if (!confirmar) return;

        try {
            const respuesta = await fetch(
                `http://localhost:8082/api/contactos/${id}`,
                {
                    method: "DELETE",
                },
            );

            if (!respuesta.ok) {
                throw new Error("Error al eliminar el mensaje");
            }

            cargarMensajes();
        } catch (error) {
            console.error(error);
            alert("No se pudo eliminar el mensaje.");
        }
    };

    return (
        <div className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="fw-bold mb-0">Mensajes de Contacto</h4>
                <button
                    className="btn btn-sm btn-outline-secondary fw-bold"
                    onClick={cargarMensajes}
                >
                    Actualizar lista
                </button>
            </div>

            <div className="table-responsive bg-white rounded shadow-sm border">
                <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                        <tr>
                            <th>ID</th>
                            <th>Cliente / Correo</th>
                            <th>Mensaje</th>
                            <th>Fecha</th>
                            <th>Estado</th>
                            <th className="text-end">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cargando ? (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="text-center py-4 text-muted"
                                >
                                    Cargando mensajes...
                                </td>
                            </tr>
                        ) : mensajes.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="text-center py-4 text-muted"
                                >
                                    No hay mensajes registrados en la base de
                                    datos.
                                </td>
                            </tr>
                        ) : (
                            mensajes.map((item) => (
                                <tr key={item.id}>
                                    <td className="text-muted">#{item.id}</td>
                                    <td>
                                        <div className="fw-bold">
                                            {item.nombreCompleto}
                                        </div>
                                        <small className="text-muted">
                                            {item.correo}
                                        </small>
                                    </td>
                                    <td style={{ maxWidth: "320px" }}>
                                        {item.mensaje}
                                    </td>
                                    <td>
                                        <small className="text-muted">
                                            {item.fechaCreacion
                                                ? new Date(
                                                      item.fechaCreacion,
                                                  ).toLocaleString("es-CL")
                                                : "-"}
                                        </small>
                                    </td>
                                    <td>
                                        <span
                                            className={`badge rounded-pill ${
                                                item.estado === "ATENDIDO"
                                                    ? "bg-success"
                                                    : "bg-warning text-dark"
                                            }`}
                                        >
                                            {item.estado}
                                        </span>
                                    </td>
                                    <td className="text-end">
                                        <div className="d-inline-flex gap-2">
                                            {item.estado !== "ATENDIDO" && (
                                                <button
                                                    className="btn btn-sm btn-outline-success"
                                                    title="Marcar como Atendido"
                                                    onClick={() =>
                                                        handleMarcarAtendido(
                                                            item.id,
                                                        )
                                                    }
                                                >
                                                    ✓
                                                </button>
                                            )}
                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                title="Eliminar mensaje"
                                                onClick={() =>
                                                    handleEliminar(item.id)
                                                }
                                            >
                                                🗑
                                            </button>
                                        </div>
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

export default TablaMensajesAdmin;
