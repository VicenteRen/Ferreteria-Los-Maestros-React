import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
// Importamos los datos estáticos iniciales
import { productosBase } from "../data/productos";

export interface ProductoCarrito {
    id: number;
    nombre: string;
    marca: string;
    precio: number;
    imagen: string;
    stock: number;
    cantidad: number;
}

// Interfaz para los productos del inventario general (sin cantidad)
export interface ProductoInventario {
    id: number;
    codigo: string;
    categoria: string;
    subcategoria: string;
    nombre: string;
    marca: string;
    unidad: string;
    precioCompra: number;
    precio: number;
    stock: number;
    stockMinimo: number;
    imagen: string;
    descripcion: string;
}

interface CarritoContextType {
    carrito: ProductoCarrito[];
    inventario: ProductoInventario[]; // NUEVO: Estado global del inventario
    agregarAlCarrito: (producto: any) => void;
    eliminarDelCarrito: (id: number) => void;
    vaciarCarrito: () => void;
    procesarCompra: () => void; // NUEVO: Función para descontar el stock permanentemente
    totalArticulos: number;
    totalPrecio: number;

    // Funciones para el panel del Administrador
    agregarProductoAdmin: (producto: ProductoInventario) => void;
    editarProductoAdmin: (id: number, producto: ProductoInventario) => void;
    eliminarProductoAdmin: (id: number) => void;
    sumarStockRapido: (id: number) => void;
}

export const CarritoContext = createContext<CarritoContextType>(
    {} as CarritoContextType,
);

export const CarritoProvider = ({ children }: { children: ReactNode }) => {
    // --- ESTADO DEL CARRITO ---
    const [carrito, setCarrito] = useState<ProductoCarrito[]>(() => {
        const guardado = localStorage.getItem("carritoFerreteria");
        return guardado ? JSON.parse(guardado) : [];
    });

    // --- ESTADO DEL INVENTARIO GENERAL ---
    const [inventario, setInventario] = useState<ProductoInventario[]>(() => {
        const inventarioGuardado = localStorage.getItem("inventarioFerreteria");
        // Si hay inventario guardado, lo usamos. Si no, cargamos el original de productosBase
        return inventarioGuardado
            ? JSON.parse(inventarioGuardado)
            : productosBase;
    });

    // Persistir cambios en LocalStorage
    useEffect(() => {
        localStorage.setItem("carritoFerreteria", JSON.stringify(carrito));
    }, [carrito]);

    useEffect(() => {
        localStorage.setItem(
            "inventarioFerreteria",
            JSON.stringify(inventario),
        );
    }, [inventario]);

    // --- LÓGICA DE AGREGAR AL CARRITO ---
    const agregarAlCarrito = (producto: any) => {
        // Primero buscamos cuál es el stock REAL actual de este producto en el inventario global
        const productoEnInventario = inventario.find(
            (p) => p.id === producto.id,
        );
        const stockReal = productoEnInventario ? productoEnInventario.stock : 0;

        setCarrito((prevCarrito) => {
            const indexExistente = prevCarrito.findIndex(
                (p) => p.id === producto.id,
            );

            if (indexExistente >= 0) {
                if (prevCarrito[indexExistente].cantidad >= stockReal) {
                    alert(
                        "No puedes agregar más unidades, límite de stock alcanzado.",
                    );
                    return prevCarrito;
                }

                const nuevoCarrito = [...prevCarrito];
                nuevoCarrito[indexExistente] = {
                    ...nuevoCarrito[indexExistente],
                    cantidad: nuevoCarrito[indexExistente].cantidad + 1,
                };

                alert("¡Cantidad aumentada en tu carrito!");
                return nuevoCarrito;
            } else {
                if (stockReal <= 0) {
                    alert("Lo sentimos, este producto está agotado.");
                    return prevCarrito;
                }
                alert("¡Producto agregado a tu carrito!");
                // Ojo aquí: Guardamos en el carrito pero le asociamos el stockReal actualizado
                return [
                    ...prevCarrito,
                    { ...producto, stock: stockReal, cantidad: 1 },
                ];
            }
        });
    };

    const eliminarDelCarrito = (idProducto: number) => {
        setCarrito((prev) =>
            prev.filter((producto) => producto.id !== idProducto),
        );
    };

    const vaciarCarrito = () => {
        setCarrito([]);
    };

    // --- Logica del panel del Administrador ---
    
    const agregarProductoAdmin = (nuevoProducto: ProductoInventario) => {
        // Copiamos el inventario actual y le sumamos el nuevo al final
        setInventario([...inventario, nuevoProducto]);
    };

    const editarProductoAdmin = (id: number, productoActualizado: ProductoInventario) => {
        // Reemplazamos solo el producto que coincida con el ID
        setInventario(inventario.map(prod => prod.id === id ? productoActualizado : prod));
    };

    const eliminarProductoAdmin = (id: number) => {
        // Filtramos para conservar todos menos el que queremos borrar
        setInventario(inventario.filter(prod => prod.id !== id));
    };

    const sumarStockRapido = (id: number) => {
    setInventario(inventario.map(prod => 
        prod.id === id ? { ...prod, stock: prod.stock + 10 } : prod));
    };

    // --- NUEVO: LÓGICA PARA PROCESAR LA COMPRA Y DESCONTAR STOCK ---
    const procesarCompra = () => {
        // Hacemos una copia del inventario actual
        const nuevoInventario = [...inventario];

        // Recorremos lo que el usuario compró
        carrito.forEach((itemComprado) => {
            const indexProducto = nuevoInventario.findIndex(
                (prod) => prod.id === itemComprado.id,
            );
            if (indexProducto !== -1) {
                // Descontamos el stock
                nuevoInventario[indexProducto].stock -= itemComprado.cantidad;
                // Nos aseguramos de que no queden números negativos
                if (nuevoInventario[indexProducto].stock < 0) {
                    nuevoInventario[indexProducto].stock = 0;
                }
            }
        });

        // Actualizamos el inventario global y vaciamos el carrito
        setInventario(nuevoInventario);
        setCarrito([]);
    };

    // Cálculos derivados
    const totalArticulos = carrito.reduce(
        (acc, prod) => acc + prod.cantidad,
        0,
    );
    const totalPrecio = carrito.reduce(
        (acc, prod) => acc + prod.precio * prod.cantidad,
        0,
    );

    return (
        <CarritoContext.Provider
            value={{
                carrito,
                inventario,
                agregarAlCarrito,
                eliminarDelCarrito,
                vaciarCarrito,
                procesarCompra,
                totalArticulos,
                totalPrecio,
                agregarProductoAdmin,
                editarProductoAdmin,
                eliminarProductoAdmin,
                sumarStockRapido

            }}
        >
            {children}
        </CarritoContext.Provider>
    );
};
