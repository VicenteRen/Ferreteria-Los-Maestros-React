
import { useState } from "react";

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
          <i
            className={`bi bi-${icono} position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary`}
            aria-hidden="true"
          />
        )}

        <input
          id={id}
          type={esContrasena && mostrarContrasena ? "text" : tipo}
          className={`form-control ${error ? "is-invalid" : ""} ${
            esContrasena ? "campo-contrasena" : ""
          }`}
          value={valor}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          style={{
            paddingLeft: icono ? "42px" : undefined,
            paddingRight: esContrasena ? "65px" : undefined,
          }}
        />

        {esContrasena && (
          <button
            type="button"
            className="btn position-absolute top-50 translate-middle-y end-0 me-3 p-0 border-0"
            onClick={() => setMostrarContrasena(!mostrarContrasena)}
            aria-label={
              mostrarContrasena ? "Ocultar contraseña" : "Mostrar contraseña"
            }
          >
            <i
              className={
                mostrarContrasena ? "bi bi-eye-slash" : "bi bi-eye"
              }
            />
          </button>
        )}
      </div>

      {error && (
        <div className="invalid-feedback d-block">
          {error}
        </div>
      )}
    </div>
  );
};

export default CampoFormulario;
