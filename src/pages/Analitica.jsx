// src/pages/Analitica.jsx
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "../styles/Analitica.css";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";
import { FaArrowLeft } from "react-icons/fa";
import "../styles/Analitica.css";
import axios from "axios";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function Analitica() {
  const [estudiantesData, setEstudiantesData] = useState({ labels: [], data: [] });
  const [promediosData, setPromediosData] = useState({ labels: [], data: [] });

  useEffect(() => {
    axios.get("http://localhost:8080/api/estadisticas/estudiantes-por-curso").then((res) => {
      const labels = res.data.map((item) => item.curso);
      const data = res.data.map((item) => item.cantidad);
      setEstudiantesData({ labels, data });
    });

    axios.get("http://localhost:8080/api/estadisticas/promedios-por-curso").then((res) => {
      const labels = res.data.map((item) => item.curso);
      const data = res.data.map((item) => item.promedio);
      setPromediosData({ labels, data });
    });
  }, []);

  const opciones = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
    },
  };

  return (
    <div className="analitica-container">
      <button className="btn-volver" onClick={() => window.location.href = "/dashboard"}>
        <FaArrowLeft /> Volver al Dashboard
      </button>

      <h2 className="titulo"><span role="img">📊</span> Análisis de Datos</h2>

      <div className="grafica">
        <h3>Estudiantes por Curso</h3>
        <div className="grafica-barras">
          <Bar
            data={{
              labels: estudiantesData.labels,
              datasets: [{
                label: "Estudiantes por Curso",
                data: estudiantesData.data,
                backgroundColor: "#60a5fa"
              }]
            }}
            options={opciones}
          />
        </div>
      </div>

      <div className="grafica">
        <h3>Promedios de Notas por Curso</h3>
        <div className="grafica-barras">
          <Bar
            data={{
              labels: promediosData.labels,
              datasets: [{
                label: "Promedio",
                data: promediosData.data,
                backgroundColor: "#facc15"
              }]
            }}
            options={opciones}
          />
        </div>
      </div>
    </div>
  );
}

export default Analitica;
