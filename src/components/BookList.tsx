import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface BookListProps {
  books: { id: string; name: string }[];
  onSelect: (bookId: string) => void;
}

const BookList: React.FC<BookListProps> = ({ books, onSelect }) => {
  return (
    <div className="p-4 max-w-screen-lg mx-auto">
      <h1 className="text-2xl font-bold text-indigo-900 text-center">Biblia Reina Valera 1909</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {books.map((book, index) => (
          <Card 
            key={book.id} 
            role="article"
            className={`cursor-pointer p-4 rounded-lg shadow-md transition duration-300 ${index % 2 === 0 ? 'bg-gray-200' : 'bg-blue-200'}`}
            onClick={() => onSelect(book.id)}
          >
            <CardContent className="p-6 text-center text-lg font-medium text-indigo-900">
              {book.name}
              <p className="text-sm text-gray-600">Capítulos</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BookList;