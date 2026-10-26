
 // @vitest-environment jsdom
import { test, expect, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { useState } from "react";

import FiltroProductos from "../components/molecules/FiltroProductos";
import { productosBase } from "../data/productos";

// Componente para controlar los filtros durante las pruebas
const PruebaFiltros = () => {
    const [busqueda, setBusqueda] = useState("");
    const [categoria, setCategoria] = useState("");
    const [marca, setMarca] = useState("");
    const [precioMinimo, setPrecioMinimo] = useState("");
    const [precioMaximo, setPrecioMaximo] = useState("");

    const limpiarFiltros = () => {
        setBusqueda("");
        setCategoria("");
        setMarca("");
        setPrecioMinimo("");
        setPrecioMaximo("");
    };

    return (
        <FiltroProductos
            productos={productosBase}
            busqueda={busqueda}
            categoria={categoria}
            marca={marca}
            precioMinimo={precioMinimo}
            precioMaximo={precioMaximo}
            onBusquedaChange={setBusqueda}
            onCategoriaChange={setCategoria}
            onMarcaChange={setMarca}
            onPrecioMinimoChange={setPrecioMinimo}
            onPrecioMaximoChange={setPrecioMaximo}
            onLimpiar={limpiarFiltros}
        />
    );
};

afterEach(() => {
    cleanup();
});


// PRUEBA 1: Limpiar filtros
// Prueba 15 del informe.
test("limpia los filtros seleccionados", () => {
    render(<PruebaFiltros />);

    const buscador = screen.getByRole("searchbox");

    fireEvent.change(buscador, {
        target: { value: "taladro" },
    });

    fireEvent.click(
        screen.getByRole("button", { name: "Mostrar filtros" })
    );

    fireEvent.click(
        screen.getByRole("button", { name: "Limpiar filtros" })
    );

    expect(buscador).toHaveValue("");
});
