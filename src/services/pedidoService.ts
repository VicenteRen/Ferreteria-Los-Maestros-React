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
