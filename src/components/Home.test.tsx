import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import Home from './Home';


function sum(a: number, b: number) {
  return a + b;
}

// afterall, aftereach, beforeall, beforeeach

let data = [] 

beforeAll(() => {
  console.log("beforeAll")
})

beforeEach(() => {
  console.log("beforeEach");
  data = [2, 3, 4, 5];
});

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
  expect(sum(2, 2)).not.toBe(3);
});

test("object assignment", () => {
  const data = {one: 1};
  data["two"] = 2;
  expect(data).toEqual({one: 1, two: 2});
});

test('There is a "stop" in Christoph', () => {
  expect('Christoph').toMatch(/stop/);
});

async function getResponse() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ value: 'Hello' });
    }, 182)
  })
}

// test('async getResponse returns Hello', async () => {
//   const data = await getResponse();
//   expect(data).toEqual({ value: 'Hello' });
// });

describe("Combine promise response value", () => {
  test("async getResponse returns Hello", async () => {
    const data = await getResponse();
    expect(data).toEqual({ value: "Hello" });
  });
  test("async getResponse should not return abcd", async () => {
    const data = await getResponse();
    expect(data).not.toEqual({ value: "abcd" });
  });
})

describe("Testing Home component", () => {
  beforeEach(() => {
    render(<Home />);
  })
  it("redners a heading", () => {
    const text = screen.getByText(/home/i);
    expect(text).toBeInTheDocument();
  });
  it("redners a heading h1", () => {
    const text = screen.getByRole("heading", {level: 1});
    expect(text).toBeInTheDocument();
  });
  it("test the description", () => {
    const text = screen.getByTestId("desc");
    expect(text.textContent).toMatch(/description/i);
  });
})

jest.mock("next/navigation", () => ({
  useRouter: jest.fn()
}))


test("Test navigation to another router", () => {
  const mockPush = jest.fn();
  useRouter.mockReturnValue({
    push: mockPush
  })
  render(<Home />);
  const button = screen.getByRole("button");
  fireEvent.click(button);
  expect(mockPush).toHaveBeenCalledWith("myroute");
})

test('should navigate to "myroute" when button is clicked', () => {
  const mockPush = jest.fn();
  const useRouterMock = jest.spyOn(require("next/navigation"), "useRouter").mockReturnValue({ push: mockPush})
  const { getByText } = render(<Home />);
  fireEvent.click(getByText("Navigate to my route"));
  expect(mockPush).toHaveBeenCalledWith("myroute");
  useRouterMock.mockRestore();
})

// Here is the unit test code for Home.test.tsx:

jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

describe('Home Component', () => {
  const mockPush = jest.fn();
  
  beforeEach(() => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      push: mockPush
    }));
  });
  
  it('navigates to correct route when button is clicked', () => {
    render(<Home />);
    const button = screen.getByTestId('nav-button');
    fireEvent.click(button);
    expect(mockPush).toHaveBeenCalledWith('myroute');
  });
});