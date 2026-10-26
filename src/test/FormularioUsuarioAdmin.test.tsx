// @vitest-environment jsdom
import { test, expect, afterEach, vi } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import FormularioUsuarioAdmin from "../components/organism/FormularioUsuarioAdmin";

// limpiamos después de cada prueba
afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
});

const mockVolverATabla = vi.fn();
const mockGuardarUsuario = vi.fn();

// datos de prueba
const usuariosBase = [
    { id: 1, rut: "111111111", nombreCompleto: "El Admin", correo: "admin@ejemplo.cl", rol: "admin" as const, region: "RM", comuna: "Santiago", telefono: "+56911112222" }
];

// PRUEBA 1: Verifica que Guardar Usuario invoque la función de guardado con datos válidos.
// Prueba 12 del informe.
test("guarda el usuario exitosamente al ingresar todos los datos válidos", () => {
    render(<FormularioUsuarioAdmin usuarioAEditar={null} volverATabla={mockVolverATabla} guardarUsuario={mockGuardarUsuario} usuariosActuales={usuariosBase} />);
    
    // simulamos el ingreso de datos por parte del usuario
    fireEvent.change(screen.getByPlaceholderText("Ej: 11222333K"), { target: { value: "123456785" } });
    fireEvent.change(screen.getByLabelText("Nombre Completo *"), { target: { value: "Juan Perez" } });
    fireEvent.change(screen.getByLabelText("Correo Electrónico *"), { target: { value: "juan@nuevo.cl" } });
    fireEvent.change(screen.getByPlaceholderText("+56912345678"), { target: { value: "+56988887777" } });
    
    fireEvent.click(screen.getByRole("button", { name: "Guardar Usuario" }));
    
    expect(mockGuardarUsuario).toHaveBeenCalledTimes(1);
});