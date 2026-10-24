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

test("muestra los campos correctos al cargar el formulario de nuevo usuario", () => {
    render(<FormularioUsuarioAdmin usuarioAEditar={null} volverATabla={mockVolverATabla} guardarUsuario={mockGuardarUsuario} usuariosActuales={usuariosBase} />);
    
    expect(screen.getByText("Crear Nuevo Usuario")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Ej: 11222333K")).toBeInTheDocument();
});

test("deshabilita el input de RUT y cambia el título cuando se edita un usuario", () => {
    render(<FormularioUsuarioAdmin usuarioAEditar={usuariosBase[0]} volverATabla={mockVolverATabla} guardarUsuario={mockGuardarUsuario} usuariosActuales={usuariosBase} />);
    
    const inputRut = screen.getByPlaceholderText("Ej: 11222333K");
    expect(inputRut).toBeDisabled();
    expect(screen.getByText("Editar Usuario")).toBeInTheDocument();
});

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

test("vuelve a la tabla al hacer clic en el botón cancelar", () => {
    render(<FormularioUsuarioAdmin usuarioAEditar={null} volverATabla={mockVolverATabla} guardarUsuario={mockGuardarUsuario} usuariosActuales={usuariosBase} />);
    
    fireEvent.click(screen.getByRole("button", { name: "Cancelar" }));
    expect(mockVolverATabla).toHaveBeenCalledTimes(1);
});

test("muestra alerta y detiene el guardado si faltan campos obligatorios", () => {
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});
    render(<FormularioUsuarioAdmin usuarioAEditar={null} volverATabla={mockVolverATabla} guardarUsuario={mockGuardarUsuario} usuariosActuales={usuariosBase} />);
    
    fireEvent.click(screen.getByRole("button", { name: "Guardar Usuario" }));
    
    expect(alertMock).toHaveBeenCalledWith("RUT, nombre y correo son obligatorios.");
    expect(mockGuardarUsuario).not.toHaveBeenCalled();
});

test("muestra alerta de error si el RUT no cumple con el algoritmo de módulo 11", () => {
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});
    render(<FormularioUsuarioAdmin usuarioAEditar={null} volverATabla={mockVolverATabla} guardarUsuario={mockGuardarUsuario} usuariosActuales={usuariosBase} />);
    
    fireEvent.change(screen.getByPlaceholderText("Ej: 11222333K"), { target: { value: "123456789" } });
    fireEvent.change(screen.getByLabelText("Nombre Completo *"), { target: { value: "Juan Perez" } });
    fireEvent.change(screen.getByLabelText("Correo Electrónico *"), { target: { value: "juan@test.cl" } });
    
    fireEvent.click(screen.getByRole("button", { name: "Guardar Usuario" }));
    
    expect(alertMock).toHaveBeenCalledWith("El RUT ingresado no es válido. Ingréselo sin puntos ni guión (Ej: 123456789).");
});

test("valida que el teléfono cumpla con el formato chileno usando alerta", () => {
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});
    render(<FormularioUsuarioAdmin usuarioAEditar={null} volverATabla={mockVolverATabla} guardarUsuario={mockGuardarUsuario} usuariosActuales={usuariosBase} />);
    
    fireEvent.change(screen.getByPlaceholderText("Ej: 11222333K"), { target: { value: "123456785" } });
    fireEvent.change(screen.getByLabelText("Nombre Completo *"), { target: { value: "Juan Perez" } });
    fireEvent.change(screen.getByLabelText("Correo Electrónico *"), { target: { value: "juan@test.cl" } });
    fireEvent.change(screen.getByPlaceholderText("+56912345678"), { target: { value: "56912345678" } }); 
    
    fireEvent.click(screen.getByRole("button", { name: "Guardar Usuario" }));
    
    expect(alertMock).toHaveBeenCalledWith("El formato del teléfono debe ser chileno válido. Ejemplo exacto: +56912345678");
});

test("bloquea el formulario si se ingresa un correo que ya está en uso", () => {
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});
    render(<FormularioUsuarioAdmin usuarioAEditar={null} volverATabla={mockVolverATabla} guardarUsuario={mockGuardarUsuario} usuariosActuales={usuariosBase} />);
    
    fireEvent.change(screen.getByPlaceholderText("Ej: 11222333K"), { target: { value: "123456785" } });
    fireEvent.change(screen.getByLabelText("Nombre Completo *"), { target: { value: "Nuevo Usuario" } });
    fireEvent.change(screen.getByLabelText("Correo Electrónico *"), { target: { value: "admin@ejemplo.cl" } }); 
    
    fireEvent.click(screen.getByRole("button", { name: "Guardar Usuario" }));
    
    expect(alertMock).toHaveBeenCalledWith("Este correo electrónico ya está registrado en el sistema.");
});

test("impide que el único administrador se cambie a rol de vendedor", () => {
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});
    render(<FormularioUsuarioAdmin usuarioAEditar={usuariosBase[0]} volverATabla={mockVolverATabla} guardarUsuario={mockGuardarUsuario} usuariosActuales={usuariosBase} />);
    
    fireEvent.change(screen.getByLabelText("Rol en el Sistema *"), { target: { value: "vendedor" } });
    fireEvent.click(screen.getByRole("button", { name: "Guardar Usuario" }));
    
    expect(alertMock).toHaveBeenCalledWith("Operación denegada. Eres el único Administrador del sistema y no puedes quitarte este rol.");
});