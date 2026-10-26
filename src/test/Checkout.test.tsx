// @vitest-environment jsdom
import { test, expect, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { MemoryRouter } from "react-router-dom";
import { CarritoProvider } from "../context/CarritoContext";

import Checkout from "../pages/Checkout";

afterEach(() => {
    cleanup();
    localStorage.clear();
});

// PRUEBA 1: Verifica que el botón Confirmar y Pagar debe seguir deshabilitado con carrito vacío y conservar sus clases de Bootstrap.
// Prueba 17 del informe.
test("el botón Confirmar y Pagar aplica clases de Bootstrap y se deshabilita si el carrito está vacío", () => {
    render(
        <CarritoProvider>
            <MemoryRouter>
                <Checkout />
            </MemoryRouter>
        </CarritoProvider>,
    );

    const botonPagar = screen.getByRole("button", {
        name: "Confirmar y Pagar",
    });
    expect(botonPagar).toBeDisabled();
    expect(botonPagar).toHaveClass(
        "btn",
        "btn-success",
        "w-100",
        "btn-lg",
        "fw-bold",
    );
});
// PRUEBA 2: Verifica que el formulario de Checkout identifique los campos obligatorios que están vacíos.
// Prueba 18 del informe.
test("aplica la clase is-invalid de Bootstrap en los inputs del Checkout al enviar vacío", () => {
    // Simulamos un producto en el carrito para habilitar el botón de pago
    localStorage.setItem(
        "carritoFerreteria",
        JSON.stringify([
            {
                id: 1,
                nombre: "Alicate",
                marca: "Stanley",
                precio: 8900,
                imagen: "img.jpg",
                stock: 5,
                cantidad: 1,
            },
        ]),
    );

    const { container } = render(
        <CarritoProvider>
            <MemoryRouter>
                <Checkout />
            </MemoryRouter>
        </CarritoProvider>,
    );

    const botonPagar = screen.getByRole("button", {
        name: "Confirmar y Pagar",
    });
    fireEvent.click(botonPagar);

    const inputNombre = container.querySelector("#nombre");
    const inputNumeroTarjeta = container.querySelector("#numeroTarjeta");

    expect(inputNombre).toHaveClass("form-control", "is-invalid");
    expect(inputNumeroTarjeta).toHaveClass("form-control", "is-invalid");
    expect(screen.getByText("El nombre es obligatorio")).toBeInTheDocument();
});
