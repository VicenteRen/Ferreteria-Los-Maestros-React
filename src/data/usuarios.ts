export interface Colaborador {
    id: number;
    rut: string;
    nombreCompleto: string;
    correo: string;
    rol: "admin" | "vendedor";
    region: string;
    comuna: string;
    telefono?: string; 
}

export const usuariosBase: Colaborador[] = [
    {
        id: 1,
        rut: "112223334", 
        nombreCompleto: "Admin Sistema",
        correo: "admin@ejemplo.cl",
        rol: "admin",
        region: "Región Metropolitana de Santiago",
        comuna: "Santiago",
        telefono: "+56911112222"
    },
    {
        id: 2,
        rut: "998887776",
        nombreCompleto: "Vendedor Base",
        correo: "vendedor@ejemplo.cl",
        rol: "vendedor",
        region: "Región Metropolitana de Santiago",
        comuna: "Providencia",
        telefono: "933334444"
    }
];