// Archivo: Dashboard.jsx
import { FaUserGraduate, FaChalkboardTeacher, FaClipboardList, FaChartLine, FaUserTie } from "react-icons/fa";

function Dashboard() {
  const username = localStorage.getItem("userName");

  const resumen = [
    { icon: <FaUserGraduate />, label: "Estudiantes", value: 120 },
    { icon: <FaChalkboardTeacher />, label: "Cursos", value: 8 },
    { icon: <FaClipboardList />, label: "Matrículas", value: 23 },
    { icon: <FaUserTie />, label: "Profesores", value: 7 },
    { icon: <FaChartLine />, label: "Notas", value: 5 }
  ];

  return (
    <div style={{
      background: "linear-gradient(to bottom right, #e2e8f0, #f8fafc)",
      minHeight: "100vh",
      paddingTop: "110px",
      fontFamily: "'Poppins', sans-serif"
    }}>
      <div style={{ textAlign: "center", maxWidth: "900px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "34px", color: "#0f172a", marginBottom: "8px" }}>
          ¡Bienvenido, {username}!
        </h1>
        <p style={{ fontSize: "18px", color: "#475569", lineHeight: "1.6" }}>
          Accede, visualiza y mejora tu gestión académica con <strong>EduSystem</strong>. Más que una plataforma, una experiencia digital moderna.
        </p>
      </div>

      <div style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "32px",
        marginTop: "60px"
      }}>
        {resumen.map((item, i) => (
          <div key={i} style={{
            backgroundColor: "#ffffff",
            borderRadius: "18px",
            padding: "30px 20px",
            width: "220px",
            textAlign: "center",
            boxShadow: "0 12px 28px rgba(0,0,0,0.08)",
            transition: "all 0.3s ease-in-out",
            transform: "scale(1)",
            cursor: "pointer"
          }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >
            <div style={{ fontSize: "42px", color: "#2563eb", marginBottom: "12px" }}>
              {item.icon}
            </div>
            <h3 style={{ fontSize: "18px", color: "#0f172a", marginBottom: "6px" }}>{item.label}</h3>
            <p style={{ fontSize: "24px", fontWeight: "bold", color: "#1e293b" }}>{item.value}</p>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: "60px",
        textAlign: "center",
        animation: "fadeInUp 1.5s ease-in-out"
      }}>
        <p style={{ fontSize: "16px", color: "#475569" }}>
          Estás viendo tu resumen académico en tiempo real. ¡Sigue construyendo tu futuro!
        </p>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default Dashboard;
