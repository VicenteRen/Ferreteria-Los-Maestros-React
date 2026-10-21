
import { useState } from "react";
import CampoFormulario from "../molecules/CampoFormulario";
import Boton from "../atoms/Boton";
import { Link } from "react-router-dom";
import ModalRecuperarContrasena from "./ModalRecuperarContrasena";

const FormularioLogin = () => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mantenerSesion, setMantenerSesion] = useState(false);
  const [errores, setErrores] = useState({
    correo: "",
    contrasena: "",
  });

  
const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
  e.preventDefault();

  const nuevosErrores = {
    correo: "",
    contrasena: "",
  };

  if (correo.trim() === "") {
    nuevosErrores.correo = "El correo electrónico es obligatorio.";
  } else if (correo.trim().length > 100) {
    nuevosErrores.correo = "El correo no puede superar los 100 caracteres.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim())) {
    nuevosErrores.correo = "Ingresa un correo electrónico válido.";
  }

  if (contrasena === "") {
    nuevosErrores.contrasena = "La contraseña es obligatoria.";
  } else if (contrasena.length < 4) {
    nuevosErrores.contrasena = "La contraseña debe tener al menos 4 caracteres.";
  } else if (contrasena.length > 10) {
    nuevosErrores.contrasena = "La contraseña no puede superar los 10 caracteres.";
  }

  setErrores(nuevosErrores);

  if (nuevosErrores.correo || nuevosErrores.contrasena) {
    return;
  }
};


const handleCorreoChange = (valor: string) => {
  setCorreo(valor);

  let error = "";

  if (valor.trim() !== "") {
    if (valor.trim().length > 100) {
      error = "El correo no puede superar los 100 caracteres.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim())) {
      error = "Ingresa un correo electrónico válido.";
    }
  }

  setErrores((anterior) => ({
    ...anterior,
    correo: error,
  }));
};


const handleContrasenaChange = (valor: string) => {
  setContrasena(valor);

  let error = "";

  if (valor !== "") {
    if (valor.length < 4) {
      error = "La contraseña debe tener al menos 4 caracteres.";
    } else if (valor.length > 10) {
      error = "La contraseña no puede superar los 10 caracteres.";
    }
  }

  setErrores((anterior) => ({
    ...anterior,
    contrasena: error,
  }));
};




  return (
    <>
    <form onSubmit={handleSubmit} noValidate>
      <CampoFormulario
        id="correo"
        etiqueta="CORREO ELECTRÓNICO"
        tipo="email"
        valor={correo}
        placeholder="correo@empresa.cl"
        onChange={handleCorreoChange}
        error={errores.correo}
        icono="envelope"
      />

      <CampoFormulario
        id="contrasena"
        etiqueta="CONTRASEÑA"
        tipo="password"
        valor={contrasena}
        placeholder="Contraseña"
        onChange={handleContrasenaChange}
        error={errores.contrasena}
        mostrarRecuperacion
        icono="lock"
      />
      
      <div className="form-check mb-4">
        <input
          className="form-check-input"
          type="checkbox"
          id="mantenerSesion"
          checked={mantenerSesion}
          onChange={(e) => setMantenerSesion(e.target.checked)}
        />

        <label className="form-check-label" htmlFor="mantenerSesion">
          Mantener sesión iniciada
        </label>
      </div>


      <Boton
        texto="INGRESAR"
        tipo="submit"
        clasesAdicionales="w-100"
      />

      
      <div className="d-flex align-items-center gap-3 my-4">
        <hr className="flex-grow-1" />
        <span className="text-secondary">o</span>
        <hr className="flex-grow-1" />
      </div>

      <p className="text-center text-secondary">
        ¿No tienes cuenta?{" "}
        <Link to="/registro" className="fw-bold text-decoration-underline">
          Regístrate
        </Link>
      </p>

      <div className="text-center mt-4">
        <Link to="/" className="text-secondary text-decoration-none">
          ← Volver al sitio principal
        </Link>
      </div>

    </form>

    <ModalRecuperarContrasena />
  </>
  );
};

export default FormularioLogin;