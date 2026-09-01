// Every component dev page (`pnpm -C components/<name> dev`) imports `app.css`, whose
// `@import "tailwindcss"` only becomes utility classes once this plugin runs. Vite finds this
// config from any component root; the docs site sits outside `components/` and keeps compiling
// Tailwind through its own `@tailwindcss/vite` plugin.
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
}
