import '@testing-library/jest-dom';

function sum(a: number, b: number) {
  return a + b;
}

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

test('async getResponse returns Hello', async () => {
  const data = await getResponse();
  expect(data).toEqual({ value: 'Hello' });
});