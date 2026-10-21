import { useEffect, useRef, useState } from "react";
import CampoFormulario from "../molecules/CampoFormulario";
import Boton from "../atoms/Boton";

const ModalRecuperarContrasena = () => {
  const [correo, setCorreo] = useState("");
  const [error, setError] = useState("");
  const [enviado, setEnviado] = useState(false);

  
  const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const modal = modalRef.current;

      if (!modal) return;

      const limpiarFormulario = () => {
        setCorreo("");
        setError("");
        setEnviado(false);
      };

      modal.addEventListener("hidden.bs.modal", limpiarFormulario);

      return () => {
        modal.removeEventListener("hidden.bs.modal", limpiarFormulario);
      };
    }, []);


  
    const handleRecuperar = () => {
    if (correo.trim() === "") {
        setError("El correo electrónico es obligatorio.");
        return;
    }

    if (correo.trim().length > 100) {
        setError("El correo no puede superar los 100 caracteres.");
        return;
    }

    const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formatoCorreo.test(correo.trim())) {
        setError("Ingresa un correo electrónico válido.");
        return;
    }

    setError("");
    setEnviado(true);

    };


  return (
    <div
      ref={modalRef}
      className="modal fade"
      id="modalRecuperar"
      tabIndex={-1}
      aria-labelledby="tituloModalRecuperar"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title fs-5" id="tituloModalRecuperar">
              Recuperar contraseña
            </h2>

            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Cerrar"
            />
          </div>

          
            <div className="modal-body">
            <p>
                Ingresa tu correo electrónico para recibir instrucciones
                de recuperación.
            </p>

            <CampoFormulario
                id="correoRecuperacion"
                etiqueta="CORREO ELECTRÓNICO"
                tipo="email"
                valor={correo}
                placeholder="correo@ejemplo.cl"
                onChange={setCorreo}
                error={error}
            />
            </div>

            {enviado && (
                <div className="alert alert-success mt-3 mx-3 text-center" role="alert">
                     Solicitud recibida. Si tu correo está registrado,
                     recibirás instrucciones para restablecer tu contraseña.
                </div>
            )}


            <div className="modal-footer">
            <Boton
              texto="Cancelar"
              variante="btn-secondary"
              onClick={() => {
                const botonCerrar = modalRef.current?.querySelector<HTMLButtonElement>(
                  '[data-bs-dismiss="modal"]'
                );

                botonCerrar?.click();
              }}
            />

            <Boton
              texto="Enviar instrucciones"
              onClick={handleRecuperar}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalRecuperarContrasena;
