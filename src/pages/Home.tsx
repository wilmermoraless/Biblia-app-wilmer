import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { fetchBooks, fetchPassage } from "../services/bibleService";
import BookList from "@/components/BookList";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState<{ id: string; name: string }[]>([]);
  const [passage, setPassage] = useState<{ reference: string; content: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks().then(setBooks);
  }, []);

  const handleSearch = async () => {
    if (searchTerm.trim()) {
      const result = await fetchPassage(searchTerm);
      setPassage(result);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <section className="flex justify-between gap-4 mb-4">
        <Input className="flex-1" onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} placeholder="Buscar en la Biblia" />
        <Button onClick={handleSearch} variant="destructive">Buscar</Button>
      </section>

      <BookList books={books} onSelect={(bookId) => navigate(`/book/${bookId}`)} />

      {passage && (
        <div className="mt-4">
          <h3 className="text-lg font-bold">{passage.reference}</h3>
          <p dangerouslySetInnerHTML={{ __html: passage.content }}></p>
        </div>
      )}
    </div>
  );
};

export default Home;
