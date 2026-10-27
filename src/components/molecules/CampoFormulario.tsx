import { useState } from "react";
import Input from "../atoms/Input";
import Icono from "../atoms/Icono";

interface CampoFormularioProps {
    id: string;
    etiqueta: string;
    tipo?: string;
    valor: string;
    placeholder?: string;
    error?: string;
    onChange: (valor: string) => void;
    mostrarRecuperacion?: boolean;
    icono?: string;
    min?: string;
    max?: string;
}

const CampoFormulario = ({
    id,
    etiqueta,
    tipo = "text",
    valor,
    placeholder = "",
    error = "",
    onChange,
    mostrarRecuperacion = false,
    icono = "",
    min = "",
    max = "",
}: CampoFormularioProps) => {
    const [mostrarContrasena, setMostrarContrasena] = useState(false);

    const esContrasena = tipo === "password";

    return (
        <div className="mb-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
                <label htmlFor={id} className="form-label mb-0">
                    {etiqueta}
                </label>

                {mostrarRecuperacion && (
                    <button
                        type="button"
                        className="btn btn-link text-decoration-none p-0"
                        style={{ color: "#f45100", fontSize: "14px" }}
                        data-bs-toggle="modal"
                        data-bs-target="#modalRecuperar"
                    >
                        ¿Olvidaste tu contraseña?
                    </button>
                )}
            </div>

            <div className="position-relative">
                {icono && (
                    <Icono
                        nombre={icono}
                        clasesAdicionales="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary"
                    />
                )}

                <Input
                    id={id}
                    tipo={esContrasena && mostrarContrasena ? "text" : tipo}
                    clasesAdicionales={`${error ? "is-invalid" : ""} ${
                        esContrasena ? "campo-contrasena" : ""
                    }`}
                    valor={valor}
                    placeholder={placeholder}
                    onChange={onChange}
                    style={{
                        paddingLeft: icono ? "42px" : undefined,
                        paddingRight: esContrasena ? "65px" : undefined,
                    }}
                    min={min}
                    max={max}
                />

                {esContrasena && (
                    <button
                        type="button"
                        className="btn position-absolute top-50 translate-middle-y end-0 me-3 p-0 border-0"
                        onClick={() => setMostrarContrasena(!mostrarContrasena)}
                        aria-label={
                            mostrarContrasena
                                ? "Ocultar contraseña"
                                : "Mostrar contraseña"
                        }
                    >
                        <Icono
                            nombre={mostrarContrasena ? "eye-slash" : "eye"}
                        />
                    </button>
                )}
            </div>

            {error && <div className="invalid-feedback d-block">{error}</div>}
        </div>
    );
};

export default CampoFormulario;
