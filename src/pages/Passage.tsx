import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPassage } from "@/services/bibleService";
import Passage from "@/components/Passage";

const PassagePage = () => {
  const { verseId } = useParams();
  const [passage, setPassage] = useState<{
    reference: string;
    content: string;
  } | null>(null);

  useEffect(() => {
    if (verseId) {
      fetchPassage(verseId).then(setPassage);
    }
  }, [verseId]);

  return (
    <div className="container mx-auto p-4">
      {passage ? (
        <Passage reference={passage.reference} content={passage.content} />
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default PassagePage;
