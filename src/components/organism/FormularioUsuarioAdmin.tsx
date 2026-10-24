import { useState, useEffect } from "react";
import { type Colaborador } from "../../data/usuarios";
import { regiones } from "../../data/regiones"; 

interface Props {
    usuarioAEditar: Colaborador | null;
    volverATabla: () => void;
    guardarUsuario: (usuario: Colaborador) => void;
    usuariosActuales: Colaborador[]; 
}

const FormularioUsuarioAdmin = ({ usuarioAEditar, volverATabla, guardarUsuario, usuariosActuales }: Props) => {
    const [rut, setRut] = useState("");
    const [nombreCompleto, setNombreCompleto] = useState("");
    const [correo, setCorreo] = useState("");
    const [rol, setRol] = useState<"admin" | "vendedor">("vendedor");
    const [telefono, setTelefono] = useState("");
    
    const [regionSeleccionada, setRegionSeleccionada] = useState("");
    const [comunasDisponibles, setComunasDisponibles] = useState<string[]>([]);
    const [comunaSeleccionada, setComunaSeleccionada] = useState("");

    useEffect(() => {
        if (usuarioAEditar) {
            setRut(usuarioAEditar.rut.replace("-", "")); 
            setNombreCompleto(usuarioAEditar.nombreCompleto);
            setCorreo(usuarioAEditar.correo);
            setRol(usuarioAEditar.rol);
            setTelefono(usuarioAEditar.telefono || "");
            setRegionSeleccionada(usuarioAEditar.region);
            
            const regionEncontrada = regiones.find(r => r.nombre === usuarioAEditar.region);
            if (regionEncontrada) {
                setComunasDisponibles(regionEncontrada.comunas);
            }
            
            setComunaSeleccionada(usuarioAEditar.comuna);
        }
    }, [usuarioAEditar]);

    const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const nombreRegion = e.target.value;
        setRegionSeleccionada(nombreRegion);
        setComunaSeleccionada(""); 
        
        const regionObj = regiones.find(r => r.nombre === nombreRegion);
        setComunasDisponibles(regionObj ? regionObj.comunas : []);
    };

    const handleTelefonoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valorIngresado = e.target.value;
        if (valorIngresado === "" || /^\+?[0-9]{0,11}$/.test(valorIngresado)) {
            setTelefono(valorIngresado);
        }
    };

    // --- MANEJO DEL INPUT DE NOMBRE (Solo letras y espacios) ---
    const handleNombreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valorIngresado = e.target.value;
        // Permite vacío o solo letras (incluyendo tildes y ñ) y espacios
        if (valorIngresado === "" || /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(valorIngresado)) {
            setNombreCompleto(valorIngresado);
        }
    };

    const esRutValido = (rutOriginal: string) => {
        const run = rutOriginal.trim().toUpperCase();
        if (run === "") return false;
        if (run.includes(".") || run.includes("-")) return false;
        
        const formatoRun = /^\d+[0-9K]$/;
        if (!formatoRun.test(run)) return false;

        const cuerpo = run.slice(0, -1);
        const digitoIngresado = run.slice(-1);
        let suma = 0;
        let multiplicador = 2;

        for (let i = cuerpo.length - 1; i >= 0; i--) {
            suma += Number(cuerpo[i]) * multiplicador;
            multiplicador++;
            if (multiplicador === 8) multiplicador = 2;
        }

        const resultado = 11 - (suma % 11);
        let digitoCalculado = resultado === 11 ? "0" : resultado === 10 ? "K" : String(resultado);

        return digitoIngresado === digitoCalculado;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const rutLimpio = rut.trim().toUpperCase();
        const correoLimpio = correo.trim().toLowerCase();
        const nombreLimpio = nombreCompleto.trim();
        const telefonoLimpio = telefono.trim();

        // 1. Validaciones de presencia
        if (!rutLimpio || !nombreLimpio || !correoLimpio) {
            alert("RUT, nombre y correo son obligatorios.");
            return;
        }

        // 2. Formato de correo
        const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formatoCorreo.test(correoLimpio)) {
            alert("Ingrese un correo electrónico válido.");
            return;
        }

        // 3. Formato de teléfono
        if (telefonoLimpio !== "") {
            const formatoTelefono = /^\+569[0-9]{8}$/;
            if (!formatoTelefono.test(telefonoLimpio)) {
                alert("El formato del teléfono debe ser chileno válido. Ejemplo exacto: +56912345678");
                return;
            }
        }

        // --- VALIDACIONES DE DUPLICIDAD ---
        // Aquí revisamos que el correo y el teléfono no se repitan con otros usuarios.
        // Si estamos editando, excluimos al propio usuario de la búsqueda (u.id !== usuarioAEditar.id)
        const correoDuplicado = usuariosActuales.some(
            u => u.correo === correoLimpio && (!usuarioAEditar || u.id !== usuarioAEditar.id)
        );
        if (correoDuplicado) {
            alert("Este correo electrónico ya está registrado en el sistema.");
            return;
        }

        if (telefonoLimpio !== "") {
            const telefonoDuplicado = usuariosActuales.some(
                u => u.telefono === telefonoLimpio && (!usuarioAEditar || u.id !== usuarioAEditar.id)
            );
            if (telefonoDuplicado) {
                alert("Este número de teléfono ya está registrado para otro usuario.");
                return;
            }
        }

        // 4. Validaciones de RUT y Roles
        if (!usuarioAEditar) {
            if (!esRutValido(rutLimpio)) {
                alert("El RUT ingresado no es válido. Ingréselo sin puntos ni guión (Ej: 123456789).");
                return;
            }

            const rutDuplicado = usuariosActuales.some(u => u.rut.replace("-","") === rutLimpio);
            if (rutDuplicado) {
                alert("Este RUT ya se encuentra registrado en el sistema.");
                return;
            }
        } else {
            if (usuarioAEditar.rol === "admin" && rol !== "admin") {
                const totalAdmins = usuariosActuales.filter(u => u.rol === "admin").length;
                if (totalAdmins <= 1) {
                    alert("Operación denegada. Eres el único Administrador del sistema y no puedes quitarte este rol.");
                    setRol("admin");
                    return; 
                }
            }
        }

        const usuarioListo: Colaborador = {
            id: usuarioAEditar ? usuarioAEditar.id : Date.now(), 
            rut: rutLimpio,
            nombreCompleto: nombreLimpio,
            correo: correoLimpio,
            rol,
            telefono: telefonoLimpio,
            region: regionSeleccionada,
            comuna: comunaSeleccionada
        };

        guardarUsuario(usuarioListo);
    };

    return (
        <div className="card shadow-sm border-0">
            <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center py-3">
                <h5 className="mb-0 fw-bold">
                    <i className={`bi ${usuarioAEditar ? "bi-pencil-square" : "bi-person-plus-fill"} me-2`}></i>
                    {usuarioAEditar ? "Editar Usuario" : "Crear Nuevo Usuario"}
                </h5>
                <button className="btn btn-sm btn-outline-light" onClick={volverATabla}>
                    <i className="bi bi-x-lg"></i>
                </button>
            </div>
            
            <div className="card-body p-4 bg-white">
                <form onSubmit={handleSubmit} noValidate>
                    <div className="row g-3 mb-3">
                        <div className="col-md-3">
                            <label htmlFor="inputRut" className="form-label fw-bold">RUT *</label>
                            <input 
                                id="inputRut"
                                type="text" 
                                className="form-control bg-light" 
                                placeholder="Ej: 11222333K" 
                                value={rut} 
                                onChange={(e) => setRut(e.target.value.toUpperCase())} 
                                maxLength={9}
                                disabled={!!usuarioAEditar} 
                                required 
                            />
                            {usuarioAEditar && <small className="text-muted">El RUT no se puede modificar.</small>}
                        </div>
                        <div className="col-md-5">
                            <label htmlFor="inputNombre" className="form-label fw-bold">Nombre Completo *</label>
                            <input 
                                id="inputNombre"
                                type="text" 
                                className="form-control" 
                                value={nombreCompleto} 
                                onChange={handleNombreChange} 
                                maxLength={50}
                                required 
                            />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="inputCorreo" className="form-label fw-bold">Correo Electrónico *</label>
                            <input 
                                id="inputCorreo"
                                type="email" 
                                className="form-control" 
                                value={correo} 
                                onChange={(e) => setCorreo(e.target.value)} 
                                maxLength={100}
                                required 
                            />
                        </div>
                    </div>

                    <div className="row g-3 mb-4">
                        <div className="col-md-3">
                            <label htmlFor="inputTelefono" className="form-label fw-bold">Teléfono</label>
                            <input 
                                id="inputTelefono"
                                type="text" 
                                className="form-control" 
                                placeholder="+56912345678" 
                                value={telefono} 
                                onChange={handleTelefonoChange} 
                                maxLength={12}
                            />
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="selectRol" className="form-label fw-bold">Rol en el Sistema *</label>
                            <select 
                                id="selectRol"
                                className="form-select border-primary" 
                                value={rol} 
                                onChange={(e) => setRol(e.target.value as "admin" | "vendedor")}
                            >
                                <option value="admin">Administrador</option>
                                <option value="vendedor">Vendedor</option>
                            </select>
                        </div>
                        
                        <div className="col-md-3">
                            <label htmlFor="selectRegion" className="form-label fw-bold">Región</label>
                            <select id="selectRegion" className="form-select" value={regionSeleccionada} onChange={handleRegionChange}>
                                <option value="">Seleccione...</option>
                                {regiones.map((r, index) => (
                                    <option key={index} value={r.nombre}>{r.nombre}</option>
                                ))}
                            </select>
                        </div>
                        
                        <div className="col-md-3">
                            <label htmlFor="selectComuna" className="form-label fw-bold">Comuna</label>
                            <select id="selectComuna" className="form-select" value={comunaSeleccionada} onChange={(e) => setComunaSeleccionada(e.target.value)} disabled={!regionSeleccionada}>
                                <option value="">Seleccione...</option>
                                {comunasDisponibles.map((c, index) => (
                                    <option key={index} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <hr className="my-4" />
                    
                    <div className="d-flex justify-content-end gap-2">
                        <button type="button" className="btn btn-secondary fw-bold px-4" onClick={volverATabla}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn btn-dark fw-bold px-4">
                            Guardar Usuario
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormularioUsuarioAdmin;