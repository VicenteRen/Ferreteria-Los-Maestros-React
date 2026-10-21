// @vitest-environment jsdom
import { test, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { MemoryRouter } from "react-router-dom";

import Hero from "../components/organism/Hero";

afterEach(() => {
    cleanup();
});

test("el componente Hero aplica las clases Flexbox y de altura completa de Bootstrap", () => {
    const { container } = render(
        <MemoryRouter>
            <Hero />
        </MemoryRouter>,
    );

    const seccionHero = container.querySelector("#inicio");

    expect(seccionHero).not.toBeNull();
    expect(seccionHero).toHaveClass(
        "text-center",
        "text-white",
        "vh-100",
        "d-flex",
        "align-items-center",
    );
});

test("el título principal tiene las clases tipográficas de Bootstrap display-4 y fw-bold", () => {
    render(
        <MemoryRouter>
            <Hero />
        </MemoryRouter>,
    );

    const titulo = screen.getByRole("heading", {
        name: "Todo lo que necesitas para construir",
    });
    expect(titulo).toHaveClass("display-4", "fw-bold", "mb-3");
});
