import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import About from "./About";

describe("should render", () => {
  it("should render", () => {
    render(<About />);
    screen.debug();
  });
});
