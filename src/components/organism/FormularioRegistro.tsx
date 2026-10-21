
import { useState } from "react";
import CampoFormulario from "../molecules/CampoFormulario";
import { regiones } from "../../data/regiones";

const FormularioRegistro = () => {
    const [run, setRun] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState("");
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [confirmarContrasena, setConfirmarContrasena] = useState("");
    const [tipoUsuario, setTipoUsuario] = useState("");
    const [region, setRegion] = useState("");
    const [comuna, setComuna] = useState("");
    const [direccion, setDireccion] = useState("");

    const handleRegionChange = (nuevaRegion: string) => {
        setRegion(nuevaRegion);
        setComuna("");
    };

    const comunasDisponibles =
    regiones.find((item) => item.nombre === region)?.comunas ?? [];

  return (
    <form noValidate>
      <section className="bg-white border p-4 mb-4">
        <h2 className="fs-4 fw-bold mb-4">
          DATOS PERSONALES
        </h2>

        <CampoFormulario
          id="run"
          etiqueta="RUN *"
          valor={run}
          placeholder="21054321K"
          onChange={setRun}
        />

        <p className="text-secondary small">
          Ingresa el RUN sin puntos ni guion.
        </p>

        <div className="row">
          <div className="col-md-6">
            <CampoFormulario
              id="nombre"
              etiqueta="NOMBRE *"
              valor={nombre}
              onChange={setNombre}
            />
          </div>

          <div className="col-md-6">
            <CampoFormulario
              id="apellidos"
              etiqueta="APELLIDOS *"
              valor={apellidos}
              onChange={setApellidos}
            />
          </div>
        </div>

        <CampoFormulario
          id="fechaNacimiento"
          etiqueta="FECHA DE NACIMIENTO (OPCIONAL)"
          tipo="date"
          valor={fechaNacimiento}
          onChange={setFechaNacimiento}
        />
      </section> 

      
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
            />
            </div>
        </div>

        <div className="mb-3">
            <label htmlFor="tipoUsuario" className="form-label">
            TIPO DE USUARIO *
            </label>

            <select
            id="tipoUsuario"
            className="form-select"
            value={tipoUsuario}
            onChange={(e) => setTipoUsuario(e.target.value)}
            >
            <option value="">Selecciona un tipo de usuario</option>
            <option value="cliente">Cliente</option>
            <option value="vendedor">Vendedor</option>
            </select>

            <div className="form-text">
            Los administradores se gestionan desde el área administrativa.
            </div>
        </div>
        </section> 
        
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
                className="form-select"
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
            </div>

            <div className="col-md-6 mb-3">
            <label htmlFor="comuna" className="form-label">
                COMUNA *
            </label>

            <select
                id="comuna"
                className="form-select"
                value={comuna}
                onChange={(e) => setComuna(e.target.value)}
                disabled={!region}
            >
                <option value="">
                {region ? "Selecciona una comuna" : "Selecciona primero una región"}
                </option>

                {comunasDisponibles.map((item) => (
                <option key={item} value={item}>
                    {item}
                </option>
                ))}
            </select>
            </div>
        </div>

        <div className="mb-3">
            <label htmlFor="direccion" className="form-label">
            DIRECCIÓN *
            </label>

            <textarea
            id="direccion"
            className="form-control"
            rows={3}
            maxLength={300}
            value={direccion}
            placeholder="Ej: Avenida Los Maestros 123"
            onChange={(e) => setDireccion(e.target.value)}
            />

            <div className="text-end small text-secondary mt-1">
            {direccion.length} / 300 caracteres
            </div>
        </div>
        </section>

      
    </form>
  );
};

export default FormularioRegistro;
