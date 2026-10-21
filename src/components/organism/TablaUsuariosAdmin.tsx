import { type Colaborador } from "../../data/usuarios"; 

interface Props {
    usuarios: Colaborador[];
    onEditar: (usuario: Colaborador) => void;
    onEliminar: (id: number) => void;
}

const TablaUsuariosAdmin = ({ usuarios, onEditar, onEliminar }: Props) => {
    return (
        <div className="table-responsive bg-white rounded shadow-sm border">
            <table className="table table-hover align-middle mb-0">
                <thead className="bg-light text-dark border-bottom">
                    <tr>
                        <th className="py-3 px-3">RUT</th>
                        <th className="py-3">Nombre Completo</th>
                        <th className="py-3">Correo</th>
                        <th className="py-3">Rol</th>
                        <th className="py-3">Comuna</th>
                        <th className="py-3 text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => {
                        // Lógica de colores para los roles corregida (solo admin y vendedor)
                        const claseRol = usuario.rol === "admin" 
                            ? "badge bg-primary" 
                            : "badge bg-warning text-dark";

                        return (
                            <tr key={usuario.id}>
                                <td className="px-3 fw-bold">{usuario.rut}</td>
                                <td className="fw-bold">{usuario.nombreCompleto}</td>
                                <td>{usuario.correo}</td>
                                <td>
                                    <span className={claseRol}>
                                        {/* Capitalizamos la primera letra del rol */}
                                        {usuario.rol.charAt(0).toUpperCase() + usuario.rol.slice(1)}
                                    </span>
                                </td>
                                <td>{usuario.comuna}</td>
                                <td className="text-center">
                                    <div className="btn-group gap-1">
                                        <button
                                            className="btn btn-sm btn-outline-primary"
                                            onClick={() => onEditar(usuario)}
                                        >
                                            <i className="bi bi-pencil"></i>
                                        </button>
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => onEliminar(usuario.id)}
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            
            {/* Si no hay usuarios, mostramos un mensaje */}
            {usuarios.length === 0 && (
                <div className="text-center text-muted py-4">
                    No hay usuarios registrados.
                </div>
            )}
        </div>
    );
};

export default TablaUsuariosAdmin;