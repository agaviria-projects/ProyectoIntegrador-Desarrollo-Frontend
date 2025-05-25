import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Estudiantes from './pages/Estudiantes';
import ProtectedRoute from './components/ProtectedRoute';
import GestionUsuarios from "./pages/GestionUsuarios";
import LayoutProtegido from './components/LayoutProtegido';
import Cursos from './pages/Cursos';



function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<ProtectedRoute><LayoutProtegido /></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/estudiantes" element={<Estudiantes />} />
          <Route path="/gestion-usuarios" element={<GestionUsuarios />} />
          <Route path="/cursos" element={<Cursos/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
