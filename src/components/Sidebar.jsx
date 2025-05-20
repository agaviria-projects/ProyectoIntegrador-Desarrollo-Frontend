import { Link } from "react-router-dom";
import {
  FaUserGraduate,
  FaBook,
  FaChalkboardTeacher,
  FaClipboardList,
  FaChartPie,
  FaSignOutAlt
} from "react-icons/fa";
import logo from "../assets/logo.png"; 

function Sidebar() {
  const rol = localStorage.getItem("rol");
  console.log("ROL EN LOCALSTORAGE:", rol);
  return (
    <div
      style={{
        width: "280px",
        height: "100vh",
        backgroundColor: "#0a1a28", // Color institucional
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "fixed",
        left: 0,
        top: 0,
        fontSize: "15px"
      }}
    >
      <img src={logo} alt="Logo" style={{ width: "150px", marginBottom: "10px" }} />
      <h2 style={{ 
        color: "#ffffff",  // hexadecimal por claridad
        marginTop: "10px", 
        marginBottom: "30px", 
        fontSize: "18px",
        fontWeight: "bold",
        textAlign: "center"
      }}>
        EducationSystem
      </h2>

      <nav style={{ width: "100%" }}>
          {rol?.toUpperCase() === "ADMIN" && (
            <SidebarLink to="/gestion-usuarios" icon={<FaUserGraduate />} text="Gestión de Usuarios" />
          )}
        <SidebarLink to="/estudiantes" icon={<FaUserGraduate />} text="Estudiantes" />
        <SidebarLink to="/cursos" icon={<FaBook />} text="Cursos" />
        <SidebarLink to="/matriculas" icon={<FaClipboardList />} text="Matrículas" />
        <SidebarLink to="/profesores" icon={<FaChalkboardTeacher />} text="Profesores" />
        <SidebarLink to="/notas" icon={<FaClipboardList />} text="Notas" />
        <SidebarLink to="/analitica" icon={<FaChartPie />} text="Análisis de datos" />
        <SidebarLink to="/logout" icon={<FaSignOutAlt />} text="Cerrar sesión" />
      </nav>
    </div>
  );
}

function SidebarLink({ to, icon, text }) {
  return (
    <Link
      to={to}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "14px 22px",
        color: "white",
        textDecoration: "none",
        fontSize: "15px",
      }}
    >
      {icon} {text}
    </Link>
  );
}

export default Sidebar;
