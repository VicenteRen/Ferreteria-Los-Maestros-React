import { Link } from "react-router-dom";

// Definimos qué propiedades (datos) va a recibir nuestro botón
interface BotonProps {
    texto: string;
    esLink?: boolean; // ¿Es un enlace para cambiar de página?
    ruta?: string; // Hacia dónde va (si es link)
    variante?: string; // Ej: 'btn-orange', 'btn-outline-dark', 'btn-secondary'
    clasesAdicionales?: string; // Ej: 'btn-lg', 'w-100', 'mt-auto'
    deshabilitado?: boolean;
    tipo?: "button" | "submit"; // Para los formularios
    onClick?: () => void;
}

const Boton = ({
    texto,
    esLink = false,
    ruta = "#",
    variante = "btn-orange",
    clasesAdicionales = "",
    deshabilitado = false,
    tipo = "button",
    onClick,
}: BotonProps) => {
    // Armamos la clase final concatenando las partes
    const claseBase = `btn ${variante} ${clasesAdicionales}`;

    // Si le decimos que es un Link, renderiza un <Link> de React Router
    if (esLink) {
        return (
            <Link to={ruta} className={claseBase}>
                {texto}
            </Link>
        );
    }

    // Si no, renderiza un <button> normal de HTML
    return (
        <button
            type={tipo}
            className={claseBase}
            disabled={deshabilitado}
            onClick={onClick}
        >
            {texto}
        </button>
    );
};

export default Boton;
