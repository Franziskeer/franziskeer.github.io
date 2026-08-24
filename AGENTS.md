# Agent guidelines

## CSS and Tailwind (hybrid)

Prefer a hybrid styling approach. It is a default, not a hard rule — bend it when doing so clearly improves clarity or reuse.

### Where styles live

- **Shared tokens and utilities** → [`src/styles/global.css`](src/styles/global.css). Put values in `@theme`. Add `@utility` only when the same pattern is used in two or more components.
- **Component structure, states, and animations** → short semantic classes plus a `<style>` block in the same `.astro` file. Do not create per-component CSS files (`Navbar.css`, style partials folders, etc.).
- **Tailwind in markup** → fine for short, readable utility strings (roughly one line). If a class list is dense, mixes layout with interactive state, or needs keyframes / attribute selectors, move it into the component `<style>`.

### Flexibility

Break the default only when it adds value, for example:

- An effect consumed by a React island (use `:global(...)` from the parent `.astro`, or a justified entry in `global.css`).
- A 2–3 class pattern repeated across components → one `@utility` in `global.css`.

Do not abstract “just in case.”

### Quick decision

1. Reused in ≥2 components? → `global.css` (`@theme` / `@utility`).
2. Dense Tailwind or stateful/animated? → semantic class + scoped `<style>` in the `.astro`.
3. Otherwise → Tailwind utilities in the markup.
