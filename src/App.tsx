import { Routes, Route } from "react-router-dom";
import Navbar from "./components/organism/Navbar";
import Footer from "./components/organism/Footer";
import Inicio from "./pages/Inicio";
import Catalogo from "./pages/Catalogo";
import DetalleProducto from "./pages/DetalleProducto";
import ConsejoTaladro from "./pages/ConsejoTaladro";
import ConsejoSeguridad from "./pages/ConsejoSeguridad";
import CarritoOffcanvas from "./components/organism/CarritoOffCanvas";
import Checkout from "./pages/Checkout";

function App() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <CarritoOffcanvas />

            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/catalogo" element={<Catalogo />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/detalle/:id" element={<DetalleProducto />} />{" "}
                <Route path="/consejos/taladro" element={<ConsejoTaladro />} />
                <Route
                    path="/consejos/seguridad"
                    element={<ConsejoSeguridad />}
                />
            </Routes>

            <Footer />
        </div>
    );
}

export default App;
