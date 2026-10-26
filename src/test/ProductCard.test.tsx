// @vitest-environment jsdom
import { test, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { MemoryRouter } from "react-router-dom";

import ProductCard from "../components/molecules/ProductCard";

afterEach(() => {
    cleanup();
});

const productoConStock = {
    id: 1,
    codigo: "HER-001",
    categoria: "Herramientas",
    subcategoria: "Manuales",
    nombre: "Martillo Carpintero",
    marca: "Stanley",
    unidad: "unidad",
    precioCompra: 5000,
    precio: 8990,
    stock: 10,
    stockMinimo: 2,
    imagen: "img/martillo.jpg",
    descripcion: "Martillo resistente",
};

const productoSinStock = {
    ...productoConStock,
    id: 2,
    nombre: 'Alicate Universal 8"',
    stock: 0,
};

// PRUEBA 1: Verifica que el producto sin stock muestre Agotado, use sus estilos Bootstrap y tenga el botón deshabilitado.
// Prueba 20 del informe.
test("aplica la clase opacity-50 y muestra el badge bg-danger de Bootstrap cuando el stock es 0", () => {
    const { container } = render(
        <MemoryRouter>
            <ProductCard producto={productoSinStock} />
        </MemoryRouter>,
    );

    const tarjeta = container.querySelector(".card");
    const etiquetaAgotado = container.querySelector(".badge");
    const botonAgotado = screen.getByRole("button", { name: "Agotado" });

    expect(tarjeta).toHaveClass("opacity-50");
    expect(etiquetaAgotado).toHaveClass("badge", "bg-danger");
    expect(botonAgotado).toBeDisabled();
    expect(botonAgotado).toHaveClass("btn", "btn-secondary");
});
