import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import { vi, describe, test, expect } from "vitest";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "../pages/Home";
import * as bibleService from "../services/bibleService";
import { auth } from "../config/firebase";

vi.mock("../services/bibleService");
vi.mock("../config/firebase");

describe("Home Component", () => {
  test("renders input and buttons", () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    // Check if input, search, and logout buttons are present
    expect(screen.getByPlaceholderText("Buscar en la Biblia")).toBeInTheDocument();
    expect(screen.getByText("Buscar")).toBeInTheDocument();
    expect(screen.getByText("Cerrar sesión")).toBeInTheDocument();
  });

  test("performs search correctly", async () => {
    // Mock the fetchPassage function
    const mockedPassage = { reference: "John 3:16", content: "<p>For God so loved the world...</p>" };
    vi.spyOn(bibleService, 'fetchPassage').mockResolvedValue(mockedPassage);

    render(
      <Router>
        <Home />
      </Router>
    );

    const input = screen.getByPlaceholderText("Buscar en la Biblia");
    const button = screen.getByText("Buscar");

    fireEvent.change(input, { target: { value: "John 3:16" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(bibleService.fetchPassage).toHaveBeenCalledWith("John 3:16");
      expect(screen.getByText("John 3:16")).toBeInTheDocument();
      expect(screen.getByText("For God so loved the world...")).toBeInTheDocument();
    });
  });

  test("handles logout correctly", async () => {
    // Mock the signOut function
    const mockSignOut = vi.fn().mockResolvedValue(undefined);
    auth.signOut = mockSignOut;

    render(
      <Router>
        <Home />
      </Router>
    );

    const logoutButton = screen.getByText("Cerrar sesión");
    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(mockSignOut).toHaveBeenCalled();
    });
  });

  test("fetches books on mount", async () => {
    const mockedBooks = [
      { id: "1", name: "Genesis" },
      { id: "2", name: "Exodus" },
    ];
    vi.spyOn(bibleService, 'fetchBooks').mockResolvedValue(mockedBooks);

    render(
      <Router>
        <Home />
      </Router>
    );

    await waitFor(() => {
      expect(bibleService.fetchBooks).toHaveBeenCalled();
      expect(screen.getByText("Genesis")).toBeInTheDocument();
      expect(screen.getByText("Exodus")).toBeInTheDocument();
    });
  });
});