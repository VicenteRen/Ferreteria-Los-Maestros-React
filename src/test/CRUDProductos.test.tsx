
 // @vitest-environment jsdom
import { test, expect, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { useContext } from "react";

import { CarritoContext, CarritoProvider } from "../context/CarritoContext";
import { productosBase } from "../data/productos";

// Producto ficticio que utilizaremos en las pruebas
const productoNuevo = {
    ...productosBase[0],
    id: 99999,
    nombre: "Producto de prueba",
};

// Componente pequeño para comprobar el CRUD del inventario
const PruebaCRUD = () => {
    const {
        inventario,
        agregarProductoAdmin,
        editarProductoAdmin,
        eliminarProductoAdmin,
    } = useContext(CarritoContext);

    const productoOriginal = productosBase[0];

    return (
        <div>
            <ul>
                {inventario.map((producto) => (
                    <li key={producto.id}>{producto.nombre}</li>
                ))}
            </ul>

            <button onClick={() => agregarProductoAdmin(productoNuevo)}>
                Crear producto
            </button>

            <button
                onClick={() =>
                    editarProductoAdmin(productoOriginal.id, {
                        ...productoOriginal,
                        nombre: "Producto actualizado",
                    })
                }
            >
                Editar producto
            </button>

            <button
                onClick={() => eliminarProductoAdmin(productoOriginal.id)}
            >
                Eliminar producto
            </button>
        </div>
    );
};

// Cada prueba comienza con el inventario original
beforeEach(() => {
    localStorage.removeItem("inventarioFerreteria");
});

afterEach(() => {
    cleanup();
});

// PRUEBA 1: CREATE
test("CRUD: permite crear un producto", () => {
    render(
        <CarritoProvider>
            <PruebaCRUD />
        </CarritoProvider>
    );

    fireEvent.click(screen.getByText("Crear producto"));

    expect(screen.getByText("Producto de prueba")).toBeInTheDocument();
});

// PRUEBA 2: READ
test("CRUD: muestra los productos del inventario", () => {
    render(
        <CarritoProvider>
            <PruebaCRUD />
        </CarritoProvider>
    );

    expect(
        screen.getByText(productosBase[0].nombre)
    ).toBeInTheDocument();
});

// PRUEBA 3: UPDATE
test("CRUD: permite actualizar un producto", () => {
    render(
        <CarritoProvider>
            <PruebaCRUD />
        </CarritoProvider>
    );

    fireEvent.click(screen.getByText("Editar producto"));

    expect(screen.getByText("Producto actualizado")).toBeInTheDocument();

    expect(
        screen.queryByText(productosBase[0].nombre)
    ).not.toBeInTheDocument();
});

// PRUEBA 4: DELETE
test("CRUD: permite eliminar un producto", () => {
    render(
        <CarritoProvider>
            <PruebaCRUD />
        </CarritoProvider>
    );

    fireEvent.click(screen.getByText("Eliminar producto"));

    expect(
        screen.queryByText(productosBase[0].nombre)
    ).not.toBeInTheDocument();
});
