import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchChapterContent } from "@/services/bibleService";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft } from "lucide-react";

const ChapterContent = () => {
  const { chapterId } = useParams();
  const [verses, setVerses] = useState<
    { id: string; reference: string; text: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getVerses = async () => {
      if (chapterId) {
        setLoading(true);
        const versesData = await fetchChapterContent(chapterId);
        setVerses(versesData);
        setLoading(false);
      }
    };

    getVerses();
  }, [chapterId]);

  return (
    <div className="relative min-h-screen bg-white font-serif">
      {/* Encabezado */}
      <div className="sticky top-0 flex items-center justify-between bg-teal-600 p-4 md:p-6 lg:p-8 border-b shadow-md z-10 text-white">
        <Button variant="ghost" size="icon">
          <ChevronLeft className="h-6 w-6 text-white" />
        </Button>
        <h1 className="text-lg md:text-xl lg:text-2xl font-semibold">
          {" "}
          {chapterId}
        </h1>
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon"></Button>
          <Button variant="ghost" size="icon"></Button>
        </div>
      </div>

    
      <div className="px-4 md:px-8 lg:px-16 py-6 text-gray-900 leading-relaxed md:leading-loose text-base md:text-lg lg:text-xl">
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <Skeleton key={index} className="h-16 w-full rounded-lg" />
            ))}
          </div>
        ) : (
          verses.map((verse, index) => (
            <p key={verse.id} className="mb-3 md:mb-4">
              <span className="font-bold">{index + 1}. </span>
              {verse.text}
            </p>
          ))
        )}
      </div>
    </div>
  );
};

export default ChapterContent;
