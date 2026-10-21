// @vitest-environment jsdom
import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { MemoryRouter } from "react-router-dom";

import Boton from "../components/atoms/Boton";

test("el botón como enlace muestra el texto correcto y aplica las clases de Bootstrap", () => {
    render(
        <MemoryRouter>
            <Boton
                texto="Ver Catálogo"
                esLink={true}
                ruta="/catalogo"
                clasesAdicionales="btn-lg"
            />
        </MemoryRouter>,
    );

    const boton = screen.getByText("Ver Catálogo");

    // Comprobamos el texto y las clases de Bootstrap
    expect(boton.textContent).toBe("Ver Catálogo");
    expect(boton).toHaveClass("btn", "btn-orange", "btn-lg");
});

test("el botón normal aplica la clase btn-secondary de Bootstrap cuando está deshabilitado", () => {
    render(
        <Boton
            texto="Producto Agotado"
            variante="btn-secondary"
            clasesAdicionales="w-100"
            deshabilitado={true}
        />,
    );

    const boton = screen.getByRole("button", { name: "Producto Agotado" });

    expect(boton).toBeDisabled();
    expect(boton).toHaveClass("btn", "btn-secondary", "w-100");
});
