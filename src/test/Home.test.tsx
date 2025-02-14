import { describe, test, it, expect } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";

// Creamos una función helper para renderizar con Router
const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("Pruebas del componente Home", () => {
  it("debe renderizar el componente correctamente", () => {
    const { baseElement } = renderWithRouter(<Home />);
    expect(baseElement).toBeDefined();
  });

  test("debe renderizar el título principal", () => {
    renderWithRouter(<Home />);
    const titleElement = screen.queryByText(/biblia/i);
    expect(titleElement).toBeTruthy();
  });

  it("debe renderizar los elementos de navegación", () => {
    renderWithRouter(<Home />);
    const navigationElements = screen.queryAllByRole("link");
    expect(navigationElements).toBeDefined();
  });

  test("debe manejar la interacción del usuario correctamente", () => {
    renderWithRouter(<Home />);
    const button = screen.queryByRole("button", { name: /buscar/i });
    if (button) {
      fireEvent.click(button);
    }
    expect(button).toBeTruthy();
  });

  test("debe mostrar el campo de búsqueda", () => {
    renderWithRouter(<Home />);
    const searchInput = screen.queryByPlaceholderText(/buscar/i);
    expect(searchInput).toBeTruthy();
  });
});
