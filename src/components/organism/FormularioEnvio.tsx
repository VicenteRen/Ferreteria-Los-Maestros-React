import { regiones } from "../../data/regiones";

// Definimos qué datos y funciones va a recibir este componente desde afuera
interface FormularioEnvioProps {
    formData: any;
    errores: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleRegionChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleComunaChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    comunasDisponibles: string[];
}

const FormularioEnvio = ({
    formData,
    errores,
    handleChange,
    handleRegionChange,
    handleComunaChange,
    comunasDisponibles,
}: FormularioEnvioProps) => {
    return (
        <section>
            <h4 className="mb-3 fw-bold">Dirección de Envío</h4>
            <div className="row g-3">
                <div className="col-sm-6">
                    <label htmlFor="nombre" className="form-label fw-bold">
                        Nombre
                    </label>
                    <input
                        type="text"
                        className={`form-control ${errores.nombre ? "is-invalid" : ""}`}
                        id="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                    />
                    {errores.nombre && (
                        <div className="invalid-feedback fw-bold">
                            {errores.nombre}
                        </div>
                    )}
                </div>
                <div className="col-sm-6">
                    <label htmlFor="apellidos" className="form-label fw-bold">
                        Apellidos
                    </label>
                    <input
                        type="text"
                        className={`form-control ${errores.apellidos ? "is-invalid" : ""}`}
                        id="apellidos"
                        value={formData.apellidos}
                        onChange={handleChange}
                    />
                    {errores.apellidos && (
                        <div className="invalid-feedback fw-bold">
                            {errores.apellidos}
                        </div>
                    )}
                </div>
                <div className="col-12">
                    <label htmlFor="correo" className="form-label fw-bold">
                        Correo Electrónico
                    </label>
                    <input
                        type="email"
                        className={`form-control ${errores.correo ? "is-invalid" : ""}`}
                        id="correo"
                        placeholder="correo@ejemplo.com"
                        value={formData.correo}
                        onChange={handleChange}
                    />
                    {errores.correo && (
                        <div className="invalid-feedback fw-bold">
                            {errores.correo}
                        </div>
                    )}
                </div>
                <div className="col-12">
                    <label htmlFor="direccion" className="form-label fw-bold">
                        Dirección
                    </label>
                    <input
                        type="text"
                        className={`form-control ${errores.direccion ? "is-invalid" : ""}`}
                        id="direccion"
                        placeholder="Ej: Avenida Los Maestros 123"
                        value={formData.direccion}
                        onChange={handleChange}
                    />
                    {errores.direccion && (
                        <div className="invalid-feedback fw-bold">
                            {errores.direccion}
                        </div>
                    )}
                </div>

                <div className="col-md-6">
                    <label htmlFor="region" className="form-label fw-bold">
                        Región
                    </label>
                    <select
                        className={`form-select ${errores.region ? "is-invalid" : ""}`}
                        id="region"
                        value={formData.region}
                        onChange={handleRegionChange}
                    >
                        <option value="" disabled>
                            Selecciona una región
                        </option>
                        {regiones.map((region, index) => (
                            <option key={index} value={region.nombre}>
                                {region.nombre}
                            </option>
                        ))}
                    </select>
                    {errores.region && (
                        <div className="invalid-feedback fw-bold">
                            {errores.region}
                        </div>
                    )}
                </div>
                <div className="col-md-6">
                    <label htmlFor="comuna" className="form-label fw-bold">
                        Comuna
                    </label>
                    <select
                        className={`form-select ${errores.comuna ? "is-invalid" : ""}`}
                        id="comuna"
                        value={formData.comuna}
                        onChange={handleComunaChange}
                        disabled={!formData.region}
                    >
                        <option value="" disabled>
                            {formData.region
                                ? "Selecciona una comuna"
                                : "Selecciona primero una región"}
                        </option>
                        {comunasDisponibles.map((comuna, index) => (
                            <option key={index} value={comuna}>
                                {comuna}
                            </option>
                        ))}
                    </select>
                    {errores.comuna && (
                        <div className="invalid-feedback fw-bold">
                            {errores.comuna}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default FormularioEnvio;
