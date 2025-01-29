import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchChapters } from "@/services/bibleService";
import ChapterList from "@/components/ChapterList";

const Chapters = () => {
  const { bookId } = useParams();
  const [chapters, setChapters] = useState<{ id: string; reference: string }[]>([]);

  useEffect(() => {
    if (bookId) {
      fetchChapters(bookId).then(setChapters);
    }
  }, [bookId]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Capítulos </h1>
      <ChapterList chapters={chapters} />
    </div>
  );
};

export default Chapters;
