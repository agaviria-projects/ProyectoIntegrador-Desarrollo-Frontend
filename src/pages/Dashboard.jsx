import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import './Dashboard.css';
import { FaUserCog, FaUserGraduate, FaBook, FaClipboardList, FaChalkboardTeacher, FaFilePdf, FaFileExcel, FaPlus, FaChartBar, FaWhatsapp, FaGithub, FaLinkedin } from "react-icons/fa";
import axios from "axios";

import adminImg from "../assets/admin.jpg";
import profesorImg from "../assets/profesor.JPG";
import estudianteImg from "../assets/estudiante.JPG";
import logo from "../assets/logosinfondo.png";

function Dashboard() {
  const [foto, setFoto] = useState(adminImg);
  const rol = (localStorage.getItem("rol") || "ADMIN").toUpperCase();
  const username = localStorage.getItem("userName") || "admin";
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [mostrarPerfil, setMostrarPerfil] = useState(false);
  const [fechaActual, setFechaActual] = useState("");
  const [horaActual, setHoraActual] = useState("");

  const [totalEstudiantes, setTotalEstudiantes] = useState(0);
  const [totalCursos, setTotalCursos] = useState(0);
  const [totalMatriculas, setTotalMatriculas] = useState(0);
  const [totalProfesores, setTotalProfesores] = useState(0);
  const [totalNotas, setTotalNotas] = useState(0);
  const [totalUsuarios, setTotalUsuarios] = useState(0);

  useEffect(() => {
    if (rol === "PROFESOR") setFoto(profesorImg);
    else if (rol === "ESTUDIANTE") setFoto(estudianteImg);
    else setFoto(adminImg);

    const hoy = new Date().toLocaleDateString("es-CO", {
      weekday: "long", year: "numeric", month: "long", day: "numeric"
    });
    setFechaActual(hoy.charAt(0).toUpperCase() + hoy.slice(1));

    const interval = setInterval(() => {
      const hora = new Date().toLocaleTimeString("es-CO", { hour12: false });
      setHoraActual(hora);
    }, 1000);
    return () => clearInterval(interval);
  }, [rol]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/estudiantes/total").then(res => setTotalEstudiantes(res.data));
    axios.get("http://localhost:8080/api/cursos/total").then(res => setTotalCursos(res.data));
    axios.get("http://localhost:8080/api/matriculas/total").then(res => setTotalMatriculas(res.data));
    axios.get("http://localhost:8080/api/profesores/total").then(res => setTotalProfesores(res.data));
    axios.get("http://localhost:8080/api/notas/total").then(res => setTotalNotas(res.data));
    axios.get("http://localhost:8080/api/usuarios/total").then(res => setTotalUsuarios(res.data));
  }, []);

  const cerrarSesion = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const estiloOpcion = {
    padding: "8px 12px", fontSize: "14px", color: "#1e293b",
    cursor: "pointer", borderRadius: "6px", whiteSpace: "nowrap"
  };

  const cards = [
    { icon: <FaUserGraduate />, label: "Estudiantes", value: totalEstudiantes, color: "#facc15" },
    { icon: <FaBook />, label: "Cursos", value: totalCursos, color: "#60a5fa" },
    { icon: <FaClipboardList />, label: "Matrículas", value: totalMatriculas, color: "#6ee7b7" },
    { icon: <FaChalkboardTeacher />, label: "Profesores", value: totalProfesores, color: "#c4b5fd" },
    { icon: <FaClipboardList />, label: "Notas", value: totalNotas, color: "#fda4af" },
    { icon: <FaUserCog />, label: "Usuarios", value: totalUsuarios, color: "#f97316" },
    { icon: <FaChartBar />, label: "Análisis de Datos", value: 1, color: "#38bdf8" }
  ];

  const quickActions = [
    { icon: <FaPlus size={22} color="#2563eb" />, label: "Crear estudiante" },
    { icon: <FaPlus size={22} color="#2563eb" />, label: "Crear curso" },
    { icon: <FaFilePdf size={22} color="#dc2626" />, label: "Generar PDF" },
    { icon: <FaFileExcel size={22} color="#16a34a" />, label: "Exportar a Excel" }
  ];

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <img src={logo} alt="Logo" />
        <h2>EducationSystem</h2>
        <nav>
          {rol === "ADMIN" && <SidebarLink to="/gestion-usuarios" icon={<FaUserCog color="#fff" />} text="Gestión de Usuarios" />}
          <SidebarLink to="/estudiantes" text="Estudiantes" />
          <SidebarLink to="/cursos" text="Cursos" />
          <SidebarLink to="/matriculas" text="Matrículas" />
          <SidebarLink to="/profesores" text="Profesores" />
          <SidebarLink to="/notas" text="Notas" />
          <SidebarLink to="/analitica" text="Análisis de datos" />
          <a onClick={cerrarSesion} className="sidebar-link">Cerrar sesión</a>
        </nav>
      </div>

      <div className="main-content">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
          <div>
            <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 ,type: "spring", stiffness: 80 }} style={{ fontSize: "34px",fontWeight: "700", marginBottom: "5px",color: "#bfa047",  textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)"}}>
              ¡Bienvenido, {username.replace('.', ' ')}!
            </motion.h2>
            <p style={{ marginTop: "5px", fontSize: "16px", color: "#475569" }}>🎯 Tu gestión hace la diferencia.</p>
            <p style={{ color: "#64748b", fontSize: "14px",display: "flex", alignItems: "center", gap: "6px" , marginBottom: "10px"}}>
                📅{fechaActual} | 🕒 {horaActual}</p>
          </div>

          <div style={{ position: "relative" }}>
            <motion.img
              src={foto}
              alt="perfil"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{ width: "80px", height: "80px", borderRadius: "50%", cursor: "pointer" }}
              onClick={() => setMenuAbierto(!menuAbierto)}
            />
            {rol === "ADMIN" && menuAbierto && (
              <div style={{ position: "absolute", top: "90px", right: 0, backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", padding: "12px", minWidth: "160px", zIndex: 1000 }}>
                <p style={estiloOpcion} onClick={() => setMostrarPerfil(true)}>👤 Ver perfil</p>
                <p style={estiloOpcion}>✏️ Editar</p>
                <p style={estiloOpcion} onClick={cerrarSesion}>🔒 Cerrar sesión</p>
              </div>
            )}
          </div>
        </div>

        <div className="cards">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="card"
            >
              <div style={{ fontSize: "26px", color: card.color }}>{card.icon}</div>
              <h3 style={{ fontSize: "15px", margin: "8px 0 4px" }}>{card.label}</h3>
              <p style={{ fontSize: "18px", fontWeight: "bold" }}>{card.value}</p>
            </motion.div>
          ))}
        </div>

        <h3 style={{ textAlign: "center", margin: "40px 0 20px", fontSize: "18px", color: "#1e293b" }}>Accesos rápidos</h3>
        <div className="quick-actions">
          {quickActions.map((action, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.07 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{
                background: "#ffffff",
                borderRadius: "12px",
                padding: "18px",
                minWidth: "150px",
                textAlign: "center",
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                cursor: "pointer"
              }}
            >
              <div>{action.icon}</div>
              <p style={{ marginTop: "12px", fontSize: "14px", fontWeight: "bold", color: "#1e293b" }}>{action.label}</p>
            </motion.div>
          ))}
        </div>

        <footer className="footer-institucional">
          <p>© 2025 EducationSystem | Instituto de Gestión Académica</p>
          <p>Versión 1.0.0</p>
        </footer>

        <motion.div
          whileHover={{ scale: 1.1, x: -10 }}
          transition={{ type: "spring", stiffness: 300 }}
          style={{
            position: "fixed", bottom: "20px", right: "20px", zIndex: 1000,
            display: "flex", alignItems: "center", backgroundColor: "#075e54",
            borderRadius: "9999px", padding: "8px 16px", color: "white",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)", cursor: "pointer"
          }}
        >
          <FaWhatsapp size={22} style={{ marginRight: "8px" }} />
          <a href="https://wa.me/573001234567" target="_blank" rel="noopener noreferrer" style={{ color: "white", textDecoration: "none", fontWeight: 500 }}>
            Hablemos por Whatsapp
          </a>
        </motion.div>

        {mostrarPerfil && (
          <div style={{
            position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center",
            alignItems: "center", zIndex: 2000
          }}>
            <div style={{
              backgroundColor: "#fff", padding: "30px", borderRadius: "12px",
              width: "400px", boxShadow: "0 8px 20px rgba(0,0,0,0.2)", textAlign: "center", position: "relative"
            }}>
              <h2 style={{ marginBottom: "10px" }}>Perfil profesional</h2>
              <img src={foto} alt="perfil" style={{ width: "80px", borderRadius: "50%", marginBottom: "12px" }} />
              <p><strong>Nombre completo:</strong> Héctor Alejandro Gaviria Marín</p>
              <p><strong>Email:</strong> agaviria1408@gmail.com</p>
              <p><strong>GitHub:</strong> <a href="https://github.com/agaviria-projects" target="_blank" rel="noopener noreferrer"><FaGithub /> github.com/agaviria-projects</a></p>
              <p><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/héctor-alejandro-gaviria-marin-43296265" target="_blank" rel="noopener noreferrer"><FaLinkedin /> linkedin.com/in/héctor-alejandro-gaviria-marin-43296265</a></p>
              <button onClick={() => setMostrarPerfil(false)} style={{ marginTop: "20px", padding: "10px 20px", backgroundColor: "#0f172a", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" }}>
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SidebarLink({ to, text }) {
  return <a href={to} className="sidebar-link">{text}</a>;
}

export default Dashboard;
