import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/molecules/ProductCard";
import FiltroProductos from "../components/molecules/FiltroProductos";
import { CarritoContext } from "../context/CarritoContext";

const Catalogo = () => {
    // En lugar de importar el archivo estático, sacamos el 'inventario' del contexto vivo
    const { inventario } = useContext(CarritoContext);

    // Estados de los filtros
    const [busqueda, setBusqueda] = useState("");
    const [categoria, setCategoria] = useState("");
    const [marca, setMarca] = useState("");
    const [precioMinimo, setPrecioMinimo] = useState("");
    const [precioMaximo, setPrecioMaximo] = useState("");

    // Ignorar mayúsculas y tildes
    const normalizarTexto = (texto: string) =>
        texto
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();

    // Filtrar el inventario
    const productosFiltrados = inventario.filter((producto) => {
        const informacion = [
            producto.nombre,
            producto.marca,
            producto.categoria,
            producto.subcategoria,
        ].join(" ");

        const coincideBusqueda = normalizarTexto(informacion).includes(
            normalizarTexto(busqueda.trim())
        );

        const coincideCategoria =
            !categoria || producto.categoria === categoria;

        const coincideMarca =
            !marca || producto.marca === marca;

        const coincidePrecioMinimo =
            precioMinimo === "" ||
            producto.precio >= Math.max(0, Number(precioMinimo));

        const coincidePrecioMaximo =
            precioMaximo === "" ||
            producto.precio <= Math.max(0, Number(precioMaximo));

        return (
            coincideBusqueda &&
            coincideCategoria &&
            coincideMarca &&
            coincidePrecioMinimo &&
            coincidePrecioMaximo
        );
    });

    // Restablecer los filtros
    const limpiarFiltros = () => {
        setBusqueda("");
        setCategoria("");
        setMarca("");
        setPrecioMinimo("");
        setPrecioMaximo("");
    };


    

    return (
        <main className="container py-5 my-5 flex-grow-1">
            <div className="row mb-4 align-items-center">
                <div className="col-md-8">
                    <h1 className="fw-bold text-brand-dark">
                        Nuestro Catálogo
                    </h1>
                    <p className="text-muted">
                        Encuentra las mejores herramientas y materiales para tu
                        proyecto.
                    </p>
                </div>
            </div>

            {/* Buscador y filtros avanzados */}
            <FiltroProductos
                productos={inventario}
                busqueda={busqueda}
                categoria={categoria}
                marca={marca}
                precioMinimo={precioMinimo}
                precioMaximo={precioMaximo}
                onBusquedaChange={setBusqueda}
                onCategoriaChange={setCategoria}
                onMarcaChange={setMarca}
                onPrecioMinimoChange={setPrecioMinimo}
                onPrecioMaximoChange={setPrecioMaximo}
                onLimpiar={limpiarFiltros}
            />

            <p className="text-muted mb-3">
                Mostrando {productosFiltrados.length} de {inventario.length} productos
            </p>


            {/* Iteramos sobre el INVENTARIO vivo, no sobre el archivo base */}
            <div className="row g-4" id="contenedor-catalogo">
                {productosFiltrados.length > 0 ? (
                    productosFiltrados.map((producto) => (
                    <div className="col-md-3" key={producto.id}>
                        <ProductCard producto={producto} />
                    </div>
                ))
            ) : (
                <div className="col-12 text-center py-5">
                    <i
                        className="bi bi-search fs-1 text-muted"
                        aria-hidden="true"
                    />
                    <p className="text-muted mt-3">
                        No se encontraron productos con los filtros seleccionados.
                    </p>
                </div>
            )}
        </div>

            <div className="text-center mt-5">
                <Link to="/" className="btn btn-outline-dark btn-lg fw-bold">
                    Volver a la página de inicio
                </Link>
            </div>
        </main>
    );
};

export default Catalogo;
