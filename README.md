
# 🛠️ Ferretería Los Maestros - Aplicación Web (React)

Aplicación web de comercio electrónico desarrollada con React y TypeScript para la gestión de una ferretería. Permite consultar productos, realizar compras mediante un carrito y administrar la información de la tienda desde un panel de control.

El frontend se encuentra integrado con cuatro microservicios desarrollados en Java y Spring Boot, encargados de gestionar usuarios, productos, mensajes y ventas.

Proyecto académico desarrollado para la asignatura **Desarrollo Fullstack II**, de la carrera de Ingeniería en Informática de Duoc UC.

##  Características principales

### Catálogo y carrito de compras

- Visualización de productos con imágenes, precios, categorías, descripciones y disponibilidad.
- Búsqueda y filtrado de productos.
- Consulta de detalles individuales.
- Carrito de compras persistente mediante `localStorage`.
- Control de cantidades y cálculo automático de totales.
- Proceso de checkout con datos del cliente, dirección de envío y pago simulado.
- Registro de pedidos mediante el microservicio de Ventas y actualización del inventario después de una compra confirmada.

### Registro e inicio de sesión

- Registro de clientes mediante formularios con validaciones.
- Inicio de sesión conectado al microservicio de Usuarios.
- Validación de RUN, correo electrónico y contraseñas.
- Manejo de sesiones mediante `localStorage` y `sessionStorage`.
- Diferenciación de roles: cliente, vendedor y administrador.
- Acceso al panel administrativo según el rol de la sesión.

### Panel administrativo

El administrador dispone de un panel con indicadores generales y cuatro secciones de gestión.

**Gestión de Productos**
- Crear, consultar, editar y eliminar productos.
- Validar códigos SKU duplicados.
- Validar precios, existencias y campos obligatorios.
- Actualizar rápidamente las cantidades del inventario.
- Configurar stock mínimo y visualizar alertas de existencias bajas.
- Registrar modificaciones mediante el microservicio de Productos.

**Gestión de Usuarios**
- Consultar usuarios registrados en MySQL.
- Crear, editar y eliminar cuentas.
- Administrar información personal y roles.
- Evitar la eliminación del único administrador desde la interfaz.
- Realizar operaciones mediante el microservicio de Usuarios.

**Gestión de Mensajes**
- Consultar los mensajes recibidos desde el formulario de contacto.
- Visualizar datos del remitente, contenido, fecha y estado.
- Marcar mensajes como `ATENDIDO`.
- Eliminar mensajes con confirmación.
- Disponer de una interfaz para redactar respuestas de demostración.

La opción Responder simula el envío de un correo y permite actualizar el estado del mensaje. No realiza un envío real ni almacena el texto de la respuesta.

**Gestión de Ventas**
- Consultar las ventas registradas en el backend.
- Visualizar clientes, productos comprados, cantidades, fechas, totales y estados.
- Anular ventas confirmadas mediante una ventana de confirmación.
- Actualizar el listado después de realizar una operación.
- Diferenciar ventas `CONFIRMADO` y `ANULADO`.
- Integración con el microservicio de Ventas para consultar y anular pedidos.

La actualización de ventas mediante PUT está disponible en el backend, pero no cuenta con un formulario de edición en React.

### Formulario de contacto

- Envío de consultas desde la página web.
- Validación de nombre, correo y mensaje.
- Registro de contactos en MySQL mediante el microservicio de Mensajes.
- Mensajes visuales de confirmación y error.

##  Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| React 19 | Desarrollo de interfaces y componentes |
| TypeScript | Programación del frontend |
| Vite 8 | Servidor de desarrollo y compilación |
| React Router 7 | Navegación y rutas de la aplicación |
| Bootstrap 5 | Diseño responsivo y componentes visuales |
| Bootstrap Icons | Iconografía |
| Context API | Gestión del carrito y del inventario |
| Fetch API | Comunicación HTTP con los microservicios |
| LocalStorage / SessionStorage | Persistencia del carrito, inventario y sesión |
| Vitest | Pruebas del frontend |
| React Testing Library | Pruebas de componentes |
| Git / GitHub | Control de versiones y trabajo colaborativo |

## 🔗 Integración con los microservicios

La aplicación consume cuatro APIs REST desarrolladas con Spring Boot.

| Microservicio | Puerto | Funcionalidad |
|---|---|---|
| Usuarios | 8081 | Registro, inicio de sesión y administración de cuentas |
| Mensajes | 8082 | Registro, consulta y atención de mensajes |
| Productos | 8083 | Catálogo, administración de productos e inventario |
| Ventas | 8084 | Registro, consulta y anulación de pedidos |

React realiza solicitudes HTTP mediante `fetch` a los servicios locales.

Las conexiones se encuentran principalmente en `src/services/`, además de los componentes que gestionan los mensajes de contacto.

El registro de compras envía los productos seleccionados al microservicio de Ventas, que se comunica con Productos para validar los artículos y modificar el inventario.

**Repositorio del backend:**

https://github.com/VicenteRen/Microservicios-FLM

La arquitectura, los endpoints, las bases de datos y las instrucciones de ejecución de los microservicios se encuentran documentados en su propio README.

##  Estructura del proyecto

```text
src/
├── assets/             # Recursos gráficos
├── components/
│   ├── atoms/          # Componentes básicos
│   ├── molecules/      # Componentes compuestos
│   └── organism/       # Formularios, tablas y secciones
├── context/
│   └── CarritoContext.tsx
├── data/               # Datos iniciales y regiones
├── pages/              # Páginas de la aplicación
├── services/           # Conexión con las APIs REST
├── test/               # Pruebas automatizadas
├── utils/              # Funciones de validación
├── App.tsx             # Configuración de rutas
└── main.tsx            # Punto de entrada
```

##  Instalación y ejecución

### 1. Requisitos previos

- Node.js y npm instalados.
- Visual Studio Code u otro editor compatible.
- MySQL y los microservicios Spring Boot configurados para utilizar todas las funciones conectadas al backend.

### 2. Clonar el repositorio

```bash
git clone https://github.com/VicenteRen/Ferreteria-Los-Maestros-React.git
cd Ferreteria-Los-Maestros-React
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Iniciar el proyecto

```bash
npm run dev
```

Abrir en el navegador la dirección indicada por Vite, normalmente:

http://localhost:5173

### 5. Ejecutar con el backend

Para utilizar el registro de usuarios, los mensajes, el inventario de MySQL y las compras, deben estar iniciados:

- MySQL en el puerto `3306`.
- Usuarios en el puerto `8081`.
- Mensajes en el puerto `8082`.
- Productos en el puerto `8083`.
- Ventas en el puerto `8084`.

Se recomienda iniciar Productos antes de utilizar las operaciones de Ventas.

El frontend dispone de productos iniciales y almacenamiento local para el catálogo. Cuando la base de datos de Productos está vacía, intenta registrar los productos base automáticamente.

Si los servicios no están disponibles, React puede mostrar información local; sin embargo, las operaciones que requieren MySQL no se completarán hasta restablecer la conexión.

##  Pruebas y compilación

El proyecto incluye pruebas de componentes y funcionalidades desarrolladas con Vitest y React Testing Library.

**Ejecutar pruebas:**

```bash
npm run test
```

**Ejecutar las pruebas una sola vez:**

```bash
npm run test -- --run
```

**Comprobar la compilación:**

```bash
npm run build
```

**Revisar el código con ESLint:**

```bash
npm run lint
```

**Visualizar la versión compilada:**

```bash
npm run preview
```

##  Consideraciones

- El acceso al panel administrativo se controla desde React según el rol almacenado en la sesión.
- La autenticación se realiza mediante el microservicio de Usuarios.
- El formulario de pago es una simulación y no efectúa cobros bancarios.
- La función Responder mensajes es demostrativa y no envía correos electrónicos reales.
- Las operaciones de compra y anulación dependen de la disponibilidad de los microservicios de Ventas y Productos.
- La configuración actual está orientada a un entorno académico local. Para un despliegue público se requieren mecanismos adicionales de autenticación, autorización y protección de datos.

##  Integrantes

- Emilia Gallardo
- Vicente Ponce
- Vicente Céspedes
