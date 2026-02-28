# Agent guide – Stimulus Components

This document helps AI agents and contributors work effectively in this codebase.

## Project overview

**Stimulus Components** is a monorepo of reusable [Stimulus](https://stimulus.hotwired.dev/) controllers. Each component is a small, publishable npm package under `@stimulus-components/<name>`.

- **Docs**: Nuxt 3 site at [stimulus-components.com](https://www.stimulus-components.com/), in `docs/`.
- **Components**: Individual Stimulus controllers in `components/<name>/`, each with its own `package.json`, build, and optional tests.

## Repository layout

```
stimulus-components/
├── components/           # Stimulus controller packages
│   └── <name>/           # e.g. dropdown, dialog, character-counter
│       ├── src/index.ts  # Controller entry (TypeScript)
│       ├── spec/         # Vitest tests (when present)
│       ├── vite.config.mts
│       ├── package.json
│       ├── README.md
│       └── CHANGELOG.md
├── docs/                 # Nuxt 3 documentation site
├── utils/                # Shared helpers (debounce, throttle, sleep)
├── pnpm-workspace.yaml   # Workspaces: docs, components/**
├── package.json          # Root scripts: lint, lintfix, test, docs
├── tsconfig.json
├── .eslintrc.js
└── .prettierrc
```

## Tech stack

- **Package manager**: pnpm (workspaces)
- **Language**: TypeScript (controllers), Vue 3 (docs)
- **Stimulus**: `@hotwired/stimulus` ^3
- **Build**: Vite per component (lib mode; UMD + ESM)
- **Tests**: Vitest; some components have `spec/index.test.ts`
- **Lint**: ESLint (@nuxt/eslint-config + Prettier), `tsc --noEmit`
- **Docs**: Nuxt 3, @nuxt/content, Tailwind

## Conventions

### Controller structure

- One default-exported class extending `Controller` from `@hotwired/stimulus`.
- Use `static targets = ["..."]` and `static values = { ... }` for targets/values.
- Use `declare` for TypeScript typings of Stimulus-injected targets/values.
- Lifecycle: prefer `connect()` / `disconnect()` for setup/teardown; use `initialize()` when binding methods (e.g. for event handlers).

### Naming

- **Package/dir**: kebab-case (e.g. `character-counter`, `auto-submit`).
- **Controller identifier**: same kebab-case (e.g. `data-controller="character-counter"`).
- **Class name**: PascalCase (e.g. `CharacterCounter`).
- **Build output**: `stimulus-<name>` (e.g. `stimulus-dropdown.mjs`, `stimulus-dropdown.umd.js`).

### Per-component package

- **Entry**: `src/index.ts`.
- **Build**: Vite lib; `fileName: "stimulus-<name>"`; externals: `@hotwired/stimulus` (and e.g. `stimulus-use` when used).
- **Types**: generated into `dist/types/` via a `types` script (e.g. `tsc --noEmit false --declaration true --emitDeclarationOnly true --outDir dist/types`).
- **peerDependencies**: at least `@hotwired/stimulus: ^3`.

### Shared code

- **Root `utils/`**: `debounce`, `throttle`, `sleep`. Import from `"../../../utils"` inside `components/<name>/src/` (relative to repo root).

### Tests

- Location: `components/<name>/spec/index.test.ts`.
- Use Vitest: `describe`, `it`, `beforeEach`, `expect`.
- Start Stimulus with `Application.start()`, register the controller (kebab-case name), then set `document.body.innerHTML` with the right `data-controller` and targets/values.

### Code style

- Prettier: print width 120, no semicolons (`.prettierrc`).
- ESLint: run `pnpm run lint` / `pnpm run lintfix` from root.

## Commands (from repo root)

| Command        | Description                          |
|----------------|--------------------------------------|
| `pnpm install` | Install all workspace dependencies   |
| `pnpm run lint`| Type-check + ESLint                  |
| `pnpm run lintfix` | Prettier + ESLint --fix          |
| `pnpm run test`| Run Vitest for all tests             |
| `pnpm run docs`| Start Nuxt docs dev server          |

## Working on a component

1. **Edit**: Change `components/<name>/src/index.ts` (and add/update `spec/` if needed).
2. **Build**: From component dir, `pnpm run build` (or use root `pnpm run lint` / `pnpm run test`).
3. **Publish** (from README):  
   `pnpm run lintfix && pnpm run test` then `cd components/<name>` and `pnpm version <patch|minor|major>` and `pnpm publish`.

## Adding a new component

1. Copy an existing component folder (e.g. `dropdown` or `character-counter`) under `components/<new-name>/`.
2. Rename the class and controller identifier to match `<new-name>` (kebab → Pascal for class).
3. Update `package.json`: `name: "@stimulus-components/<new-name>"`, scripts, and build `fileName`/`name`.
4. Update `vite.config.mts`: entry, `name` (e.g. `StimulusDropdown`), `fileName`, and `external`/`globals` to match dependencies.
5. Add the package to `docs/package.json` dependencies as `"@stimulus-components/<new-name>": "workspace:*"` if the docs should use it.
6. Add docs and demos in `docs/` as needed (content + Vue demo components).

## Docs site

- **Docs app**: `docs/` (Nuxt 3).
- **Component demos**: Vue components under `docs/components/content/Demo/` (e.g. `Dropdown.vue`, `CharacterCounter.vue`).
- **Content**: Likely driven by @nuxt/content; check `docs/` for content sources and routes.

## Things to avoid

- Don’t add new root dependencies for a single component; use peer deps or the existing `utils/` where possible.
- Don’t change the Stimulus version range (^3) without checking all components and docs.
- Don’t commit `dist/` or `node_modules` (see `.gitignore`).

## Quick reference: component list (as of this writing)

animated-number, auto-submit, carousel, character-counter, chartjs, checkbox-select-all, clipboard, color-picker, confirmation, content-loader, dialog, dropdown, glow, lightbox, notification, password-visibility, places-autocomplete, popover, prefetch, rails-nested-form, read-more, remote-rails, reveal-controller, scroll-progress, scroll-reveal, scroll-to, sortable, sound, textarea-autogrow, timeago.  
(Plus e.g. `lexxy`; list may grow—prefer scanning `components/` when in doubt.)
