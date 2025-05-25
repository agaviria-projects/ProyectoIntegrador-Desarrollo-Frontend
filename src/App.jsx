import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Estudiantes from './pages/Estudiantes';
import ProtectedRoute from './components/ProtectedRoute';
import GestionUsuarios from "./pages/GestionUsuarios";
import LayoutProtegido from './components/LayoutProtegido';
import Cursos from './pages/Cursos';
import Matriculas from './pages/Matriculas';
import Profesores from './pages/Profesores';
import Notas from './pages/Notas';


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
          <Route path="/matriculas" element={<Matriculas/>}/>
          <Route path="/profesores" element={<Profesores/>}/>
          <Route path="/notas" element={<Notas/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
