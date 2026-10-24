// @vitest-environment jsdom
import { test, expect, afterEach, vi } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import TablaUsuariosAdmin from "../components/organism/TablaUsuariosAdmin";

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
});

const mockOnEditar = vi.fn();
const mockOnEliminar = vi.fn();

const usuariosPrueba = [
    { id: 1, rut: "111111111", nombreCompleto: "El Admin", correo: "admin@ejemplo.cl", rol: "admin" as const, region: "RM", comuna: "Santiago", telefono: "+56911112222" },
    { id: 2, rut: "222222222", nombreCompleto: "El Vendedor", correo: "vendedor@ejemplo.cl", rol: "vendedor" as const, region: "RM", comuna: "Providencia", telefono: "+56933334444" }
];

test("muestra un mensaje indicando que no hay usuarios cuando la lista está vacía", () => {
    render(<TablaUsuariosAdmin usuarios={[]} onEditar={mockOnEditar} onEliminar={mockOnEliminar} />);
    expect(screen.getByText("No hay usuarios registrados.")).toBeInTheDocument();
});

test("renderiza correctamente las filas de la tabla con los usuarios registrados", () => {
    const { container } = render(<TablaUsuariosAdmin usuarios={usuariosPrueba} onEditar={mockOnEditar} onEliminar={mockOnEliminar} />);
    
    expect(screen.getByText("El Admin")).toBeInTheDocument();
    expect(screen.getByText("El Vendedor")).toBeInTheDocument();
    
    const filas = container.querySelectorAll("tr");
    expect(filas.length).toBe(3);
});

test("aplica las clases bg-primary y bg-warning de Bootstrap según el rol del usuario", () => {
    const { container } = render(<TablaUsuariosAdmin usuarios={usuariosPrueba} onEditar={mockOnEditar} onEliminar={mockOnEliminar} />);
    
    const badgeAdmin = container.querySelector(".badge.bg-primary");
    const badgeVendedor = container.querySelector(".badge.bg-warning.text-dark");
    
    expect(badgeAdmin).toBeInTheDocument();
    expect(badgeVendedor).toBeInTheDocument();
});

test("emite los eventos de editar y eliminar con los datos correctos al hacer clic en los botones", () => {
    render(<TablaUsuariosAdmin usuarios={usuariosPrueba} onEditar={mockOnEditar} onEliminar={mockOnEliminar} />);
    
    const botonesEditar = document.querySelectorAll(".btn-outline-primary");
    const botonesEliminar = document.querySelectorAll(".btn-outline-danger");
    
    fireEvent.click(botonesEditar[0]);
    expect(mockOnEditar).toHaveBeenCalledWith(usuariosPrueba[0]);
    
    fireEvent.click(botonesEliminar[1]);
    expect(mockOnEliminar).toHaveBeenCalledWith(usuariosPrueba[1].id);
});