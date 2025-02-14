import { describe, it, expect, vi } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import BookList from "../components/BookList";

// Datos de prueba
const mockBooks = [
  { id: "1", name: "Génesis" },
  { id: "2", name: "Éxodo" },
  { id: "3", name: "Levítico" },
];

describe("Pruebas del componente BookList", () => {
  const mockOnSelect = vi.fn();

  beforeEach(() => {
    mockOnSelect.mockClear();
  });

  it("debe renderizar el título correctamente", () => {
    render(<BookList books={mockBooks} onSelect={mockOnSelect} />);

    const title = screen.getByText("Biblia Reina Valera 1909");
    expect(title).toBeTruthy();
  });

  it("debe renderizar todos los libros", () => {
    render(<BookList books={mockBooks} onSelect={mockOnSelect} />);

    mockBooks.forEach((book) => {
      expect(screen.getByText(book.name)).toBeTruthy();
    });
  });

  it('debe mostrar "Capítulos" debajo de cada libro', () => {
    render(<BookList books={mockBooks} onSelect={mockOnSelect} />);

    const capitulosTexts = screen.getAllByText("Capítulos");
    expect(capitulosTexts).toHaveLength(mockBooks.length);
  });

  it("debe llamar a onSelect con el ID correcto al hacer clic en un libro", () => {
    render(<BookList books={mockBooks} onSelect={mockOnSelect} />);

    const firstBook = screen.getByText("Génesis");
    fireEvent.click(firstBook.closest(".cursor-pointer") as HTMLElement);

    expect(mockOnSelect).toHaveBeenCalledWith("1");
  });

  it("debe aplicar las clases de color alternadas correctamente", () => {
    render(<BookList books={mockBooks} onSelect={mockOnSelect} />);

    const cards = screen.getAllByRole("article");

    expect(cards[0].className).toContain("bg-gray-200");

    expect(cards[1].className).toContain("bg-blue-200");
  });

  it("debe tener el diseño de grid correcto", () => {
    const { container } = render(
      <BookList books={mockBooks} onSelect={mockOnSelect} />
    );

    const gridContainer = container.querySelector(".grid");
    expect(gridContainer).toBeTruthy();
    expect(gridContainer?.className).toContain("grid-cols-1");
    expect(gridContainer?.className).toContain("sm:grid-cols-2");
    expect(gridContainer?.className).toContain("md:grid-cols-3");
  });

  it("debe tener estilos de texto correctos para los nombres de los libros", () => {
    render(<BookList books={mockBooks} onSelect={mockOnSelect} />);

    mockBooks.forEach((book) => {
      const bookElement = screen.getByText(book.name);
      const cardContent = bookElement.closest(".p-6");
      expect(cardContent?.className).toContain("text-center");
      expect(cardContent?.className).toContain("text-lg");
      expect(cardContent?.className).toContain("text-indigo-900");
    });
  });
});
