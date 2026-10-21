import FormularioLogin from "../components/organism/FormularioLogin";

const Login = () => {
    return(
        <main className="min-vh-100 bg-light py-5">
            <div className="container" style={{maxWidth: "440px"}}>
                <div className="d-flex align-items-center gap-2 mb-5">
                    <span className="logo-box">FM</span>
                    <span className="fw-bold">FERRETERÍA LOS MAESTROS</span>
                </div>
                <h1 className="fw-bold">INICIAR SESIÓN</h1>
                <p className="text-secondary">Ingresa tus credenciales para acceder a tu cuenta</p>
                <FormularioLogin />
            </div>
        </main>
    );
};
export default Login;