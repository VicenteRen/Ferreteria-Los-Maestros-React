
import Boton from "../atoms/Boton";

interface ModalRegistroExitosoProps {
  visible: boolean;
  onCerrar: () => void;
}

const ModalRegistroExitoso = ({
  visible,
  onCerrar,
}: ModalRegistroExitosoProps) => {
  if (!visible) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-labelledby="tituloRegistroExitoso"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow">
          <div className="modal-header">
            <h2
              id="tituloRegistroExitoso"
              className="modal-title fs-5 fw-bold"
            >
              Registro exitoso
            </h2>

            <button
              type="button"
              className="btn-close"
              aria-label="Cerrar"
              onClick={onCerrar}
            />
          </div>

          <div className="modal-body text-center py-4">
            <i
              className="bi bi-check-circle-fill text-success"
              style={{ fontSize: "3.5rem" }}
              aria-hidden="true"
            />

            <h3 className="fs-5 fw-bold mt-3">
              ¡Cuenta creada correctamente!
            </h3>

            <p className="text-secondary mb-0">
              Tu cuenta de cliente ha sido registrada.
              Ya puedes iniciar sesión.
            </p>
          </div>

          <div className="modal-footer border-0 pt-0">
            <Boton
                texto="IR A INICIAR SESIÓN"
                esLink
                ruta="/login"
                clasesAdicionales="w-100"
            />

          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalRegistroExitoso;
