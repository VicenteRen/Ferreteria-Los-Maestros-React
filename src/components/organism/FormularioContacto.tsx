import { useState } from "react";

const FormularioContacto = () => {
    // 1. Estados para guardar lo que el usuario escribe
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [mensaje, setMensaje] = useState("");

    // 2. Estado para guardar los errores si algo falta o está mal
    const [errores, setErrores] = useState({
        nombre: "",
        correo: "",
        mensaje: "",
    });

    // 3. Estado para saber si el formulario se envió con éxito (muestra la alerta verde)
    const [enviado, setEnviado] = useState(false);

    // 4. Estado para indicar que la petición está en curso y bloquear el botón
    const [enviando, setEnviando] = useState(false);

    // Bloquea números mientras el usuario escribe en el campo Nombre
    const handleNombreChange = (valor: string) => {
        const sinNumeros = valor.replace(/\d/g, "");
        setNombre(sinNumeros);

        if (errores.nombre) {
            setErrores((anterior) => ({ ...anterior, nombre: "" }));
        }
    };

    // Función asíncrona que se ejecuta al enviar el formulario
    const handleSubmit = async (e: React.FormEvent) => {
        // e.preventDefault() evita que la página recargue, clave en React
        e.preventDefault();

        // Evita otro envío mientras la petición a Spring Boot está en curso
        if (enviando) return;

        // Reseteamos errores previos
        let nuevosErrores = { nombre: "", correo: "", mensaje: "" };
        let hayErrores = false;

        const formatoNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
        // Validaciones manuales
        if (nombre.trim() === "") {
            nuevosErrores.nombre = "El nombre es obligatorio.";
            hayErrores = true;
        } else if (nombre.length > 100) {
            nuevosErrores.nombre =
                "El nombre no puede superar los 100 caracteres.";
            hayErrores = true;
        } else if (!formatoNombre.test(nombre)) {
            nuevosErrores.nombre = "Solo se admiten letras en este campo.";
            hayErrores = true;
        }

        const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (correo.trim() === "") {
            nuevosErrores.correo = "El correo es obligatorio.";
            hayErrores = true;
        } else if (!formatoCorreo.test(correo) || correo.length > 100) {
            nuevosErrores.correo = "Ingresa un correo electrónico válido.";
            hayErrores = true;
        }

        if (mensaje.trim() === "") {
            nuevosErrores.mensaje = "El mensaje es obligatorio.";
            hayErrores = true;
        } else if (mensaje.length > 500) {
            nuevosErrores.mensaje =
                "El comentario no puede superar los 500 caracteres.";
            hayErrores = true;
        }

        // Si hay errores, actualizamos el estado y detenemos el envío
        if (hayErrores) {
            setErrores(nuevosErrores);
            return;
        }

        // Limpiamos errores previos y bloqueamos el botón antes de llamar al backend
        setErrores({ nombre: "", correo: "", mensaje: "" });
        setEnviando(true);

        try {
            // Envía los datos del formulario al microservicio en Spring Boot
            const respuesta = await fetch(
                "http://localhost:8082/api/contactos",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        nombreCompleto: nombre.trim(),
                        correo: correo.trim(),
                        mensaje: mensaje.trim(),
                    }),
                },
            );

            // Comprueba que el backend haya aceptado la petición (HTTP 200/201)
            if (!respuesta.ok) {
                throw new Error(`Error HTTP ${respuesta.status}`);
            }

            // Si se guardó en MySQL, mostramos la alerta verde y limpiamos los campos
            setEnviado(true);
            setNombre("");
            setCorreo("");
            setMensaje("");

            // Ocultar mensaje de éxito después de 3 segundos
            setTimeout(() => setEnviado(false), 3000);
        } catch (error) {
            console.error("Error al enviar el contacto:", error);
            alert("No se pudo enviar el mensaje. Intente nuevamente.");
        } finally {
            // Finaliza el envío y vuelve a habilitar el botón (haya funcionado o fallado)
            setEnviando(false);
        }
    };

    return (
        <section id="contacto" className="py-5 bg-brand-dark text-white">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h2 className="fw-bold mb-4 text-center">
                            Envíanos un mensaje
                        </h2>

                        {enviado && (
                            <div
                                className="alert alert-success fw-bold text-center"
                                role="alert"
                            >
                                ¡Mensaje enviado con éxito! Nos pondremos en
                                contacto contigo.
                            </div>
                        )}

                        {/* IMPORTANTE: Agregamos noValidate para desactivar los mensajes de Google Chrome */}
                        <form
                            className="bg-white p-4 rounded shadow"
                            onSubmit={handleSubmit}
                            noValidate
                        >
                            <div className="mb-3">
                                <label
                                    htmlFor="nombre"
                                    className="form-label text-dark fw-bold"
                                >
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    className={`form-control ${errores.nombre ? "is-invalid" : ""}`}
                                    id="nombre"
                                    placeholder="Tu nombre completo"
                                    value={nombre}
                                    onChange={(e) =>
                                        handleNombreChange(e.target.value)
                                    }
                                />
                                {errores.nombre && (
                                    <div className="invalid-feedback fw-bold">
                                        {errores.nombre}
                                    </div>
                                )}
                            </div>

                            <div className="mb-3">
                                <label
                                    htmlFor="correo"
                                    className="form-label text-dark fw-bold"
                                >
                                    Correo electrónico
                                </label>
                                <input
                                    type="email"
                                    className={`form-control ${errores.correo ? "is-invalid" : ""}`}
                                    id="correo"
                                    placeholder="correo@ejemplo.com"
                                    value={correo}
                                    onChange={(e) => setCorreo(e.target.value)}
                                />
                                {errores.correo && (
                                    <div className="invalid-feedback fw-bold">
                                        {errores.correo}
                                    </div>
                                )}
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="mensaje"
                                    className="form-label text-dark fw-bold"
                                >
                                    Comentario o mensaje
                                </label>
                                <textarea
                                    className={`form-control ${errores.mensaje ? "is-invalid" : ""}`}
                                    id="mensaje"
                                    rows={4}
                                    placeholder="¿En qué te podemos ayudar?"
                                    value={mensaje}
                                    onChange={(e) => setMensaje(e.target.value)}
                                ></textarea>
                                {errores.mensaje && (
                                    <div className="invalid-feedback fw-bold">
                                        {errores.mensaje}
                                    </div>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="btn btn-orange w-100 fw-bold"
                                disabled={enviando}
                            >
                                {enviando ? "Enviando..." : "Enviar Mensaje"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FormularioContacto;
