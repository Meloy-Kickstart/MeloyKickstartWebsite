import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// jsdom lacks these browser APIs that framer-motion and the navbar use
class IO {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
vi.stubGlobal("IntersectionObserver", IO);
vi.stubGlobal("ResizeObserver", IO);

window.matchMedia =
  window.matchMedia ||
  ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }));

window.scrollTo = () => {};
