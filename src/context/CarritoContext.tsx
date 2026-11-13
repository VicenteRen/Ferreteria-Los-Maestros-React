import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
// Importamos los datos estáticos iniciales
import { productosBase } from "../data/productos";

import {
    obtenerProductosAPI,
    crearProductoAPI,
    actualizarProductoAPI,
    eliminarProductoAPI,
} from "../services/productoService";

export interface ProductoCarrito {
    id: number;
    nombre: string;
    marca: string;
    precio: number;
    imagen: string;
    stock: number;
    cantidad: number;
}

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
    inventario: ProductoInventario[]; 
    agregarAlCarrito: (producto: any) => void;
    eliminarDelCarrito: (id: number) => void;
    vaciarCarrito: () => void;
    procesarCompra: () => void; 
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

    // --- CONEXIÓN CON SPRING BOOT ---
    useEffect(() => {
        const cargarDesdeBackend = async () => {
            try {
                // Consulta los productos al servidor (GET)
                const datos = await obtenerProductosAPI();

                if (datos.length === 0) {
                    // Si la BD de MySQL está vacía, sube automáticamente los productos base
                    const insertados: ProductoInventario[] = [];
                    for (const prod of productosBase) {
                        const { id, ...prodSinId } = prod; // Se quita el ID para que MySQL genere uno nuevo (AUTO_INCREMENT)
                        const guardadoEnBD = await crearProductoAPI(prodSinId);
                        insertados.push(guardadoEnBD);
                    }
                    setInventario(insertados);
                } else {
                    setInventario(datos);
                }
            } catch (error) {
                console.warn("Servidor backend apagado. Trabajando en modo local.", error);
            }
        };

        cargarDesdeBackend();
    }, []);

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
        setInventario([...inventario, nuevoProducto]);

        // Guardado en MySQL (POST)
        const { id, ...productoSinId } = nuevoProducto;
        crearProductoAPI(productoSinId)
            .then((guardado) => {
                // Actualiza el ID temporal por el verdadero que dio la base de datos
                setInventario((prev) => prev.map((p) => p.id === nuevoProducto.id ? guardado : p));
            })
            .catch((err) => console.error("Error al crear producto:", err));
    };

    const editarProductoAdmin = (id: number, productoActualizado: ProductoInventario) => {
        // Reemplazamos solo el producto que coincida con el ID 
        setInventario(inventario.map(prod => prod.id === id ? productoActualizado : prod));

        // Actualización en MySQL (PUT)
        actualizarProductoAPI(id, productoActualizado)
            .catch((err) => console.error("Error al editar producto:", err));
    };

    const eliminarProductoAdmin = (id: number) => {
        // Filtramos para conservar todos menos el que queremos borrar 
        setInventario(inventario.filter(prod => prod.id !== id));

        // Borrado en MySQL (DELETE)
        eliminarProductoAPI(id)
            .catch((err) => console.error("Error al eliminar producto:", err));
    };

    const sumarStockRapido = (id: number) => {
        const productoActual = inventario.find((prod) => prod.id === id);
        if (!productoActual) return;

        const productoConMasStock: ProductoInventario = {
            ...productoActual,
            stock: productoActual.stock + 10,
        };

        // Reemplazamos solo el producto que coincida con el ID 
        setInventario(inventario.map(prod => prod.id === id ? productoConMasStock : prod));

        // Actualización en MySQL (PUT)
        actualizarProductoAPI(id, productoConMasStock)
            .catch((err) => console.error("Error al sumar stock:", err));
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
                
                // Actualización en MySQL (PUT)
                actualizarProductoAPI(nuevoInventario[indexProducto].id, nuevoInventario[indexProducto])
                    .catch((err) => console.error("Error descontando stock:", err));
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