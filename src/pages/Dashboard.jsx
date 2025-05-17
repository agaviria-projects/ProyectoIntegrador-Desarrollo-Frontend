import { useEffect, useState } from "react";
import {
  FaUserGraduate,
  FaBook,
  FaClipboardList,
  FaChalkboardTeacher,
  FaFilePdf,
  FaPlus
} from "react-icons/fa";
import adminImg from "../assets/admin.jpg";
import profesorImg from "../assets/profesor.JPG";
import estudianteImg from "../assets/estudiante.JPG";
import logo from "../assets/logosinfondo.png"; // logo con fondo institucional exacto

function Dashboard() {
  const [foto, setFoto] = useState(adminImg);
  const rol = localStorage.getItem("rol") || "ADMIN";
  const username = localStorage.getItem("userName") || "admin";

  useEffect(() => {
    if (rol === "PROFESOR") setFoto(profesorImg);
    else if (rol === "ESTUDIANTE") setFoto(estudianteImg);
    else setFoto(adminImg);
  }, [rol]);

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
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
        }}
      >
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

      <div style={{ marginLeft: "300px", padding: "40px", width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontSize: "24px" }}>¡Bienvenido, {rol.charAt(0) + rol.slice(1).toLowerCase()}!</h2>
          <img
            src={foto}
            alt="perfil"
            style={{ width: "80px", height: "80px", borderRadius: "50%" }}
          />
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "30px",
          marginTop: "40px"
        }}>
          <Card icon={<FaUserGraduate />} label="Estudiantes" value={120} color="#facc15" />
          <Card icon={<FaBook />} label="Cursos" value={8} color="#60a5fa" />
          <Card icon={<FaClipboardList />} label="Matrículas" value={23} color="#6ee7b7" />
          <Card icon={<FaChalkboardTeacher />} label="Profesores" value={5} color="#c4b5fd" />
          <Card icon={<FaClipboardList />} label="Notas" value={12} color="#fda4af" />
          <AccesosRapidos />
        </div>

        <p style={{ marginTop: "50px", color: "#334155", textAlign: "center", fontSize: "15px" }}>
          Educamos hoy, transformamos el mañana.<br />
          <br></br>
          <strong>Education System - Plataforma académica CESDE</strong>
          <br></br>
          <br></br>
          <strong>Héctor Alejandro Gaviria Marin</strong>
        </p>
      </div>
    </div>
  );
}

function SidebarLink({ to, text }) {
  return (
    <a href={to} style={{
      display: "block",
      padding: "14px 24px",
      color: "white",
      textDecoration: "none",
      fontSize: "16px"
    }}>{text}</a>
  );
}

function Card({ icon, label, value, color }) {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "140px"
      }}
    >
      <div style={{ fontSize: "28px", color }}>{icon}</div>
      <h3 style={{ fontSize: "15px" }}>{label}</h3>
      <p style={{ fontSize: "18px", fontWeight: "bold" }}>{value}</p>
    </div>
  );
}

function AccesosRapidos() {
  return (
    <div style={{ backgroundColor: "#f8fafc", borderRadius: "12px", padding: "20px", minHeight: "140px" }}>
      <h4 style={{ marginBottom: "10px", fontSize: "15px" }}>Accesos rápidos</h4>
      <AccesoRapido icon={<FaPlus />} texto="Crear estudiante" />
      <AccesoRapido icon={<FaPlus />} texto="Crear curso" />
      <AccesoRapido icon={<FaFilePdf />} texto="Generar PDF" />
    </div>
  );
}

function AccesoRapido({ icon, texto }) {
  return (
    <button
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginTop: "8px",
        padding: "8px 12px",
        backgroundColor: "#ffffff",
        border: "1px solid #ccc",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "13px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.05)"
      }}
    >
      {icon} {texto}
    </button>
  );
}

export default Dashboard;
