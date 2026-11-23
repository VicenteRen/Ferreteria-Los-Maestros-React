const API_PEDIDOS = "http://localhost:8084/api/ventas";

export interface NuevoPedido {
    nombreCliente: string;
    apellidosCliente: string;
    correoCliente: string;
    direccionEnvio: string;
    region: string;
    comuna: string;
    productos: {
        productoId: number;
        cantidad: number;
    }[];
}

export interface PedidoRegistrado {
    id: number;
    total: number;
    estado: string;
}

export const crearPedidoAPI = async (
    pedido: NuevoPedido
): Promise<PedidoRegistrado> => {

    const respuesta = await fetch(API_PEDIDOS, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(pedido)
    });

    if (!respuesta.ok) {
        throw new Error(
            `No se pudo registrar el pedido (HTTP ${respuesta.status}). ` +
            "Comprueba ventas, productos y el inventario antes de reintentar."
        );
    }

    const registrado: PedidoRegistrado = await respuesta.json();

    if (
        !Number.isInteger(registrado.id) ||
        !Number.isFinite(Number(registrado.total))
    ) {
        throw new Error(
            "Respuesta inesperada. Revisa los pedidos en Swagger antes de repetir la compra."
        );
    }

    return registrado;
};


export interface DetalleVenta {
    productoId: number;
    nombreProducto: string;
    cantidad: number;
    precioUnitario: number;
    subtotal: number;
}

export interface VentaRegistrada {
    id: number;
    nombreCliente: string;
    apellidosCliente: string;
    correoCliente: string;
    direccionEnvio: string;
    region: string;
    comuna: string;
    total: number;
    fechaPedido: string;
    estado: string;
    productos: DetalleVenta[];
}

export const listarVentasAPI = async (): Promise<VentaRegistrada[]> => {
    const respuesta = await fetch(API_PEDIDOS);

    if (!respuesta.ok) {
        throw new Error("No se pudieron cargar las ventas.");
    }

    return await respuesta.json();
};

export const anularVentaAPI = async (id: number): Promise<void> => {
    const respuesta = await fetch(`${API_PEDIDOS}/${id}`, {
        method: "DELETE"
    });

    if (respuesta.status === 404) {
        throw new Error("La venta no existe.");
    }

    if (respuesta.status === 409) {
        throw new Error("La venta ya fue anulada o no puede anularse.");
    }

    if (!respuesta.ok) {
        throw new Error(
            "No se pudo anular la venta. Revisa la conexión con los microservicios."
        );
    }
};