import { type Colaborador } from "../data/usuarios";

const API_URL = "http://localhost:8081/api/usuarios";

export interface Usuario {
    id?: number;
    run?: string;
    rut?: string;
    nombre?: string;
    apellidos?: string;
    nombreCompleto?: string;
    fechaNacimiento?: string;
    correo: string;
    contrasena: string;
    rol: "cliente" | "admin" | "vendedor";
    region?: string;
    comuna?: string;
    direccion?: string;
    telefono?: string;
}

export interface RegistroClientePayload {
    run: string;
    nombre: string;
    apellidos: string;
    fechaNacimiento?: string;
    correo: string;
    contrasena: string;
    region: string;
    comuna: string;
    direccion: string;
}

// Separa "Juan Pérez Soto" en { nombre: "Juan", apellidos: "Pérez Soto", nombreCompleto: "Juan Pérez Soto" }
const dividirNombreCompleto = (nombreCompleto: string) => {
    const limpio = nombreCompleto.trim().replace(/\s+/g, " ");
    const partes = limpio.split(" ");
    const nombre = partes[0] || "";
    const apellidos = partes.slice(1).join(" ");

    return {
        nombre,
        apellidos: apellidos || null,
        nombreCompleto: limpio,
    };
};

// --- FUNCIONES CONECTADAS AL MICROSERVICIO SPRING BOOT (PUERTO 8081) ---

// 1. LOGIN (POST /api/usuarios/login)
export const loginUsuario = async (correo: string, contrasena: string) => {
    const respuesta = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, contrasena }),
    });

    if (!respuesta.ok) {
        throw new Error("Correo o contraseña incorrectos.");
    }

    return respuesta.json();
};

// 2. REGISTRO PÚBLICO DE CLIENTES (POST /api/usuarios/registro)
export const registrarCliente = async (usuario: RegistroClientePayload) => {
    const respuesta = await fetch(`${API_URL}/registro`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            rut: usuario.run,
            nombre: usuario.nombre,
            apellidos: usuario.apellidos,
            nombreCompleto: `${usuario.nombre} ${usuario.apellidos}`.trim(),
            fechaNacimiento: usuario.fechaNacimiento,
            correo: usuario.correo,
            contrasena: usuario.contrasena,
            region: usuario.region,
            comuna: usuario.comuna,
            direccion: usuario.direccion,
        }),
    });

    if (!respuesta.ok) {
        const errorData = await respuesta.json().catch(() => null);
        throw new Error(
            errorData?.mensaje || "No fue posible registrar la cuenta.",
        );
    }

    return respuesta.json();
};

// 3. LISTAR USUARIOS EN PANEL ADMIN (GET /api/usuarios con RequestHeader)
export const listarUsuariosAdmin = async (): Promise<Colaborador[]> => {
    const respuesta = await fetch(API_URL, {
        headers: { "X-Usuario-Rol": "admin" },
    });

    if (!respuesta.ok) {
        throw new Error("Error al obtener los usuarios del servidor.");
    }

    return respuesta.json();
};

// 4. CREAR USUARIO DESDE ADMIN (POST /api/usuarios con RequestHeader)
export const crearUsuarioAdmin = async (
    usuario: Omit<Colaborador, "id"> & { contrasena?: string },
) => {
    const payload = {
        ...usuario,
        ...dividirNombreCompleto(usuario.nombreCompleto),
    };

    const respuesta = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Usuario-Rol": "admin",
        },
        body: JSON.stringify(payload),
    });

    if (!respuesta.ok) {
        const errorData = await respuesta.json().catch(() => null);
        throw new Error(errorData?.mensaje || "Error al crear usuario.");
    }

    return respuesta.json();
};

// 5. EDITAR USUARIO DESDE ADMIN (PUT /api/usuarios/{id} con RequestHeader)
export const actualizarUsuarioAdmin = async (
    id: number,
    usuario: Partial<Colaborador>,
) => {
    const payload = usuario.nombreCompleto
        ? {
              ...usuario,
              ...dividirNombreCompleto(usuario.nombreCompleto),
          }
        : usuario;

    const respuesta = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "X-Usuario-Rol": "admin",
        },
        body: JSON.stringify(payload),
    });

    if (!respuesta.ok) {
        throw new Error("Error al actualizar el usuario.");
    }

    return respuesta.json();
};

// 6. ELIMINAR USUARIO DESDE ADMIN (DELETE /api/usuarios/{id} con RequestHeader)
export const eliminarUsuarioAdmin = async (id: number) => {
    const respuesta = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { "X-Usuario-Rol": "admin" },
    });

    if (!respuesta.ok) {
        throw new Error("Error al eliminar el usuario.");
    }
};

// --- FUNCIONES DE COMPATIBILIDAD PARA OTROS COMPONENTES Y TESTS ---
const CLAVE_USUARIOS = "usuarios";

export const obtenerUsuarios = (): Usuario[] => {
    const datosGuardados = localStorage.getItem(CLAVE_USUARIOS);
    if (!datosGuardados) return [];
    try {
        const usuarios = JSON.parse(datosGuardados);
        return Array.isArray(usuarios) ? (usuarios as Usuario[]) : [];
    } catch {
        return [];
    }
};

export const existeCorreo = (correo: string): boolean => {
    return obtenerUsuarios().some(
        (u) => u.correo.toLowerCase() === correo.trim().toLowerCase(),
    );
};

export const existeRun = (run: string): boolean => {
    const runNormalizado = run.replace(/[.-]/g, "").toUpperCase();
    return obtenerUsuarios().some(
        (u) => u.run?.replace(/[.-]/g, "").toUpperCase() === runNormalizado,
    );
};
