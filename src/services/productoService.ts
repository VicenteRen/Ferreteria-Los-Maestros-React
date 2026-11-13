import { type ProductoInventario } from "../context/CarritoContext";

const API_URL = "http://localhost:8083/api/productos";

// GET: Obtener todos los productos desde MySQL
export const obtenerProductosAPI = async (): Promise<ProductoInventario[]> => {
    const respuesta = await fetch(API_URL);
    if (!respuesta.ok) {
        throw new Error(`Error HTTP ${respuesta.status} al obtener productos`);
    }
    return await respuesta.json();
};

// POST: Crear un producto nuevo en MySQL
export const crearProductoAPI = async (
    nuevoProducto: Omit<ProductoInventario, "id">
): Promise<ProductoInventario> => {
    const respuesta = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoProducto),
    });

    if (!respuesta.ok) {
        throw new Error(`Error HTTP ${respuesta.status} al crear el producto`);
    }
    return await respuesta.json();
};

// PUT: Actualizar un producto existente (Editar o Sumar Stock)
export const actualizarProductoAPI = async (
    id: number,
    productoActualizado: ProductoInventario
): Promise<ProductoInventario> => {
    const respuesta = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(productoActualizado),
    });

    if (!respuesta.ok) {
        throw new Error(`Error HTTP ${respuesta.status} al actualizar el producto`);
    }
    return await respuesta.json();
};

// DELETE: Eliminar un producto por ID
export const eliminarProductoAPI = async (id: number): Promise<void> => {
    const respuesta = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    if (!respuesta.ok) {
        throw new Error(`Error HTTP ${respuesta.status} al eliminar el producto`);
    }
};