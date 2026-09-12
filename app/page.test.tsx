import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import Home from "./page";

afterEach(cleanup);

describe("page structural honesty", () => {
  it("has no anchor pointing at #", () => {
    const { container } = render(<Home />);
    const deadLinks = Array.from(container.querySelectorAll("a")).filter(
      (a) => a.getAttribute("href") === "#"
    );
    expect(deadLinks).toEqual([]);
  });

  it("has no fake 'Learn more' affordances", () => {
    const { queryByText } = render(<Home />);
    expect(queryByText(/learn more/i)).toBeNull();
  });

  it("keeps the footer contact details after removals", () => {
    const { getByText } = render(<Home />);
    const email = getByText("info@required.ee");
    expect(email.closest("a")?.getAttribute("href")).toBe(
      "mailto:info@required.ee"
    );
    expect(getByText("Tallinn, Estonia")).toBeTruthy();
  });
});
