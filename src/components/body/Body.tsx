import './Body.css'
import FormularioCard, { type Campo } from '../FormularioCard/FormularioCard'

interface PacienteForm {
    dni: number;
    edad: number;
    nombre: string;
    apellido: string;
    sexo: string;
}

interface MedidaForm {
    altura: number;
    peso: number;
    dni_paciente: number;
}

function Body(){
    const camposPaciente: Campo<PacienteForm>[] = [
        {
            name: "dni",
            label: "Dni",
            type: "number",
            validation: { required: "El campo Dni es obligatorio" },
        },
        {
            name: "edad",
            label: "Edad",
            type: "number",
            validation: { required: "El campo Edad es obligatorio" },
        },
        {
            name: "nombre",
            label: "Nombre",
            type: "text",
            validation: { required: "El campo Nombre es obligatorio" },
        },
        {
            name: "apellido",
            label: "Apellido",
            type: "text",
            validation: { required: "El campo Apellido es obligatorio" },
        },
        {
            name: "sexo",
            label: "Sexo",
            type: "text",
            validation: { required: "El campo Sexo es obligatorio" },
        },
    ];

    const camposMedida: Campo<MedidaForm>[] = [
        {
            name: "altura",
            label: "Altura (cm)",
            type: "number",
            step: 0.01,
            validation: { required: "El campo Altura es obligatorio" },
        },
        {
            name: "peso",
            label: "Peso (kg)",
            type: "number",
            step: 0.01,
            validation: { required: "El campo Peso es obligatorio" },
        },
        {
            name: "dni_paciente",
            label: "Dni del Paciente",
            type: "number",
            validation: { required: "El campo Dni del Paciente es obligatorio" },
        },
    ];
    const guardarPaciente = (data: PacienteForm) => {
        console.log(data);
    };

    const guardarMedida = (data: MedidaForm) => {
        console.log(data);
    };

    return(
        
        <div className="body-forms">
            <FormularioCard<PacienteForm>
                titulo="Nuevo Paciente"
                campos={camposPaciente}
                onSubmitData={guardarPaciente}
            />

            <FormularioCard<MedidaForm>
                titulo="Nueva Medida"
                campos={camposMedida}
                onSubmitData={guardarMedida}
            />
        </div>
    );
}
export default Body;