import { combineReducers } from "./combineReducers";

describe("Test combineReducers function", () => {
  let fn;

  beforeEach(() => {
    fn = jest.fn(combineReducers);
  });

  it("should called", () => {
    fn();
    expect(fn).toHaveBeenCalled();
  });

  it("should return function", () => {
    const returnedOnj = fn();
    expect(typeof returnedOnj).toBe("function");
  });
});
