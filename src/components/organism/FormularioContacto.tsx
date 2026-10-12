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

    // 3. Estado para saber si el formulario se envió con éxito
    const [enviado, setEnviado] = useState(false);

    // Función que se ejecuta al enviar el formulario
    const handleSubmit = (e: React.FormEvent) => {
        // e.preventDefault() evita que la página recargue, clave en React
        e.preventDefault();

        // Reseteamos errores previos
        let nuevosErrores = { nombre: "", correo: "", mensaje: "" };
        let hayErrores = false;

        // Validaciones manuales
        if (nombre.trim() === "") {
            nuevosErrores.nombre = "El nombre es obligatorio.";
            hayErrores = true;
        } else if (nombre.length > 100) {
            nuevosErrores.nombre =
                "El nombre no puede superar los 100 caracteres.";
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

        // Si pasa las validaciones, simulamos el envío exitoso
        setErrores({ nombre: "", correo: "", mensaje: "" });
        setEnviado(true);

        // Aquí limpiaríamos el formulario (opcional)
        setNombre("");
        setCorreo("");
        setMensaje("");

        // Ocultar mensaje de éxito después de 3 segundos
        setTimeout(() => setEnviado(false), 3000);
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
                                {/* Usamos template strings para agregar la clase is-invalid si hay error */}
                                <input
                                    type="text"
                                    className={`form-control ${errores.nombre ? "is-invalid" : ""}`}
                                    id="nombre"
                                    placeholder="Tu nombre completo"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                />
                                {/* Este div solo se muestra si hay un error en el nombre */}
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
                            >
                                Enviar Mensaje
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FormularioContacto;
