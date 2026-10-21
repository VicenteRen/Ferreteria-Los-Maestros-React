import FormularioRegistro from "../components/organism/FormularioRegistro";

const Registro = () => {
  return (
    <main className="min-vh-100 bg-light py-5">
      <div className="container" style={{ maxWidth: "600px" }}>
        <div className="d-flex align-items-center gap-2 mb-5">
          <span className="logo-box">FM</span>
          <span className="fw-bold">FERRETERÍA LOS MAESTROS</span>
        </div>

        <h1 className="fw-bold">CREAR CUENTA</h1>

        <p className="text-secondary">
          Completa tus datos para registrarte en nuestra tienda.
        </p>

        <p className="text-secondary small mt-4">
            Los campos marcados con <span className="text-danger">*</span> son obligatorios.
        </p>

        <FormularioRegistro />
      </div>
    </main>
  );
};

export default Registro;
