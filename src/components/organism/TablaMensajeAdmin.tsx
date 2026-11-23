import { Fragment, useEffect, useState } from "react";

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

    // Estados para simular el envío de respuesta
    const [idRespondiendo, setIdRespondiendo] = useState<number | null>(null);
    const [textoRespuesta, setTextoRespuesta] = useState("");
    const [enviandoRespuesta, setEnviandoRespuesta] = useState(false);

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

    // Simular envío de respuesta por correo y marcar automáticamente como ATENDIDO (PUT)
    const handleEnviarRespuesta = async (contacto: Contacto) => {
        if (textoRespuesta.trim() === "") {
            alert("Por favor, escribe una respuesta antes de enviar.");
            return;
        }

        try {
            setEnviandoRespuesta(true);

            // Si aún está PENDIENTE, lo marcamos como ATENDIDO en el backend
            if (contacto.estado !== "ATENDIDO") {
                const respuesta = await fetch(
                    `http://localhost:8082/api/contactos/${contacto.id}`,
                    {
                        method: "PUT",
                    },
                );

                if (!respuesta.ok) {
                    throw new Error(
                        "No se pudo actualizar el estado del mensaje",
                    );
                }
            }

            alert(`¡Mensaje enviado con éxito a ${contacto.correo}!`);
            setIdRespondiendo(null);
            setTextoRespuesta("");
            cargarMensajes();
        } catch (error) {
            console.error(error);
            alert("Ocurrió un error al procesar la respuesta.");
        } finally {
            setEnviandoRespuesta(false);
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

            if (idRespondiendo === id) {
                setIdRespondiendo(null);
                setTextoRespuesta("");
            }

            cargarMensajes();
        } catch (error) {
            console.error(error);
            alert("No se pudo eliminar el mensaje.");
        }
    };

    const abrirCuadroRespuesta = (id: number) => {
        if (idRespondiendo === id) {
            setIdRespondiendo(null);
            setTextoRespuesta("");
        } else {
            setIdRespondiendo(id);
            setTextoRespuesta("");
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
                                <Fragment key={item.id}>
                                    <tr>
                                        <td className="text-muted">
                                            #{item.id}
                                        </td>
                                        <td>
                                            <div className="fw-bold">
                                                {item.nombreCompleto}
                                            </div>
                                            <small className="text-muted">
                                                {item.correo}
                                            </small>
                                        </td>
                                        <td
                                            className="text-break"
                                            style={{
                                                maxWidth: "320px",
                                                wordBreak: "break-word",
                                                overflowWrap: "anywhere",
                                            }}
                                        >
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
                                                <button
                                                    className="btn btn-sm btn-outline-primary"
                                                    title="Responder mensaje"
                                                    onClick={() =>
                                                        abrirCuadroRespuesta(
                                                            item.id,
                                                        )
                                                    }
                                                >
                                                    <i className="bi bi-reply-fill me-1"></i>
                                                    Responder
                                                </button>

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

                                    {/* Fila desplegable para escribir la respuesta simulada */}
                                    {idRespondiendo === item.id && (
                                        <tr className="bg-light">
                                            <td colSpan={6} className="p-3">
                                                <div className="border rounded bg-white p-3 shadow-sm">
                                                    <label className="form-label fw-bold small text-secondary mb-2">
                                                        Responder a{" "}
                                                        {item.nombreCompleto} (
                                                        {item.correo}):
                                                    </label>
                                                    <textarea
                                                        className="form-control mb-2"
                                                        rows={2}
                                                        placeholder="Escribe aquí tu respuesta para el cliente..."
                                                        value={textoRespuesta}
                                                        onChange={(e) =>
                                                            setTextoRespuesta(
                                                                e.target.value,
                                                            )
                                                        }
                                                    />
                                                    <div className="d-flex justify-content-end gap-2">
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-secondary"
                                                            onClick={() => {
                                                                setIdRespondiendo(
                                                                    null,
                                                                );
                                                                setTextoRespuesta(
                                                                    "",
                                                                );
                                                            }}
                                                        >
                                                            Cancelar
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-dark fw-bold"
                                                            disabled={
                                                                enviandoRespuesta
                                                            }
                                                            onClick={() =>
                                                                handleEnviarRespuesta(
                                                                    item,
                                                                )
                                                            }
                                                        >
                                                            {enviandoRespuesta
                                                                ? "Enviando..."
                                                                : "Enviar respuesta"}
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </Fragment>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TablaMensajesAdmin;
