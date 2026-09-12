import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import Navigation from "./Navigation";

afterEach(cleanup);

describe("mobile menu semantics", () => {
  it("toggle reports aria-expanded and points aria-controls at the menu", () => {
    const { getByRole } = render(<Navigation />);
    const toggle = getByRole("button", { name: /toggle menu/i });

    expect(toggle.getAttribute("aria-expanded")).toBe("false");

    fireEvent.click(toggle);
    expect(toggle.getAttribute("aria-expanded")).toBe("true");
    const menuId = toggle.getAttribute("aria-controls");
    expect(menuId).toBeTruthy();
    expect(document.getElementById(menuId as string)).toBeTruthy();

    fireEvent.click(toggle);
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
  });

  it("closes an open menu on Escape", () => {
    const { getByRole } = render(<Navigation />);
    const toggle = getByRole("button", { name: /toggle menu/i });

    fireEvent.click(toggle);
    expect(toggle.getAttribute("aria-expanded")).toBe("true");

    fireEvent.keyDown(document, { key: "Escape" });
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
  });
});
