
# 🛠️ Ferretería Los Maestros - Web App (React)

Aplicación web desarrollada en React y TypeScript para gestionar el catálogo de productos, el flujo de compras (carrito) y la administración interna de la tienda de manera intuitiva y segura.

Este proyecto fue desarrollado como parte de la carrera de Ingeniería en Informática (Duoc UC).

## 📌 Características Principales

La aplicación cuenta con una interfaz pública para clientes y un panel de control privado para el manejo seguro de la información:

- **Sistema de Roles:** Acceso diferenciado para **Vendedor** y **Administrador** (quien gestiona el sistema completo, incluyendo usuarios).
- **Flujo de Catálogo y Carrito:** Interfaz ágil para la selección de productos:
  - Búsqueda y filtrado dinámico por categorías.
  - Carrito de compras persistente.
  - Proceso simulado de Checkout.
- **Gestión de Productos (Administración):** Módulo para crear y editar el inventario con validaciones estrictas:
  - Prevención de SKUs duplicados en tiempo real.
  - Bloqueo de precios o stock negativo/cero.
  - Limpieza automática de descripciones (filtro anti-caracteres extraños).
- **Gestión de Usuarios (Administración):** Módulo para crear y gestionar cuentas de empleados, incluyendo seguros anti-eliminación para el rol de administrador.
- **Seguridad:** Validaciones de formato chileno (RUT y teléfono) y manejo de rutas protegidas según el estado de autenticación.

## 🛠️ Stack Tecnológico

- **Lenguaje:** TypeScript / JavaScript
- **Librería UI:** React 18
- **Framework de Construcción:** Vite
- **Estilos:** Bootstrap 5 (Grillas y utilidades)
- **Gestión de Estado:** Context API
- **Testing:** Vitest y React Testing Library
- **Control de Versiones:** Git / GitHub

## 🚀 Cómo ejecutar el proyecto

1. Clona este repositorio en tu equipo local: `git clone https://github.com/TU_USUARIO/Ferreteria-Los-Maestros-React.git`
2. Abre el proyecto utilizando **Visual Studio Code**.
3. Abre una terminal integrada y ejecuta `npm install` para descargar las dependencias.
4. Ejecuta `npm run dev` para levantar el servidor local.
5. Abre la URL local proporcionada en tu navegador (usualmente `http://localhost:5173`).

*(Para ejecutar la suite de pruebas unitarias, utiliza el comando `npm run test`).*

## 👥 Autores

- Emilia Gallardo
- Vicente Ponce
- Vicente Céspedes
