// @vitest-environment jsdom
import { test, expect, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { MemoryRouter } from "react-router-dom";
import { CarritoProvider } from "../context/CarritoContext";
import { productosBase } from "../data/productos";

import Catalogo from "../pages/Catalogo";

afterEach(() => {
    cleanup();
});
//PRUEBA 1: Verifica que el catálogo de productos utilice las clases de Bootstrap necesarias. 
//Prueba 21 del informe.
test("aplica la grilla responsiva de Bootstrap (row g-4 y col-md-3) en el catálogo de productos", () => {
    const { container } = render(
        <CarritoProvider>
            <MemoryRouter>
                <Catalogo />
            </MemoryRouter>
        </CarritoProvider>,
    );

    const contenedorCatalogo = container.querySelector("#contenedor-catalogo");
    const columnaProducto = container.querySelector(".col-md-3");

    expect(contenedorCatalogo).not.toBeNull();
    expect(contenedorCatalogo).toHaveClass("row", "g-4");

    expect(columnaProducto).not.toBeNull();
    expect(columnaProducto).toHaveClass("col-md-3");
});

// PRUEBA 2: comprobar que la búsqueda filtra los productos.
// Prueba 16 del informe.
test("filtra el catálogo y muestra solo el producto buscado", () => {
    // Usar el inventario original durante esta prueba
    localStorage.setItem(
        "inventarioFerreteria",
        JSON.stringify(productosBase)
    );

    render(
        <CarritoProvider>
            <MemoryRouter>
                <Catalogo />
            </MemoryRouter>
        </CarritoProvider>
    );

    // Escribir el nombre del producto en el buscador
    const buscador = screen.getByRole("searchbox");

    fireEvent.change(buscador, {
        target: { value: "Taladro Percutor" },
    });

    // Debe aparecer el taladro
    expect(
        screen.getByText("Taladro Percutor 850W")
    ).toBeInTheDocument();

    // La sierra no debe aparecer en los resultados
    expect(
        screen.queryByText('Sierra Circular 7¼"')
    ).not.toBeInTheDocument();
});
