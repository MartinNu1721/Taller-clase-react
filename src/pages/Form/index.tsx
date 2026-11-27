import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const planSchema = z.object({
  estudiante: z.string().min(3, "Ingresa el nombre del estudiante"),
  carrera: z.string().min(1, "Selecciona la carrera"),
  semestre: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().min(1, "Mínimo 1").max(12, "Máximo 12")
  ),
  modalidad: z.string().min(1, "Selecciona una modalidad"),
})

type PlanFormData = z.infer<typeof planSchema>;

export default function PlanEstudianteForm() {
  const [datosGuardados, setDatosGuardados] = useState<PlanFormData | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(planSchema),
    defaultValues: {
      estudiante: "",
      carrera: "",
      semestre: "",
      modalidad: "",
    },
  });

  const onSubmit = (data: unknown) => {
    setDatosGuardados(data as PlanFormData);
  };

  return (
    <div className="app-container">
      <div className="app-card">
        <h2>Datos del Plan del Estudiante</h2>
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: "grid", gap: "0.9rem" }}>
          <div>
            <label>Estudiante</label>
            <input {...register("estudiante")} placeholder="Ej. Luis Pérez" style={inputStyle} />
            {errors.estudiante && <p className="field-error">{errors.estudiante.message}</p>}
          </div>

          <div>
            <label>Carrera</label>
            <select {...register("carrera")} style={inputStyle}>
              <option value="">Selecciona...</option>
              <option value="sistemas">Sistemas de Información</option>
              <option value="software">Ingeniería de Software</option>
            </select>
            {errors.carrera && <p className="field-error">{errors.carrera.message}</p>}
          </div>

          <div>
            <label>Semestre</label>
            <input type="number" {...register("semestre")} placeholder="5" style={inputStyle} />
            {errors.semestre && <p className="field-error">{errors.semestre.message}</p>}
          </div>

          <div>
            <label>Modalidad</label>
            <select {...register("modalidad")} style={inputStyle}>
              <option value="">Selecciona...</option>
              <option value="presencial">Presencial</option>
              <option value="virtual">Virtual</option>
            </select>
            {errors.modalidad && <p className="field-error">{errors.modalidad.message}</p>}
          </div>

          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                reset();
                setDatosGuardados(null);
              }}
            >
              Limpiar
            </button>
            <button type="submit" className="btn btn-accent">
              Submit
            </button>
          </div>
        </form>
      </div>

      {datosGuardados && (
        <div className="app-card" style={{ marginTop: "1rem" }}>
          <strong>✓ Plan registrado:</strong>
          <pre>{JSON.stringify(datosGuardados, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "0.6rem",
  marginTop: "0.25rem",
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
};