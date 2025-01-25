import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import NotesApp from "./NotesForm";

describe("Testing NotesApp component", () => {
  beforeEach(() => {
    render(<NotesApp />);
  });
  it("renders a title", () => {
    const text = screen.getByText(/Notes App/i);
    expect(text).toBeInTheDocument();
  });
    
  it("renders a form", () => {
    const text = screen.getByTestId("noteslist");
    expect(text).toBeInTheDocument();
  });
  it("renders an input", () => {
    const textInput = screen.getByPlaceholderText(/Add a note/i);
    expect(textInput).toBeInTheDocument();
  });
  it("renders a button", () => {
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
  it("fill the input note texbox to make button enabled", () => {
    const textInput = screen.getByPlaceholderText(/Add a note/i);
    fireEvent.change(textInput, { target: { value: "This is a note" } });
    const button = screen.getByRole("button");
    expect(button).not.toBeDisabled();
  });
  it("click on submit button", () => {
    const textInput = screen.getByPlaceholderText(/Add a note/i);
    fireEvent.change(textInput, { target: { value: "This is a note" } });
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(textInput).toHaveValue("");
  });
  it("test notes list", () => {
    const textInput = screen.getByPlaceholderText(/Add a note/i);
    const notesList = screen.getByTestId("noteslist");
    const addNoteButton = screen.getByRole("button");
    expect(notesList.querySelectorAll("li")).toHaveLength(0);
    fireEvent.change(textInput, { target: { value: "This is a note 1" } });
    fireEvent.click(addNoteButton);
    fireEvent.change(textInput, { target: { value: "This is a note 2" } });
    fireEvent.click(addNoteButton);
    expect(notesList.querySelectorAll("li")).toHaveLength(2);
  })
});
