/* Tailwind for the component playground pages (`components/<name>/index.html`,
   which all import `../app.css`). It lives here, not at the repo root, so the
   docs app keeps using @tailwindcss/vite alone: Vite searches for a PostCSS
   config upwards from its root, and `docs/` never reaches this directory. */
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
}
