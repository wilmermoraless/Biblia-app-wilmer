export const API_KEY = import.meta.env.VITE_API_KEY;
export const BIBLE_ID = "592420522e16049f-01";

const API_URL = "https://api.scripture.api.bible/v1/bibles";

export const fetchBooks = async () => {
  try {
    const response = await fetch(`${API_URL}/${BIBLE_ID}/books`, {
      headers: { "api-key": API_KEY },
    });
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
};

export const fetchChapters = async (bookId: string) => {
  try {
    const response = await fetch(
      `${API_URL}/${BIBLE_ID}/books/${bookId}/chapters`,
      {
        headers: { "api-key": API_KEY },
      }
    );
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error(`Error fetching chapters for book ${bookId}:`, error);
    return [];
  }
};

export const fetchVerses = async (chapterId: string) => {
  try {
    const response = await fetch(
      `${API_URL}/${BIBLE_ID}/chapters/${chapterId}/verses`,
      {
        headers: { "api-key": API_KEY },
      }
    );
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error(`Error fetching verses for chapter ${chapterId}:`, error);
    return [];
  }
};

export const fetchPassage = async (passageId: string) => {
  try {
    const response = await fetch(
      `${API_URL}/${BIBLE_ID}/passages/${passageId}`,
      {
        headers: { "api-key": API_KEY },
      }
    );
    const data = await response.json();
    return { reference: data.data.reference, content: data.data.content };
  } catch (error) {
    console.error(`Error fetching passage ${passageId}:`, error);
    return { reference: "", content: "No se pudo cargar el pasaje." };
  }
};

export const fetchChapterContent = async (chapterId: string) => {
  try {
    const response = await fetch(
      `${API_URL}/${BIBLE_ID}/chapters/${chapterId}/verses`,
      {
        headers: { "api-key": API_KEY },
      }
    );
    const data = await response.json();
    const verseIds = data.data?.map((verse: any) => verse.id) || [];

    const versePromises = verseIds.map(async (verseId: string) => {
      const verseRes = await fetch(`${API_URL}/${BIBLE_ID}/verses/${verseId}`, {
        headers: { "api-key": API_KEY },
      });
      const verseData = await verseRes.json();
      return {
        id: verseId,
        reference: verseData.data.reference,
        text: verseData.data.content.replace(/<\/?[^>]+(>|$)/g, ""),
      };
    });

    return await Promise.all(versePromises);
  } catch (error) {
    console.error(`Error fetching chapter content for ${chapterId}:`, error);
    return [];
  }
};
