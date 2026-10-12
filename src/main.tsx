import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { CarritoProvider } from "./context/CarritoContext.tsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <CarritoProvider>
            <App />
        </CarritoProvider>
    </BrowserRouter>,
);

/* 

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <CarritoProvider>
                <App />
            </CarritoProvider>
        </BrowserRouter>
    </React.StrictMode>,
);

*/
