import './Body.css'
import { useState, useEffect, useMemo } from 'react'
import FormularioCard, { type Campo } from '../FormularioCard/FormularioCard'
import { crearPaciente, crearMedida, obtenerPacientes, type PacienteDTO, type MedidaDTO } from '../../service/PacienteService';

interface MedidaForm {
    altura: number;
    peso: number;
    dni_paciente: string;
}

function Body() {
    const [opcionesPacientes, setOpcionesPacientes] = useState<{ label: string; value: string }[]>([]);

    const cargarPacientes = async () => {
        try {
            const data = await obtenerPacientes();
            setOpcionesPacientes(data);
        } catch (error) {
            console.error("Error al cargar pacientes:", error);
        }
    };

    useEffect(() => {
        cargarPacientes();
    }, []);

    const camposPaciente: Campo<PacienteDTO>[] = [
        { name: "dni", label: "Dni", type: "number", validation: { required: "Obligatorio" } },
        { name: "edad", label: "Edad", type: "number", validation: { required: "Obligatorio" } },
        { name: "nombre", label: "Nombre", type: "text", validation: { required: "Obligatorio" } },
        { name: "apellido", label: "Apellido", type: "text", validation: { required: "Obligatorio" } },
        {
            name: "sexo",
            label: "Sexo",
            type: "select",
            options: [
                { label: "Seleccione una opción", value: "" },
                { label: "Masculino", value: "m" },
                { label: "Femenino", value: "f" },
            ],
            validation: { required: "Obligatorio" },
        },
    ];


    const camposMedida: Campo<MedidaForm>[] = useMemo(() => [
        { name: "altura", label: "Altura (cm)", type: "number", step: 0.01, validation: { required: "Obligatorio" } },
        { name: "peso", label: "Peso (kg)", type: "number", step: 0.01, validation: { required: "Obligatorio" } },
        {
            name: "dni_paciente",
            label: "DNI del Paciente",
            type: "select",
            options: [
                { label: "Seleccione un paciente", value: "" },
                ...opcionesPacientes
            ],
            validation: { required: "Obligatorio" },
        },
    ], [opcionesPacientes]);

    const guardarPaciente = async (data: PacienteDTO) => {
        try {
            await crearPaciente(data);
            alert("¡Paciente guardado!");
            cargarPacientes(); //para refrescar el select de pacientes en el formulario de medidas
        } catch (error) {
            alert("Error al guardar paciente");
        }
    };

    const guardarMedida = async (data: MedidaForm) => {
        try {
            const medidaPayload: MedidaDTO = {
                altura: Number(data.altura),
                peso: Number(data.peso)
            };

            const respuesta = await crearMedida(Number(data.dni_paciente), medidaPayload);
            alert(`¡Medida asignada al DNI ${data.dni_paciente}!`);
        } catch (error) {
            alert("Error al guardar la medida.");
        }
    };

    return (
        <div className="body-forms">
            <FormularioCard<PacienteDTO>
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