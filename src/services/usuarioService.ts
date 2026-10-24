
export interface Usuario {
  run?: string;
  nombre?: string;
  apellidos?: string;
  fechaNacimiento?: string;
  correo: string;
  contrasena: string;
  rol: "cliente" | "admin";
  region?: string;
  comuna?: string;
  direccion?: string;
}

const CLAVE_USUARIOS = "usuarios";

// Cuenta inicial para la demostración académica.
const ADMIN_DEMO: Usuario = {
  nombre: "Admin Sistema",
  correo: "admin@ejemplo.cl",
  contrasena: "Admin123",
  rol: "admin",
};

// Obtiene los usuarios guardados en el navegador.
export const obtenerUsuarios = (): Usuario[] => {
  const datosGuardados = localStorage.getItem(CLAVE_USUARIOS);

  if (!datosGuardados) {
  return [ADMIN_DEMO];
  }

  try {
    const usuarios = JSON.parse(datosGuardados);

    return Array.isArray(usuarios)
  ? [ADMIN_DEMO, ...(usuarios as Usuario[]).filter(
      (usuario) => usuario.correo.toLowerCase() !== ADMIN_DEMO.correo
    )]
  : [ADMIN_DEMO];
  } catch {
    return [];
  }
};

// Comprueba si un correo ya está registrado.
export const existeCorreo = (correo: string): boolean => {
  return obtenerUsuarios().some(
    (usuario) =>
      usuario.correo.toLowerCase() === correo.trim().toLowerCase()
  );
};

// Comprueba si un RUN ya está registrado.
export const existeRun = (run: string): boolean => {
  const runNormalizado = run.replace(/[.-]/g, "").toUpperCase();

  return obtenerUsuarios().some(
    (usuario) =>
      usuario.run?.replace(/[.-]/g, "").toUpperCase() ===
      runNormalizado
  );
};

// Registra únicamente cuentas de cliente.
export const registrarCliente = (
  usuario: Omit<Usuario, "rol">
): void => {
  if (existeCorreo(usuario.correo)) {
    throw new Error("Este correo electrónico ya está registrado.");
  }

  if (usuario.run && existeRun(usuario.run)) {
    throw new Error("Este RUN ya está registrado.");
  }

  const usuarios = obtenerUsuarios();

  usuarios.push({
    ...usuario,
    rol: "cliente",
  });

  localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuarios));
};
