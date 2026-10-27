interface IconoProps {
    nombre: string; // Ej: 'search', 'sliders', 'eye', 'eye-slash'
    clasesAdicionales?: string;
}

const Icono = ({ nombre, clasesAdicionales = "" }: IconoProps) => {
    return (
        <i
            className={`bi bi-${nombre} ${clasesAdicionales}`.trim()}
            aria-hidden="true"
        />
    );
};

export default Icono;
