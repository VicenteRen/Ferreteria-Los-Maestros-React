import { useState, useContext } from "react";
import { obtenerUsuarios } from "../services/usuarioService";
import { Link, useNavigate } from "react-router-dom";
import Boton from "../components/atoms/Boton";
import FormularioEnvio from "../components/organism/FormularioEnvio";
import FormularioPago from "../components/organism/FormularioPago";
import { regiones } from "../data/regiones";
import { CarritoContext } from "../context/CarritoContext";


const Checkout = () => {
    const navigate = useNavigate();
    const { carrito, totalPrecio, procesarCompra } = useContext(CarritoContext);

    // Estados Centralizados
    const [formData, setFormData] = useState(() => {
    const formularioVacio = {
        nombre: "",
        apellidos: "",
        correo: "",
        direccion: "",
        region: "",
        comuna: "",
        nombreTarjeta: "",
        numeroTarjeta: "",
        vencimiento: "",
        cvv: "",
    };
    const sesionGuardada =
        localStorage.getItem("usuarioSesion") ||
        sessionStorage.getItem("usuarioSesion");
    
    if (!sesionGuardada) return formularioVacio;

    try {
        const sesion = JSON.parse(sesionGuardada);

        if (sesion.rol !== "cliente") return formularioVacio;

        const usuario = obtenerUsuarios().find(
            (u) => u.correo.toLowerCase() === sesion.correo?.toLowerCase()
        );

        if (!usuario) return formularioVacio;

        return {
            ...formularioVacio,
            nombre: usuario.nombre || "",
            apellidos: usuario.apellidos || "",
            correo: usuario.correo,
            direccion: usuario.direccion || "",
            region: usuario.region || "",
            comuna: usuario.comuna || "",
        };
        } catch {
        return formularioVacio;
        }
    });


    const [errores, setErrores] = useState({
        nombre: "",
        apellidos: "",
        correo: "",
        direccion: "",
        region: "",
        comuna: "",
        nombreTarjeta: "",
        numeroTarjeta: "",
        vencimiento: "",
        cvv: "",
    });

    const [comunasDisponibles, setComunasDisponibles] = useState<string[]>(() => {
        const regionEncontrada = regiones.find(
            (region) => region.nombre === formData.region
        );

        return regionEncontrada?.comunas || [];
    });

    // Funciones manejadoras
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
        setErrores({ ...errores, [e.target.id]: "" });
    };

    const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const nombreRegion = e.target.value;
        setFormData({ ...formData, region: nombreRegion, comuna: "" });
        setErrores({ ...errores, region: "", comuna: "" });

        const regionEncontrada = regiones.find(
            (r) => r.nombre === nombreRegion,
        );
        setComunasDisponibles(regionEncontrada ? regionEncontrada.comunas : []);
    };

    const handleComunaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({ ...formData, comuna: e.target.value });
        setErrores({ ...errores, comuna: "" });
    };

    // Validación y Envío
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        let nuevosErrores = { ...errores };
        let hayErrores = false;

        if (formData.nombre.trim() === "") {
            nuevosErrores.nombre = "El nombre es obligatorio";
            hayErrores = true;
        }
        if (formData.apellidos.trim() === "") {
            nuevosErrores.apellidos = "Los apellidos son obligatorios";
            hayErrores = true;
        }
        if (formData.direccion.trim() === "") {
            nuevosErrores.direccion = "La dirección es obligatoria";
            hayErrores = true;
        }
        if (formData.region === "") {
            nuevosErrores.region = "Selecciona una región";
            hayErrores = true;
        }
        if (formData.comuna === "") {
            nuevosErrores.comuna = "Selecciona una comuna";
            hayErrores = true;
        }

        const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.correo.trim() === "") {
            nuevosErrores.correo = "El correo es obligatorio";
            hayErrores = true;
        } else if (!formatoCorreo.test(formData.correo)) {
            nuevosErrores.correo = "Formato inválido";
            hayErrores = true;
        }

        if (formData.nombreTarjeta.trim() === "") {
            nuevosErrores.nombreTarjeta = "Obligatorio";
            hayErrores = true;
        }
        if (!/^[0-9]{16}$/.test(formData.numeroTarjeta)) {
            nuevosErrores.numeroTarjeta = "16 dígitos numéricos";
            hayErrores = true;
        }
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.vencimiento)) {
            nuevosErrores.vencimiento = "Formato MM/YY";
            hayErrores = true;
        }
        if (!/^[0-9]{3}$/.test(formData.cvv)) {
            nuevosErrores.cvv = "3 dígitos";
            hayErrores = true;
        }

        if (hayErrores) {
            setErrores(nuevosErrores);
            return;
        }

        alert(
            `¡Pago procesado con éxito!\n\nMuchas gracias por tu compra, ${formData.nombre}.\nHemos enviado el comprobante a tu correo.`,
        );
        procesarCompra();
        navigate("/");
    };

    return (
        <main className="container py-5 my-4 flex-grow-1">
            <div className="text-center mb-5">
                <h2 className="fw-bold text-brand-dark">Finalizar Compra</h2>
                <p className="lead text-muted">
                    Completa tus datos para confirmar el pedido y procesar el
                    pago.
                </p>
            </div>

            <div className="row g-5">
                {/* Resumen del Carrito */}
                <div className="col-md-5 col-lg-4 order-md-last">
                    <h4 className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-brand-orange fw-bold">
                            Tu carrito
                        </span>
                        <span className="badge bg-brand-orange rounded-pill">
                            {carrito.length}
                        </span>
                    </h4>

                    <ul className="list-group mb-3 shadow-sm">
                        {carrito.length === 0 ? (
                            <li className="list-group-item text-muted text-center py-4">
                                <small>Tu carrito está vacío.</small>
                            </li>
                        ) : (
                            carrito.map((item) => (
                                <li
                                    className="list-group-item d-flex justify-content-between lh-sm"
                                    key={item.id}
                                >
                                    <div>
                                        <h6 className="my-0 fw-bold">
                                            {item.nombre}
                                        </h6>
                                        <small className="text-muted">
                                            Cantidad: {item.cantidad}
                                        </small>
                                    </div>
                                    <span className="text-muted fw-bold">
                                        $
                                        {(
                                            item.precio * item.cantidad
                                        ).toLocaleString("es-CL")}
                                    </span>
                                </li>
                            ))
                        )}
                    </ul>

                    <div className="d-flex justify-content-between p-3 bg-white border rounded shadow-sm">
                        <span className="fw-bold">Total (CLP)</span>
                        <strong className="text-brand-dark fs-5">
                            ${totalPrecio.toLocaleString("es-CL")}
                        </strong>
                    </div>

                    <div className="mt-3 text-center">
                        <Link
                            to="/catalogo"
                            className="text-decoration-none text-brand-orange"
                        >
                            &larr; Volver a comprar
                        </Link>
                    </div>
                </div>

                {/* Formulario Principal */}
                <div className="col-md-7 col-lg-8">
                    <form
                        className="bg-white p-4 rounded shadow-sm border"
                        onSubmit={handleSubmit}
                        noValidate
                    >
                        {/* 1. Pasamos los datos al Organismo de Envío */}
                        <FormularioEnvio
                            formData={formData}
                            errores={errores}
                            handleChange={handleChange}
                            handleRegionChange={handleRegionChange}
                            handleComunaChange={handleComunaChange}
                            comunasDisponibles={comunasDisponibles}
                        />

                        <hr className="my-4" />

                        {/* 2. Pasamos los datos al Organismo de Pago */}
                        <FormularioPago
                            formData={formData}
                            errores={errores}
                            handleChange={handleChange}
                        />

                        <hr className="my-4" />

                        <Boton
                            texto="Confirmar y Pagar"
                            tipo="submit"
                            variante="btn-success"
                            clasesAdicionales="w-100 btn-lg fw-bold"
                            deshabilitado={carrito.length === 0}
                        />
                    </form>
                </div>
            </div>
        </main>
    );
};

export default Checkout;
