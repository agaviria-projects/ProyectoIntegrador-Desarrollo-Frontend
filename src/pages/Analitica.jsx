import { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import "../styles/Analitica.css";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement);

function Analitica() {
  const [estudiantesCurso, setEstudiantesCurso] = useState([]);
  const [promediosCurso, setPromediosCurso] = useState([]);
  const [cursosPorProfesor, setCursosPorProfesor] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/estadisticas/estudiantes-por-curso")
      .then(res => setEstudiantesCurso(res.data));

    axios.get("http://localhost:8080/api/estadisticas/promedios-por-curso")
      .then(res => setPromediosCurso(res.data));

    axios.get("http://localhost:8080/api/cursos/cantidad-por-profesor")
      .then(res => setCursosPorProfesor(res.data));
  }, []);

  // Revisar si las propiedades son correctas
  const barData1 = {
    labels: estudiantesCurso.map(e => e.nombreCurso || e.curso),
    datasets: [{
      label: "Estudiantes por Curso",
      data: estudiantesCurso.map(e => e.cantidad || e.cantidadEstudiantes),
      backgroundColor: "#4a90e2"
    }]
  };

  const barData2 = {
    labels: promediosCurso.map(e => e.nombreCurso || e.curso),
    datasets: [{
      label: "Promedio",
      data: promediosCurso.map(e => e.promedio),
      backgroundColor: "gold"
    }]
  };

  const pieData = {
    labels: estudiantesCurso.map(e => e.nombreCurso || e.curso),
    datasets: [{
      label: "Distribución",
      data: estudiantesCurso.map(e => e.cantidad || e.cantidadEstudiantes),
      backgroundColor: [
        "#4a90e2", "#50e3c2", "#f5a623", "#b8e986", "#bd10e0",
        "#7ed321", "#f8e71c", "#d0021b", "#417505", "#9013fe"
      ]
    }]
  };

  const horizontalBarData = {
    labels: cursosPorProfesor.map(p => p.profesor),
    datasets: [{
      label: "Cursos por Profesor",
      data: cursosPorProfesor.map(p => p.cantidad),
      backgroundColor: "#2ecc71"
    }]
  };

  const horizontalOptions = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: { position: 'top' }
    }
  };

  return (
    <div className="analitica-container">
       <button
        onClick={() => window.location.href = "/dashboard"}
        style={{
            backgroundColor: "#ffffff",
            color: "#2563eb",
            border: "2px solid #2563eb",
            borderRadius: "8px",
            padding: "8px 16px",
            fontWeight: "bold",
            cursor: "pointer",
            marginBottom: "20px",
            marginTop: "10px"
        }}
        >
        ← Volver al Dashboard
        </button>
        
      <h2 className="titulo-analitica">📊 Análisis de Datos</h2>

      <div className="grid-analitica">
        <div className="grafica">
          <h4>Estudiantes por Curso</h4>
          <Bar data={barData1} />
        </div>
        <div className="grafica">
          <h4>Promedios por Curso</h4>
          <Bar data={barData2} />
        </div>
        <div className="grafica">
          <h4>Distribución Estudiantes</h4>
          <Pie data={pieData} />
        </div>
        <div className="grafica">
          <h4>Cursos por Profesor</h4>
          <Bar data={horizontalBarData} options={horizontalOptions} />
        </div>
      </div>
    </div>
  );
}

export default Analitica;
