// Archivo: Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { FaGraduationCap, FaWhatsapp, FaFacebook, FaInstagram } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const navLink = {
    margin: "0 18px",
    textDecoration: "none",
    color: "#0f172a",
    fontWeight: "600",
    fontSize: "15px",
    transition: "color 0.3s"
  };

  return (
    <nav style={{
      background: "#ffffff",
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.05)",
      position: "fixed",
      top: 0,
      width: "100%",
      zIndex: 1000
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "16px 32px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "auto"
      }}>
        <div style={{ display: "flex", alignItems: "center", marginRight: "auto" }}>
          <FaGraduationCap style={{ fontSize: "28px", color: "#eab308", marginRight: "10px" }} />
          <span style={{ fontWeight: "bold", fontSize: "20px", color: "#0f172a", letterSpacing: "0.5px" }}>
            EduSystem
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <Link to="/estudiantes" style={navLink}>Estudiantes</Link>
          <Link to="/cursos" style={navLink}>Cursos</Link>
          <Link to="/matriculas" style={navLink}>Matrículas</Link>
          <Link to="/profesores" style={navLink}>Profesores</Link>
          <Link to="/notas" style={navLink}>Notas</Link>
          <Link to="/analitica" style={navLink}>Análisis</Link>
          <button onClick={handleLogout} style={{
            marginLeft: "24px",
            backgroundColor: "#e11d48",
            color: "#ffffff",
            border: "none",
            padding: "10px 16px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "14px",
            transition: "background 0.3s"
          }}>
            Cerrar sesión
          </button>
        </div>
      </div>

      <div style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "10px"
      }}>
        <a href="https://wa.me/573001234567" target="_blank" rel="noopener noreferrer" title="Contáctanos por WhatsApp">
          <FaWhatsapp style={{ fontSize: "28px", color: "#25D366" }} />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Síguenos en Facebook">
          <FaFacebook style={{ fontSize: "28px", color: "#1877f2" }} />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Síguenos en Instagram">
          <FaInstagram style={{ fontSize: "28px", color: "#e1306c" }} />
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
