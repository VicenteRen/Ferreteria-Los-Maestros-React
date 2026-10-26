// @vitest-environment jsdom
import { test, expect, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

import FormularioContacto from "../components/organism/FormularioContacto";

// Limpia el HTML virtual después de cada prueba para que no se dupliquen los formularios
afterEach(() => {
    cleanup();
});

// PRUEBA 1: Verifica que al enviar el formulario sin nombre se muestre un error y se destaque su campo.
// Prueba 19 del informe.
test("muestra mensaje de error y aplica la clase is-invalid de Bootstrap cuando el nombre está vacío", () => {
    render(<FormularioContacto />);

    // Simulamos que el usuario presiona el botón de enviar sin llenar nada
    const botonEnviar = screen.getByRole("button", { name: "Enviar Mensaje" });
    fireEvent.click(botonEnviar);

    // Comprobamos que aparezca el texto de validación con las clases de Bootstrap
    const mensajeError = screen.getByText("El nombre es obligatorio.");
    expect(mensajeError).toBeInTheDocument();
    expect(mensajeError).toHaveClass("invalid-feedback", "fw-bold");

    // Comprobamos que el input de nombre haya recibido la clase is-invalid de Bootstrap
    const inputNombre = screen.getByPlaceholderText("Tu nombre completo");
    expect(inputNombre).toHaveClass("form-control", "is-invalid");
});
