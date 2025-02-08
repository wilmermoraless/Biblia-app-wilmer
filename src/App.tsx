import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/config/firebase";
import Home from "@/pages/Home";
import Chapters from "@/pages/Chapters";
import PassagePage from "@/pages/Passage";
import ChapterContent from "@/pages/ChapterContent";
import Auth from "@/components/Auth";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) return <div>Cargando...</div>; 

  return user ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Ruta de autenticación */}
        <Route path="/login" element={<Auth />} />

        {/* Rutas protegidas por autenticación */}
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/book/:bookId" element={<PrivateRoute><Chapters /></PrivateRoute>} />
        <Route path="/chapter/:chapterId/content" element={<PrivateRoute><ChapterContent /></PrivateRoute>} />
        <Route path="/verse/:verseId" element={<PrivateRoute><PassagePage /></PrivateRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
