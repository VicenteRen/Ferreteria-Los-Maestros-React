
export const validarRun = (run: string): boolean => {
  const runLimpio = run.replace(/[.-]/g, "").toUpperCase();

  if (!/^[0-9]{7,8}[0-9K]$/.test(runLimpio)) {
    return false;
  }

  const cuerpo = runLimpio.slice(0, -1);
  const digitoVerificador = runLimpio.slice(-1);

  let suma = 0;
  let multiplicador = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += Number(cuerpo[i]) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }

  const resultado = 11 - (suma % 11);
  const digitoEsperado =
    resultado === 11 ? "0" : resultado === 10 ? "K" : String(resultado);

  return digitoVerificador === digitoEsperado;
};
