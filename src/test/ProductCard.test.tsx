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

test("renderiza la tarjeta con las clases card y shadow-sm de Bootstrap cuando hay stock", () => {
    const { container } = render(
        <MemoryRouter>
            <ProductCard producto={productoConStock} />
        </MemoryRouter>,
    );

    const tarjeta = container.querySelector(".card");
    expect(tarjeta).not.toBeNull();
    expect(tarjeta).toHaveClass("card", "h-100", "shadow-sm", "border-0");
    expect(tarjeta).not.toHaveClass("opacity-50");
});

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
