import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import TodoAndPhotoList from "./TodoAndPhotoList";


const originalFetch = global.fetch;

describe("Testing TodoAndPhotoList Component", () => {
  afterEach(() => {
    global.fetch = originalFetch;
  });
  it("should fetch todos from API and update server", async () => {
    const mockTodos = [
      {
        id: 1,
        title: "Todo 1",
        completed: false,
      },
      {
        id: 2,
        title: "Todo 2",
        completed: true,
      },
    ];
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockTodos),
      })
    );
    render(<TodoAndPhotoList />);
    await waitFor(() => {
      expect(screen.getByText("Todo 1 - Pending")).toBeInTheDocument();
      expect(screen.getByText("Todo 2 - Completed")).toBeInTheDocument();
    });
    expect(global.fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/todos"
    )
  });
  it("should fetch photos from API and update server", async () => {
    const mockPhotos = [
      {
        id: 1,
        title: "Photo 1",
      },
      {
        id: 2,
        title: "Photo 2",
      },
    ];
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockPhotos),
      })
    );
    render(<TodoAndPhotoList />);
    await waitFor(() => {
      expect(screen.getByText("Photo 1")).toBeInTheDocument();
      expect(screen.getByText("Photo 2")).toBeInTheDocument();
    });
    expect(global.fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/photos"
    );
  });
 })