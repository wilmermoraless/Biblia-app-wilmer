import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface PassageProps {
  reference: string;
  content: string;
}

const Passage: React.FC<PassageProps> = ({ reference, content }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBackClick = () => {
    navigate(-1);

    if (location.pathname.includes("chapter")) {
      const bookId = location.pathname.split("/")[2];
      navigate(`/book/${bookId}`);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <button
          className="p-2 hover:bg-gray-300 rounded-full mr-2 transition-colors duration-200 flex items-center justify-center"
          onClick={handleBackClick}
          aria-label="Regresar"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold">{reference}</h2>
      </div>
      <div
        className="mt-4 text-justify"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </div>
  );
};

export default Passage;
