import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// WCAG AA (SC 1.4.3): normal-size text must have a contrast ratio of at least 4.5:1.
// This test parses the color tokens straight from the stylesheet so any future
// palette edit that regresses contrast fails CI.

const css = readFileSync(join(__dirname, "globals.css"), "utf8");

function token(name: string): string {
  const match = css.match(new RegExp(`${name}:\\s*(#[0-9a-fA-F]{6})`));
  if (!match) throw new Error(`Token ${name} not found as a hex color in globals.css`);
  return match[1];
}

function relativeLuminance(hex: string): number {
  const [r, g, b] = [1, 3, 5]
    .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(a: string, b: string): number {
  const [hi, lo] = [relativeLuminance(a), relativeLuminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

// Text/background token pairs actually in use on the page:
// - text-secondary: body text on both page backgrounds, form labels on the card
// - text-tertiary: paragraphs and links on both page backgrounds and cards
// - text-muted: hero/stat labels (bg-primary), footer copyright (bg-secondary),
//   form attribution (bg-card), mission quote box and input placeholders (bg-tertiary)
// - text-primary: headings on page backgrounds, form input text on bg-tertiary
const pairs: Array<[text: string, background: string]> = [
  ["--color-text-primary", "--color-bg-primary"],
  ["--color-text-primary", "--color-bg-secondary"],
  ["--color-text-primary", "--color-bg-tertiary"],
  ["--color-text-secondary", "--color-bg-primary"],
  ["--color-text-secondary", "--color-bg-secondary"],
  ["--color-text-secondary", "--color-bg-card"],
  ["--color-text-tertiary", "--color-bg-primary"],
  ["--color-text-tertiary", "--color-bg-secondary"],
  ["--color-text-tertiary", "--color-bg-card"],
  ["--color-text-muted", "--color-bg-primary"],
  ["--color-text-muted", "--color-bg-secondary"],
  ["--color-text-muted", "--color-bg-card"],
  ["--color-text-muted", "--color-bg-tertiary"],
];

describe("color token contrast (WCAG AA)", () => {
  it.each(pairs)("%s on %s is at least 4.5:1", (text, background) => {
    expect(contrastRatio(token(text), token(background))).toBeGreaterThanOrEqual(4.5);
  });
});
