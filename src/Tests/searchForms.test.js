import {
  render,
  fireEvent,
  waitFor,
  getByDisplayValue,
} from "@testing-library/react";
import SearchIncidents from "../component/SearchForms";

test("renders form", () => {
  render(<SearchIncidents />);
});

test("displays search criteria dropdown", () => {
  const { container } = render(<SearchIncidents />);
  const searchInput = container.querySelector("#search-criteria");
  expect(searchInput).toBeInTheDocument();
});

test("displays search input field", () => {
  const { container } = render(<SearchIncidents />);
  const searchInput = container.querySelector("#search-term");
  expect(searchInput).toBeInTheDocument();
});

test("updates search term when typing", () => {
  const { container } = render(<SearchIncidents />);
  const searchInput = container.querySelector("#search-term");

  fireEvent.change(searchInput, { target: { value: "Test Search Term" } });
  expect(searchInput.value).toBe("Test Search Term");
});
