
// @vitest-environment jsdom
import { test, expect, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { MemoryRouter } from "react-router-dom";

import FormularioLogin from "../components/organism/FormularioLogin";

// Limpiar después de cada prueba
afterEach(() => {
    cleanup();
});

// PRUEBA 1: Renderizado
test("muestra el botón INGRESAR en el formulario de Login", () => {
    render(
        <MemoryRouter>
            <FormularioLogin />
        </MemoryRouter>
    );

    const boton = screen.getByRole("button", { name: "INGRESAR" });

    expect(boton).toBeInTheDocument();
});

// PRUEBA 2: Correo inválido
test("muestra un error cuando el correo no tiene un formato válido", () => {
    render(
        <MemoryRouter>
            <FormularioLogin />
        </MemoryRouter>
    );

    const campoCorreo = screen.getByPlaceholderText("correo@empresa.cl");

    fireEvent.change(campoCorreo, {
        target: { value: "correo-invalido" },
    });

    expect(
        screen.getByText("Ingresa un correo electrónico válido.")
    ).toBeInTheDocument();
});

// PRUEBA 3: Contraseña obligatoria
test("muestra un error cuando se intenta ingresar sin contraseña", () => {
    render(
        <MemoryRouter>
            <FormularioLogin />
        </MemoryRouter>
    );

    const campoCorreo = screen.getByPlaceholderText("correo@empresa.cl");

    fireEvent.change(campoCorreo, {
        target: { value: "cliente@ejemplo.cl" },
    });

    fireEvent.click(screen.getByRole("button", { name: "INGRESAR" }));

    expect(
        screen.getByText("La contraseña es obligatoria.")
    ).toBeInTheDocument();
});
