// @vitest-environment jsdom
import { test, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { MemoryRouter } from "react-router-dom";
import { CarritoProvider } from "../context/CarritoContext";

import Catalogo from "../pages/Catalogo";

afterEach(() => {
    cleanup();
});

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

test("muestra el título principal del catálogo con las clases de Bootstrap", () => {
    render(
        <CarritoProvider>
            <MemoryRouter>
                <Catalogo />
            </MemoryRouter>
        </CarritoProvider>,
    );

    const titulo = screen.getByRole("heading", { name: "Nuestro Catálogo" });
    expect(titulo).toHaveClass("fw-bold", "text-brand-dark");
});
