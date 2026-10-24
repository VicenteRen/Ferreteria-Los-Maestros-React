import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CarritoContext, type ProductoInventario } from "../context/CarritoContext";
import TablaProductosAdmin from "../components/organism/TablaProductosAdmin";
import FormularioProductoAdmin from "../components/organism/FormularioProductoAdmin"; 

// Importaciones de la sección de Usuarios
import { usuariosBase, type Colaborador } from "../data/usuarios";
import TablaUsuariosAdmin from "../components/organism/TablaUsuariosAdmin";
import FormularioUsuarioAdmin from "../components/organism/FormularioUsuarioAdmin";

const Admin = () => {
    const { inventario } = useContext(CarritoContext);

    const [vista, setVista] = useState<"productos" | "form-producto" | "usuarios" | "form-usuario">("productos");
    
    const [productoAEditar, setProductoAEditar] = useState<ProductoInventario | null>(null);
    const [usuarioAEditar, setUsuarioAEditar] = useState<Colaborador | null>(null);

    // Clave exclusiva para los administradores y vendedores.
    const CLAVE_USUARIOS_SISTEMA = "usuariosSistema";

    // Recuperar los usuarios guardados o utilizar los usuarios iniciales.
    const [usuarios, setUsuarios] = useState<Colaborador[]>(() => {
        const datosGuardados = localStorage.getItem(CLAVE_USUARIOS_SISTEMA);

        if (!datosGuardados) {
            return usuariosBase;
        }
        
        try {
            const usuariosGuardados = JSON.parse(datosGuardados);

            return Array.isArray(usuariosGuardados)
                ? usuariosGuardados as Colaborador[]
                : usuariosBase;
        } catch {
            return usuariosBase;
        }
    });

    // Guardar automáticamente los cambios del CRUD.
    useEffect(() => {
        localStorage.setItem(CLAVE_USUARIOS_SISTEMA, JSON.stringify(usuarios));
    }, [usuarios]);


    // --- ACCIONES (PRODUCTOS) ---
    const abrirFormularioProducto = (producto: ProductoInventario | null = null) => {
        setProductoAEditar(producto);
        setVista("form-producto");
    };

    // --- ACCIONES (USUARIOS) ---
    const abrirFormularioUsuario = (usuario: Colaborador | null = null) => {
        setUsuarioAEditar(usuario);
        setVista("form-usuario");
    };

    const guardarUsuario = (nuevoUsuario: Colaborador) => {
        if (usuarioAEditar) {
            setUsuarios(usuarios.map(u => u.id === nuevoUsuario.id ? nuevoUsuario : u));
            alert("Usuario editado con éxito");
        } else {
            setUsuarios([...usuarios, nuevoUsuario]);
            alert("Usuario agregado con éxito");
        }
        setVista("usuarios");
    };

    const eliminarUsuario = (id: number) => {
        const usuarioAEliminar = usuarios.find(u => u.id === id);
        
        // Seguro Anti-Suicidio: Evitar dejar el sistema sin administradores
        if (usuarioAEliminar?.rol === "admin") {
            const totalAdmins = usuarios.filter(u => u.rol === "admin").length;
            if (totalAdmins <= 1) {
                alert("Operación denegada. No puedes eliminar al único Administrador del sistema.");
                return;
            }
        }

        if (window.confirm(`¿Estás seguro de que deseas eliminar a ${usuarioAEliminar?.nombreCompleto}?`)) {
            setUsuarios(usuarios.filter(u => u.id !== id));
        }
    };

    const totalProductos = inventario.length;
    const alertasStock = inventario.filter((p) => p.stock <= p.stockMinimo).length;
    const totalUsuarios = usuarios.length;

    return (
        <div className="container-fluid bg-light min-vh-100 pb-5" style={{ paddingTop: "80px" }}>
            <div className="row">
                {/* MENU LATERAL */}
                <nav className="col-md-3 col-lg-2 d-md-block bg-white sidebar border-end min-vh-100 p-3">
                    <ul className="nav flex-column gap-2">
                        <li className="nav-item">
                            <a className="nav-link fw-bold text-brand-orange bg-light rounded" href="#dashboard">
                                <i className="bi bi-speedometer2 me-2"></i> Dashboard
                            </a>
                        </li>
                        <li className="nav-item">
                            <button 
                                className="nav-link text-dark btn btn-link text-start w-100 text-decoration-none" 
                                onClick={() => setVista("productos")}
                            >
                                <i className="bi bi-box-seam me-2"></i> Productos
                            </button>
                        </li>
                        <li className="nav-item">
                            <button 
                                className="nav-link text-dark btn btn-link text-start w-100 text-decoration-none" 
                                onClick={() => setVista("usuarios")}
                            >
                                <i className="bi bi-people me-2"></i> Usuarios
                            </button>
                        </li>
                        <hr className="my-3 text-secondary" />
                        <li className="nav-item">
                            <Link className="nav-link text-muted" to="/">
                                <i className="bi bi-shop me-2"></i> Ir a Tienda
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* CONTENIDO PRINCIPAL */}
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-4 border-bottom">
                        <h1 className="h3 fw-bold text-dark">Resumen del Negocio</h1>
                    </div>

                    {/* Tarjetas del Dashboard */}
                    <div className="row g-3 mb-5" id="dashboard">
                        <div className="col-12 col-sm-6 col-xl-3">
                            <div className="card text-white bg-dark h-100 p-3 shadow-sm border-0 rounded-3">
                                <div className="text-white-50 small fw-bold mb-1">Catálogo Total</div>
                                <div className="fs-3 fw-bold">{totalProductos}</div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-xl-3">
                            <div className="card text-white bg-dark h-100 p-3 shadow-sm border-0 rounded-3">
                                <div className="text-white-50 small fw-bold mb-1">Alertas de Stock</div>
                                <div className="fs-3 fw-bold text-danger">{alertasStock} alertas</div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-xl-3">
                            <div className="card text-white bg-dark h-100 p-3 shadow-sm border-0 rounded-3">
                                <div className="text-white-50 small fw-bold mb-1">Usuarios Activos</div>
                                <div className="fs-3 fw-bold">{totalUsuarios}</div> 
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-xl-3">
                            <div className="card text-white bg-dark h-100 p-3 shadow-sm border-0 rounded-3">
                                <div className="text-white-50 small fw-bold mb-1">Pedidos Activos</div>
                                <div className="fs-3 fw-bold">8</div>
                            </div>
                        </div>
                    </div>

                    <section className="mb-5">
                        
                        {vista === "productos" && (
                            <>
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h2 className="h4 fw-bold text-dark">Productos</h2>
                                    <button className="btn btn-dark btn-sm fw-bold" onClick={() => abrirFormularioProducto(null)}>
                                        <i className="bi bi-plus-lg me-1"></i> Agregar Producto
                                    </button>
                                </div>
                                <TablaProductosAdmin onEditar={abrirFormularioProducto} />
                            </>
                        )}

                        {vista === "form-producto" && (
                            <FormularioProductoAdmin 
                                productoAEditar={productoAEditar} 
                                volverATabla={() => setVista("productos")} 
                            />
                        )}

                        {vista === "usuarios" && (
                            <>
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h2 className="h4 fw-bold text-dark">Usuarios del Sistema</h2>
                                    <button className="btn btn-dark btn-sm fw-bold" onClick={() => abrirFormularioUsuario(null)}>
                                        <i className="bi bi-person-plus-fill me-1"></i> Crear Usuario
                                    </button>
                                </div>
                                <TablaUsuariosAdmin 
                                    usuarios={usuarios} 
                                    onEditar={abrirFormularioUsuario} 
                                    onEliminar={eliminarUsuario} 
                                />
                            </>
                        )}

                        {vista === "form-usuario" && (
                            <FormularioUsuarioAdmin 
                                usuarioAEditar={usuarioAEditar} 
                                usuariosActuales={usuarios}
                                guardarUsuario={guardarUsuario}
                                volverATabla={() => setVista("usuarios")} 
                            />
                        )}

                    </section>
                </main>
            </div>
        </div>
    );
};

export default Admin;