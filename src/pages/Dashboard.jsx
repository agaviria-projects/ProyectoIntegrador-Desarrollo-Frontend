import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaUserGraduate,
  FaBook,
  FaClipboardList,
  FaChalkboardTeacher,
  FaFilePdf,
  FaFileExcel,
  FaPlus,
  FaChartBar,
  FaWhatsapp,
  FaGithub,
  FaLinkedin
} from "react-icons/fa";
import adminImg from "../assets/admin.jpg";
import profesorImg from "../assets/profesor.JPG";
import estudianteImg from "../assets/estudiante.JPG";
import logo from "../assets/logosinfondo.png";

function Dashboard() {
  const [foto, setFoto] = useState(adminImg);
  const rol = localStorage.getItem("rol") || "ADMIN";
  const username = localStorage.getItem("userName") || "admin";
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [mostrarPerfil, setMostrarPerfil] = useState(false);

  useEffect(() => {
    if (rol === "PROFESOR") setFoto(profesorImg);
    else if (rol === "ESTUDIANTE") setFoto(estudianteImg);
    else setFoto(adminImg);
  }, [rol]);

  const cerrarSesion = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const estiloOpcion = {
    padding: "8px 12px",
    margin: 0,
    fontSize: "14px",
    color: "#1e293b",
    cursor: "pointer",
    borderRadius: "6px",
    transition: "background 0.2s",
    whiteSpace: "nowrap"
  };

  const cards = [
    { icon: <FaUserGraduate />, label: "Estudiantes", value: 120, color: "#facc15" },
    { icon: <FaBook />, label: "Cursos", value: 8, color: "#60a5fa" },
    { icon: <FaClipboardList />, label: "Matrículas", value: 23, color: "#6ee7b7" },
    { icon: <FaChalkboardTeacher />, label: "Profesores", value: 5, color: "#c4b5fd" },
    { icon: <FaClipboardList />, label: "Notas", value: 12, color: "#fda4af" },
    { icon: <FaChartBar />, label: "Análisis de Datos", value: 1, color: "#38bdf8" }
  ];

  const quickActions = [
    { icon: <FaPlus size={22} color="#2563eb" />, label: "Crear estudiante" },
    { icon: <FaPlus size={22} color="#2563eb" />, label: "Crear curso" },
    { icon: <FaFilePdf size={22} color="#dc2626" />, label: "Generar PDF" },
    { icon: <FaFileExcel size={22} color="#16a34a" />, label: "Exportar a Excel" }
  ];

  return (
    <div style={{ display: "flex" }}>
      <div style={{
        width: "300px",
        height: "100vh",
        backgroundColor: "#0b1f2a",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "10px 0 30px 0",
        position: "fixed",
        left: 0,
        top: 0,
        fontSize: "16px"
      }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
          <img src={logo} alt="Logo" style={{ width: "130px" }} />
          <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>EducationSystem</h2>
          <nav style={{ width: "100%", display: "flex", flexDirection: "column", gap: "16px", marginTop: "20px" }}>
            <SidebarLink to="/estudiantes" text="Estudiantes" />
            <SidebarLink to="/cursos" text="Cursos" />
            <SidebarLink to="/matriculas" text="Matrículas" />
            <SidebarLink to="/profesores" text="Profesores" />
            <SidebarLink to="/notas" text="Notas" />
            <SidebarLink to="/analitica" text="Análisis de datos" />
            <SidebarLink to="/logout" text="Cerrar sesión" />
          </nav>
        </div>
      </div>

      <div style={{ marginLeft: "300px", padding: "40px", width: "100%", position: "relative", minHeight: "100vh" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
          <motion.h2 initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} style={{ fontSize: "26px" }}>
            ¡Bienvenido, Héctor Alejandro Gaviria!
          </motion.h2>
          <div style={{ position: "relative" }}>
            <motion.img src={foto} alt="perfil" whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }} style={{ width: "80px", height: "80px", borderRadius: "50%", cursor: "pointer" }} onClick={() => setMenuAbierto(!menuAbierto)} />
            {rol === "ADMIN" && menuAbierto && (
              <div style={{ position: "absolute", top: "90px", right: 0, backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", padding: "12px", minWidth: "160px", zIndex: 1000 }}>
                <p style={estiloOpcion} onClick={() => setMostrarPerfil(true)}>👤 Ver perfil</p>
                <p style={estiloOpcion}>✏️ Editar</p>
                <p style={estiloOpcion} onClick={cerrarSesion}>🔒 Cerrar sesión</p>
              </div>
            )}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "30px", marginTop: "10px" }}>
          {cards.map((card, idx) => (
            <motion.div key={idx} whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }} transition={{ type: "spring", stiffness: 300 }} style={{ backgroundColor: "#fff", borderRadius: "12px", boxShadow: "0 2px 6px rgba(0,0,0,0.08)", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "120px", cursor: "pointer" }}>
              <motion.div whileHover={{ rotate: 10 }} style={{ fontSize: "26px", color: card.color }}>{card.icon}</motion.div>
              <h3 style={{ fontSize: "15px", margin: "8px 0 4px" }}>{card.label}</h3>
              <p style={{ fontSize: "18px", fontWeight: "bold" }}>{card.value}</p>
            </motion.div>
          ))}
        </div>

        <h3 style={{ textAlign: "center", margin: "40px 0 20px", fontSize: "18px", color: "#1e293b" }}>Accesos rápidos</h3>
        <div style={{ display: "flex", justifyContent: "center", gap: "24px", flexWrap: "wrap" }}>
          {quickActions.map((action, idx) => (
            <motion.div key={idx} whileHover={{ scale: 1.07 }} transition={{ type: "spring", stiffness: 300 }} style={{ background: "#ffffff", borderRadius: "12px", padding: "18px", minWidth: "150px", textAlign: "center", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", cursor: "pointer" }}>
              <div>{action.icon}</div>
              <p style={{ marginTop: "12px", fontSize: "14px", fontWeight: "bold", color: "#1e293b" }}>{action.label}</p>
            </motion.div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "60px", color: "#1e293b", fontSize: "18px" ,fontWeight: "600",lineHeight: "1.8"}}>
          <p><strong>Educamos hoy, Transformamos el mañana</strong></p>
          <p>Education System, CESDE 2025</p>
          <p>Héctor Alejandro Gaviria Marín</p>
        </div>

       <motion.div
            whileHover={{ scale: 1.1, x: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
            style={{
              position: "fixed",
              bottom: "20px",
              right: "20px",
              zIndex: 1000,
              display: "flex",
              alignItems: "center",
              backgroundColor: "#075e54",
              borderRadius: "9999px",
              padding: "8px 16px",
              color: "white",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              cursor: "pointer"
            }}
          >
            <FaWhatsapp size={22} style={{ marginRight: "8px" }} />
            <a
              href="https://wa.me/573001234567"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "white", textDecoration: "none", fontWeight: 500 }}
            >
              Hablemos por Whatsapp
            </a>
      </motion.div>


        {mostrarPerfil && (
          <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 2000 }}>
            <div style={{ backgroundColor: "#fff", padding: "30px", borderRadius: "12px", width: "400px", boxShadow: "0 8px 20px rgba(0,0,0,0.2)", textAlign: "center", position: "relative" }}>
              <h2 style={{ marginBottom: "10px" }}>Perfil profesional</h2>
              <img src={foto} alt="perfil" style={{ width: "80px", borderRadius: "50%", marginBottom: "12px" }} />
              <p><strong>Nombre completo:</strong> Héctor Alejandro Gaviria Marín</p>
              <p><strong>Email:</strong> agaviria1408@gmail.com</p>
              <p><strong>GitHub:</strong> <a href="https://github.com/agaviria-projects" target="_blank" rel="noopener noreferrer"><FaGithub /> github.com/agaviria-projects</a></p>
              <p><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/héctor-alejandro-gaviria-marin-43296265" target="_blank" rel="noopener noreferrer"><FaLinkedin /> linkedin.com/in/héctor-alejandro-gaviria-marin-43296265</a></p>
              <button onClick={() => setMostrarPerfil(false)} style={{ marginTop: "20px", padding: "10px 20px", backgroundColor: "#0f172a", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" }}>Cerrar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SidebarLink({ to, text }) {
  return (
    <a href={to} style={{ display: "block", padding: "14px 22px", color: "white", textDecoration: "none", fontSize: "15px", borderBottom: "1px solid #0a1a28" }}>{text}</a>
  );
}

export default Dashboard;
