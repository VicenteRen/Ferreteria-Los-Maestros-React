
# 🛠️ Ferretería Los Maestros - Aplicación Web

Aplicación web de comercio electrónico desarrollada con **React y TypeScript**, orientada a la venta de productos de ferretería y la administración de una tienda.

##  Funcionalidades principales

La aplicación cuenta con una interfaz para clientes y un panel administrativo.

**Tienda online**
- Catálogo de productos con búsqueda y filtros.
- Visualización de precios, características y disponibilidad.
- Carrito de compras persistente.
- Registro e inicio de sesión.
- Proceso de compra con pago simulado.
- Formulario de contacto.

**Panel administrativo**
- Gestión de productos e inventario.
- Administración de usuarios y perfiles.
- Consulta y gestión de mensajes de contacto.
- Visualización y anulación de ventas.
- Indicadores generales del negocio y alertas de stock.

##  Tecnologías utilizadas

- React y TypeScript.
- Vite.
- Bootstrap y Bootstrap Icons.
- React Router.
- Context API.
- Vitest y React Testing Library.
- Git y GitHub.

##  Integración con el backend

El frontend se comunica mediante APIs REST con cuatro microservicios desarrollados en Java y Spring Boot:

- **Usuarios:** registro, autenticación y administración.
- **Productos:** catálogo y control de inventario.
- **Mensajes:** recepción y gestión de consultas.
- **Ventas:** registro y administración de pedidos.

**Repositorio del backend:**  
https://github.com/VicenteRen/Microservicios-FLM

##  Instalación y ejecución

**1. Clonar el repositorio:**

```bash
git clone https://github.com/VicenteRen/Ferreteria-Los-Maestros-React.git
```

**2. Ingresar al proyecto:**

```bash
cd Ferreteria-Los-Maestros-React
```

**3. Instalar las dependencias:**

```bash
npm install
```

**4. Iniciar la aplicación:**

```bash
npm run dev
```

Para utilizar las funciones conectadas al backend, los microservicios y sus respectivas bases de datos deben estar en ejecución.

##  Pruebas

El proyecto utiliza Vitest y React Testing Library para realizar pruebas del frontend.

```bash
npm run test
```

Para comprobar la compilación:

```bash
npm run build
```
