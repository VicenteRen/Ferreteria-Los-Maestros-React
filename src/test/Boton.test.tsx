// @vitest-environment jsdom
import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

import Boton from "../components/atoms/Boton";

// PRUEBA 1: Verifica que el componente Boton esté deshabilitado y mantenga sus clases de Bootstrap.
// Prueba 07 del informe.
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
