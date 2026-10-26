
 // @vitest-environment jsdom
import { test, expect, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { MemoryRouter } from "react-router-dom";

import FormularioRegistro from "../components/organism/FormularioRegistro";

// Limpiar después de cada prueba
afterEach(() => {
    cleanup();
});

// PRUEBA 1: Renderizado
// Prueba 04 del informe.
test("muestra el botón CREAR CUENTA en el formulario de Registro", () => {
    render(
        <MemoryRouter>
            <FormularioRegistro />
        </MemoryRouter>
    );

    const boton = screen.getByRole("button", { name: "CREAR CUENTA" });

    expect(boton).toBeInTheDocument();
});

// PRUEBA 2: RUN inválido
// Prueba 05 del informe.
test("muestra un error cuando el RUN no es válido", () => {
    render(
        <MemoryRouter>
            <FormularioRegistro />
        </MemoryRouter>
    );

    const campoRun = screen.getByLabelText("RUN *");

    fireEvent.change(campoRun, {
        target: { value: "12345678K" },
    });

    expect(
        screen.getByText("Ingresa un RUN válido.")
    ).toBeInTheDocument();
});

// PRUEBA 3: Contraseñas diferentes
// Prueba 06 del informe.
test("muestra un error cuando las contraseñas no coinciden", () => {
    render(
        <MemoryRouter>
            <FormularioRegistro />
        </MemoryRouter>
    );

    const campoContrasena = screen.getByLabelText("CONTRASEÑA *");
    const campoConfirmar = screen.getByLabelText("CONFIRMAR CONTRASEÑA *");

    fireEvent.change(campoContrasena, {
        target: { value: "Clave123" },
    });

    fireEvent.change(campoConfirmar, {
        target: { value: "Otra123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "CREAR CUENTA" }));

    expect(
        screen.getByText("Las contraseñas no coinciden.")
    ).toBeInTheDocument();
});
