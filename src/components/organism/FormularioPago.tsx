interface FormularioPagoProps {
    formData: any;
    errores: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormularioPago = ({
    formData,
    errores,
    handleChange,
}: FormularioPagoProps) => {
    return (
        <section>
            <h4 className="mb-3 fw-bold">Pago Seguro (Simulación)</h4>
            <div className="row gy-3">
                <div className="col-md-6">
                    <label
                        htmlFor="nombreTarjeta"
                        className="form-label text-muted"
                    >
                        Nombre en la tarjeta
                    </label>
                    <input
                        type="text"
                        className={`form-control ${errores.nombreTarjeta ? "is-invalid" : ""}`}
                        id="nombreTarjeta"
                        value={formData.nombreTarjeta}
                        onChange={handleChange}
                    />
                    {errores.nombreTarjeta && (
                        <div className="invalid-feedback fw-bold">
                            {errores.nombreTarjeta}
                        </div>
                    )}
                </div>
                <div className="col-md-6">
                    <label
                        htmlFor="numeroTarjeta"
                        className="form-label text-muted"
                    >
                        Número de la tarjeta
                    </label>
                    <input
                        type="text"
                        className={`form-control ${errores.numeroTarjeta ? "is-invalid" : ""}`}
                        id="numeroTarjeta"
                        maxLength={16}
                        inputMode="numeric"
                        placeholder="1234567890123456"
                        value={formData.numeroTarjeta}
                        onChange={handleChange}
                    />
                    {errores.numeroTarjeta && (
                        <div className="invalid-feedback fw-bold">
                            {errores.numeroTarjeta}
                        </div>
                    )}
                </div>
                <div className="col-md-3">
                    <label
                        htmlFor="vencimiento"
                        className="form-label text-muted"
                    >
                        Vencimiento
                    </label>
                    <input
                        type="text"
                        className={`form-control ${errores.vencimiento ? "is-invalid" : ""}`}
                        id="vencimiento"
                        placeholder="MM/YY"
                        maxLength={5}
                        value={formData.vencimiento}
                        onChange={handleChange}
                    />
                    {errores.vencimiento && (
                        <div className="invalid-feedback fw-bold">
                            {errores.vencimiento}
                        </div>
                    )}
                </div>
                <div className="col-md-3">
                    <label htmlFor="cvv" className="form-label text-muted">
                        CVV
                    </label>
                    <input
                        type="password"
                        className={`form-control ${errores.cvv ? "is-invalid" : ""}`}
                        id="cvv"
                        maxLength={3}
                        placeholder="123"
                        value={formData.cvv}
                        onChange={handleChange}
                    />
                    {errores.cvv && (
                        <div className="invalid-feedback fw-bold">
                            {errores.cvv}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default FormularioPago;
