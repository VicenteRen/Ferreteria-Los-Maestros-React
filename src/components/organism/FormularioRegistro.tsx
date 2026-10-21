
import { useState } from "react";
import CampoFormulario from "../molecules/CampoFormulario";
import { regiones } from "../../data/regiones";
import { validarRun } from "../../utils/validarRun";

const FormularioRegistro = () => {
  // ESTADOS DE DATOS PERSONALES
  const [run, setRun] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");

  // ESTADOS DE DATOS DE ACCESO
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("");

  // ESTADOS DE UBICACIÓN
  const [region, setRegion] = useState("");
  const [comuna, setComuna] = useState("");
  const [direccion, setDireccion] = useState("");

  // LÍMITES PARA LA FECHA DE NACIMIENTO
  const hoy = new Date();

  const fechaMaxima = [
    hoy.getFullYear(),
    String(hoy.getMonth() + 1).padStart(2, "0"),
    String(hoy.getDate()).padStart(2, "0"),
  ].join("-");

  const fechaMinima = [
    hoy.getFullYear() - 120,
    String(hoy.getMonth() + 1).padStart(2, "0"),
    String(hoy.getDate()).padStart(2, "0"),
  ].join("-");

  // ESTADO DE ERRORES
  const [errores, setErrores] = useState({
    run: "",
    nombre: "",
    apellidos: "",
    fechaNacimiento: "",
    correo: "",
    contrasena: "",
    confirmarContrasena: "",
    tipoUsuario: "",
    region: "",
    comuna: "",
    direccion: "",
  });

  // VALIDACIÓN DEL RUN MIENTRAS SE ESCRIBE
  const handleRunChange = (valor: string) => {
    setRun(valor);

    let error = "";

    if (valor.trim() !== "" && !validarRun(valor)) {
      error = "Ingresa un RUN válido.";
    }

    setErrores((anterior) => ({
      ...anterior,
      run: error,
    }));
  };

  // VALIDACIÓN DEL NOMBRE MIENTRAS SE ESCRIBE
  const handleNombreChange = (valor: string) => {
    setNombre(valor);

    let error = "";

    if (valor.length > 50) {
      error = "El nombre no puede superar los 50 caracteres.";
    }

    setErrores((anterior) => ({
      ...anterior,
      nombre: error,
    }));
  };

  // VALIDACIÓN DE APELLIDOS MIENTRAS SE ESCRIBE
  const handleApellidosChange = (valor: string) => {
    setApellidos(valor);

    let error = "";

    if (valor.length > 100) {
      error = "Los apellidos no pueden superar los 100 caracteres.";
    }

    setErrores((anterior) => ({
      ...anterior,
      apellidos: error,
    }));
  };

  // CAMBIAR REGIÓN Y LIMPIAR COMUNA
  const handleRegionChange = (nuevaRegion: string) => {
    setRegion(nuevaRegion);
    setComuna("");

    setErrores((anterior) => ({
      ...anterior,
      region: "",
      comuna: "",
    }));
  };

  // COMUNAS DE LA REGIÓN SELECCIONADA
  const comunasDisponibles =
    regiones.find((item) => item.nombre === region)?.comunas ?? [];

  // VALIDAR TODO AL ENVIAR EL FORMULARIO
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nuevosErrores = {
      run: "",
      nombre: "",
      apellidos: "",
      fechaNacimiento: "",
      correo: "",
      contrasena: "",
      confirmarContrasena: "",
      tipoUsuario: "",
      region: "",
      comuna: "",
      direccion: "",
    };

    // DATOS PERSONALES
    if (run.trim() === "") {
      nuevosErrores.run = "El RUN es obligatorio.";
    } else if (!validarRun(run)) {
      nuevosErrores.run = "Ingresa un RUN válido.";
    }

    if (nombre.trim() === "") {
      nuevosErrores.nombre = "El nombre es obligatorio.";
    } else if (nombre.trim().length > 50) {
      nuevosErrores.nombre =
        "El nombre no puede superar los 50 caracteres.";
    }

    if (apellidos.trim() === "") {
      nuevosErrores.apellidos = "Los apellidos son obligatorios.";
    } else if (apellidos.trim().length > 100) {
      nuevosErrores.apellidos =
        "Los apellidos no pueden superar los 100 caracteres.";
    }

    if (
      fechaNacimiento !== "" &&
      (fechaNacimiento < fechaMinima || fechaNacimiento > fechaMaxima)
    ) {
      nuevosErrores.fechaNacimiento =
        "La fecha de nacimiento debe estar entre los últimos 120 años y hoy.";
    }

    // DATOS DE ACCESO
    if (correo.trim() === "") {
      nuevosErrores.correo = "El correo electrónico es obligatorio.";
    } else if (correo.length > 100) {
      nuevosErrores.correo =
        "El correo no puede superar los 100 caracteres.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim())) {
      nuevosErrores.correo = "Ingresa un correo electrónico válido.";
    }

    if (contrasena === "") {
      nuevosErrores.contrasena = "La contraseña es obligatoria.";
    } else if (contrasena.length < 4 || contrasena.length > 10) {
      nuevosErrores.contrasena =
        "La contraseña debe tener entre 4 y 10 caracteres.";
    }

    if (confirmarContrasena === "") {
      nuevosErrores.confirmarContrasena =
        "Debes confirmar tu contraseña.";
    } else if (confirmarContrasena !== contrasena) {
      nuevosErrores.confirmarContrasena =
        "Las contraseñas no coinciden.";
    }

    if (tipoUsuario === "") {
      nuevosErrores.tipoUsuario = "Selecciona un tipo de usuario.";
    }

    // UBICACIÓN
    if (region === "") {
      nuevosErrores.region = "Selecciona una región.";
    } else if (!regiones.some((item) => item.nombre === region)) {
      nuevosErrores.region = "Selecciona una región válida.";
    }

    if (comuna === "") {
      nuevosErrores.comuna = "Selecciona una comuna.";
    } else if (!comunasDisponibles.includes(comuna)) {
      nuevosErrores.comuna = "Selecciona una comuna válida.";
    }

    if (direccion.trim() === "") {
      nuevosErrores.direccion = "La dirección es obligatoria.";
    } else if (direccion.length > 300) {
      nuevosErrores.direccion =
        "La dirección no puede superar los 300 caracteres.";
    }

    // MOSTRAR ERRORES
    setErrores(nuevosErrores);

    // DETENER EL ENVÍO SI EXISTE ALGÚN ERROR
    if (Object.values(nuevosErrores).some((error) => error !== "")) {
      return;
    }

    // Pendiente: verificar RUN/correo duplicados y guardar al usuario.
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* DATOS PERSONALES */}
      <section className="bg-white border p-4 mb-4">
        <h2 className="fs-4 fw-bold mb-4">
          DATOS PERSONALES
        </h2>

        <CampoFormulario
          id="run"
          etiqueta="RUN *"
          valor={run}
          placeholder="21054321K"
          onChange={handleRunChange}
          error={errores.run}
        />

        <p className="text-secondary small">
          Ingresa el RUN sin puntos ni guión.
        </p>

        <div className="row">
          <div className="col-md-6">
            <CampoFormulario
              id="nombre"
              etiqueta="NOMBRE *"
              valor={nombre}
              onChange={handleNombreChange}
              error={errores.nombre}
            />
          </div>

          <div className="col-md-6">
            <CampoFormulario
              id="apellidos"
              etiqueta="APELLIDOS *"
              valor={apellidos}
              onChange={handleApellidosChange}
              error={errores.apellidos}
            />
          </div>
        </div>

        <CampoFormulario
          id="fechaNacimiento"
          etiqueta="FECHA DE NACIMIENTO (OPCIONAL)"
          tipo="date"
          valor={fechaNacimiento}
          onChange={setFechaNacimiento}
          error={errores.fechaNacimiento}
          min={fechaMinima}
          max={fechaMaxima}
        />
      </section>

      {/* DATOS DE ACCESO */}
      <section className="bg-white border p-4 mb-4">
        <h2 className="fs-4 fw-bold mb-4">
          DATOS DE ACCESO
        </h2>

        <CampoFormulario
          id="correoRegistro"
          etiqueta="CORREO ELECTRÓNICO *"
          tipo="email"
          valor={correo}
          placeholder="correo@ejemplo.cl"
          onChange={setCorreo}
          icono="envelope"
          error={errores.correo}
        />

        <div className="row">
          <div className="col-md-6">
            <CampoFormulario
              id="contrasenaRegistro"
              etiqueta="CONTRASEÑA *"
              tipo="password"
              valor={contrasena}
              onChange={setContrasena}
              icono="lock"
              error={errores.contrasena}
            />

            <p className="small text-secondary">
              Debe contener entre 4 y 10 caracteres.
            </p>
          </div>

          <div className="col-md-6">
            <CampoFormulario
              id="confirmarContrasena"
              etiqueta="CONFIRMAR CONTRASEÑA *"
              tipo="password"
              valor={confirmarContrasena}
              onChange={setConfirmarContrasena}
              icono="lock-fill"
              error={errores.confirmarContrasena}
            />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="tipoUsuario" className="form-label">
            TIPO DE USUARIO *
          </label>

          <select
            id="tipoUsuario"
            className={`form-select ${
              errores.tipoUsuario ? "is-invalid" : ""
            }`}
            value={tipoUsuario}
            onChange={(e) => setTipoUsuario(e.target.value)}
          >
            <option value="">Selecciona un tipo de usuario</option>
            <option value="cliente">Cliente</option>
            <option value="vendedor">Vendedor</option>
          </select>

          {errores.tipoUsuario && (
            <div className="invalid-feedback d-block">
              {errores.tipoUsuario}
            </div>
          )}

          <div className="form-text">
            Los administradores se gestionan desde el área administrativa.
          </div>
        </div>
      </section>

      {/* UBICACIÓN */}
      <section className="bg-white border p-4 mb-4">
        <h2 className="fs-4 fw-bold mb-4">
          UBICACIÓN
        </h2>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="region" className="form-label">
              REGIÓN *
            </label>

            <select
              id="region"
              className={`form-select ${
                errores.region ? "is-invalid" : ""
              }`}
              value={region}
              onChange={(e) => handleRegionChange(e.target.value)}
            >
              <option value="">Selecciona una región</option>

              {regiones.map((item) => (
                <option key={item.nombre} value={item.nombre}>
                  {item.nombre}
                </option>
              ))}
            </select>

            {errores.region && (
              <div className="invalid-feedback d-block">
                {errores.region}
              </div>
            )}
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="comuna" className="form-label">
              COMUNA *
            </label>

            <select
              id="comuna"
              className={`form-select ${
                errores.comuna ? "is-invalid" : ""
              }`}
              value={comuna}
              onChange={(e) => setComuna(e.target.value)}
              disabled={!region}
            >
              <option value="">
                {region
                  ? "Selecciona una comuna"
                  : "Selecciona primero una región"}
              </option>

              {comunasDisponibles.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            {errores.comuna && (
              <div className="invalid-feedback d-block">
                {errores.comuna}
              </div>
            )}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="direccion" className="form-label">
            DIRECCIÓN *
          </label>

          <textarea
            id="direccion"
            className={`form-control ${
              errores.direccion ? "is-invalid" : ""
            }`}
            rows={3}
            maxLength={300}
            value={direccion}
            placeholder="Ej: Avenida Los Maestros 123"
            onChange={(e) => setDireccion(e.target.value)}
          />

          {errores.direccion && (
            <div className="invalid-feedback d-block">
              {errores.direccion}
            </div>
          )}

          <div className="text-end small text-secondary mt-1">
            {direccion.length} / 300 caracteres
          </div>
        </div>
      </section>

      <button type="submit" className="btn btn-orange w-100">
        CREAR CUENTA
      </button>
    </form>
  );
};

export default FormularioRegistro;
