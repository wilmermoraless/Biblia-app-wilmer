import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface ChapterListProps {
  chapters: { id: string; reference: string }[];
}

const ChapterList: React.FC<ChapterListProps> = ({ chapters }) => {
  const navigate = useNavigate();

  const handleChapterClick = (chapterId: string) => {
    navigate(`/chapter/${chapterId}/content`);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="flex items-center mb-4">
        <button
          className="p-2 hover:bg-gray-300 rounded-full mr-2 transition-colors duration-200 flex items-center justify-center"
          onClick={handleBackClick}
          aria-label="Regresar"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl md:text-2xl font-semibold text-gray-700"></h2>
      </div>

      <input
        type="text"
        placeholder="Buscar Capítulos"
        className="w-full p-2 mb-4 border rounded-lg text-gray-600"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {chapters.map((chapter, index) => (
          <Card
            key={chapter.id}
            className="flex items-center p-3 border rounded-lg shadow-sm cursor-pointer hover:shadow-md transition duration-300"
            onClick={() => handleChapterClick(chapter.id)}
          >
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-md text-white font-semibold mr-3 ${
                [
                  "bg-red-200 text-red-700",
                  "bg-pink-200 text-pink-700",
                  "bg-purple-200 text-purple-700",
                  "bg-green-200 text-green-700",
                  "bg-blue-200 text-blue-700",
                  "bg-yellow-200 text-yellow-700",
                  "bg-orange-200 text-orange-700",
                  "bg-pink-200 text-pink-700",
                ][index % 8]
              }`}
            >
              {index + 1}
            </div>
            <CardContent className="text-gray-700 font-medium">
              {chapter.reference}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ChapterList;
