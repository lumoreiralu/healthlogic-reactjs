import './FormularioCard.css'
import { useForm } from 'react-hook-form';
import type { FieldValues, Path, RegisterOptions } from "react-hook-form";

export interface Option {
    label: string;
    value: string;
}
export interface Campo<T extends FieldValues> {
    name: Path<T>;
    label: string;
    type?: string;
    step?: number | string;
    options?: Option[];
    validation?: RegisterOptions<T>;
}


interface FormularioCardProps<T extends FieldValues> {
  titulo: string;
  campos: Campo<T>[];
  onSubmitData: (data: T) => void;
}

function FormularioCard<T extends FieldValues>({titulo, campos, onSubmitData}: FormularioCardProps<T>) {
    const { register, 
        handleSubmit, 
        formState: { errors }, 
        reset,
        } = useForm<T>();
    const handleFormSubmit = (data: T) => {
        onSubmitData(data);
        reset();
    };

    return(
        <div className="form-card">
            <h2>{titulo}</h2>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                {campos.map((campo) => (
                <div key={campo.name} className="form-group">
                <label htmlFor={campo.name}>{campo.label}</label>
                {campo.type === 'select' ? (
                            <select
                                id={campo.name}
                                {...register(campo.name, campo.validation)}
                            >
                                {campo.options?.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        ) : (
                <input
                    id={campo.name}
                    type={campo.type || 'text'}
                    step={campo.step} // Útil para números con decimales
                    {...register(campo.name, campo.validation)}
                /> )}
                {errors[campo.name] && (
                    <span className="error-msg">
                        {String(errors[campo.name]?.message)}
                    </span>
                    )}
                </div>
                ))}
                <button type="submit" className="btn-submit">Cargar {titulo}</button>
            </form>
        </div>
       
    );
}

export default FormularioCard;