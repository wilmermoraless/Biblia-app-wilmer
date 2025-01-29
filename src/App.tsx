// App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Chapters from "@/pages/Chapters";
/* import Verses from "@/pages/Verses"; */
import PassagePage from "@/pages/Passage";
import ChapterContent from "@/pages/ChapterContent"; // Importa el nuevo archivo

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:bookId" element={<Chapters />} />
        <Route path="/chapter/:chapterId/content" element={<ChapterContent />} /> {/* Nueva ruta */}
        <Route path="/verse/:verseId" element={<PassagePage />} />
      </Routes>
    </Router>
  );
};

export default App;
