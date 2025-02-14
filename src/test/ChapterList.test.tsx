import { describe, it, expect, vi } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ChapterList from "../components/ChapterList";

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Datos de prueba
const mockChapters = [
  { id: "1", reference: "Génesis 1" },
  { id: "2", reference: "Génesis 2" },
  { id: "3", reference: "Génesis 3" },
];

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("Pruebas del componente ChapterList", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("debe renderizar la lista de capítulos correctamente", () => {
    renderWithRouter(<ChapterList chapters={mockChapters} />);

    mockChapters.forEach((chapter) => {
      expect(screen.getByText(chapter.reference)).toBeTruthy();
    });
  });

  it("debe mostrar el campo de búsqueda", () => {
    renderWithRouter(<ChapterList chapters={mockChapters} />);

    const searchInput = screen.getByPlaceholderText("Buscar Capítulos");
    expect(searchInput).toBeTruthy();
  });

  it("debe navegar hacia atrás al hacer clic en el botón de regreso", () => {
    renderWithRouter(<ChapterList chapters={mockChapters} />);

    const backButton = screen.getByLabelText("Regresar");
    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it("debe mostrar los números de capítulo correctamente", () => {
    renderWithRouter(<ChapterList chapters={mockChapters} />);

    mockChapters.forEach((_, index) => {
      expect(screen.getByText(String(index + 1))).toBeTruthy();
    });
  });

  it("debe aplicar las clases de color correctamente", () => {
    renderWithRouter(<ChapterList chapters={mockChapters} />);

    const firstChapterNumber = screen.getByText("1");
    expect(firstChapterNumber.className).toContain("bg-red-200");
    expect(firstChapterNumber.className).toContain("text-red-700");
  });
});
