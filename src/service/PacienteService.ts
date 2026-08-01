
const API_BASE_URL = "http://localhost:8080/api";

// Types para los DTOs de envio
export interface PacienteDTO {
    dni: number;
    edad: number;
    nombre: string;
    apellido: string;
    sexo: string;
}

export interface MedidaDTO {
    altura: number;
    peso: number;
}

// 1. Guardar Nuevo Paciente
export const crearPaciente = async (paciente: PacienteDTO) => {
    const response = await fetch(`${API_BASE_URL}/pacientes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(paciente),
    });

    if (!response.ok) {
        throw new Error("Error al guardar el paciente");
    }

    return await response.json();
};

// 2. Guardar Nueva Medida para un Paciente por su DNI
export const crearMedida = async (dni: number, medida: MedidaDTO) => {
    const response = await fetch(`${API_BASE_URL}/pacientes/${dni}/medidas`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(medida),
    });

    if (!response.ok) {
        throw new Error("Error al guardar la medida");
    }

    return await response.json();
};
//metodo para obtener la lista de pacientes para el select del formulario de medidas
export const obtenerPacientes = async () => {
    const response = await fetch(`${API_BASE_URL}/pacientes/select`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Error al obtener la lista de pacientes");
    }

    const pacientes = await response.json();

    // Mapeamos a la estructura que consume el <select>
    return pacientes.map((p: { dni: number; nombre: string; apellido: string }) => ({
        label: `DNI: ${p.dni} - ${p.nombre} ${p.apellido}`,
        value: String(p.dni)
    }));
};