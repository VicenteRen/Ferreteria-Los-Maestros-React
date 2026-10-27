import { useState } from "react";
import type { ProductoInventario } from "../../context/CarritoContext";
import Input from "../atoms/Input";
import Icono from "../atoms/Icono";

interface FiltroProductosProps {
    productos: ProductoInventario[];
    busqueda: string;
    categoria: string;
    marca: string;
    precioMinimo: string;
    precioMaximo: string;
    onBusquedaChange: (valor: string) => void;
    onCategoriaChange: (valor: string) => void;
    onMarcaChange: (valor: string) => void;
    onPrecioMinimoChange: (valor: string) => void;
    onPrecioMaximoChange: (valor: string) => void;
    onLimpiar: () => void;
}

const FiltroProductos = ({
    productos,
    busqueda,
    categoria,
    marca,
    precioMinimo,
    precioMaximo,
    onBusquedaChange,
    onCategoriaChange,
    onMarcaChange,
    onPrecioMinimoChange,
    onPrecioMaximoChange,
    onLimpiar,
}: FiltroProductosProps) => {
    const [mostrarFiltros, setMostrarFiltros] = useState(false);

    const categorias = [...new Set(productos.map((p) => p.categoria))].sort();
    const marcas = [...new Set(productos.map((p) => p.marca))].sort();

    return (
        <div className="mb-4">
            <div className="row g-2 align-items-end">
                <div className="col-md-8">
                    <label
                        htmlFor="buscar-producto"
                        className="form-label fw-semibold"
                    >
                        Buscar productos
                    </label>
                    <div className="input-group">
                        <span className="input-group-text">
                            <Icono nombre="search" />
                        </span>
                        <Input
                            id="buscar-producto"
                            tipo="search"
                            placeholder="Ej. taladro, BOSCH, herramientas..."
                            valor={busqueda}
                            onChange={onBusquedaChange}
                        />
                    </div>
                </div>

                <div className="col-md-4">
                    <button
                        type="button"
                        className="btn btn-outline-dark w-100"
                        aria-expanded={mostrarFiltros}
                        aria-controls="filtros-avanzados"
                        onClick={() => setMostrarFiltros(!mostrarFiltros)}
                    >
                        <Icono nombre="sliders" clasesAdicionales="me-2" />
                        {mostrarFiltros ? "Ocultar filtros" : "Mostrar filtros"}
                    </button>
                </div>
            </div>

            {mostrarFiltros && (
                <div
                    id="filtros-avanzados"
                    className="border rounded bg-light p-3 mt-3"
                >
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label
                                htmlFor="filtro-categoria"
                                className="form-label"
                            >
                                Categoría
                            </label>
                            <select
                                id="filtro-categoria"
                                className="form-select"
                                value={categoria}
                                onChange={(e) =>
                                    onCategoriaChange(e.target.value)
                                }
                            >
                                <option value="">Todas las categorías</option>
                                {categorias.map((opcion) => (
                                    <option key={opcion} value={opcion}>
                                        {opcion}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label
                                htmlFor="filtro-marca"
                                className="form-label"
                            >
                                Marca
                            </label>
                            <select
                                id="filtro-marca"
                                className="form-select"
                                value={marca}
                                onChange={(e) => onMarcaChange(e.target.value)}
                            >
                                <option value="">Todas las marcas</option>
                                {marcas.map((opcion) => (
                                    <option key={opcion} value={opcion}>
                                        {opcion}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label
                                htmlFor="precio-minimo"
                                className="form-label"
                            >
                                Precio mínimo (CLP)
                            </label>
                            <Input
                                id="precio-minimo"
                                tipo="number"
                                min="0"
                                placeholder="Sin mínimo"
                                valor={precioMinimo}
                                onChange={onPrecioMinimoChange}
                            />
                        </div>

                        <div className="col-md-6">
                            <label
                                htmlFor="precio-maximo"
                                className="form-label"
                            >
                                Precio máximo (CLP)
                            </label>
                            <Input
                                id="precio-maximo"
                                tipo="number"
                                min="0"
                                placeholder="Sin máximo"
                                valor={precioMaximo}
                                onChange={onPrecioMaximoChange}
                            />
                        </div>
                    </div>

                    <div className="d-flex justify-content-end mt-3">
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={onLimpiar}
                        >
                            <Icono
                                nombre="arrow-counterclockwise"
                                clasesAdicionales="me-2"
                            />
                            Limpiar filtros
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FiltroProductos;
