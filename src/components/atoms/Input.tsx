import React from "react";

interface InputProps {
    id?: string;
    tipo?: string;
    valor: string;
    placeholder?: string;
    clasesAdicionales?: string;
    style?: React.CSSProperties;
    min?: string;
    max?: string;
    onChange: (valor: string) => void;
}

const Input = ({
    id,
    tipo = "text",
    valor,
    placeholder = "",
    clasesAdicionales = "",
    style,
    min = "",
    max = "",
    onChange,
}: InputProps) => {
    return (
        <input
            id={id}
            type={tipo}
            className={`form-control ${clasesAdicionales}`.trim()}
            value={valor}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            style={style}
            min={min !== "" ? min : undefined}
            max={max !== "" ? max : undefined}
        />
    );
};

export default Input;
