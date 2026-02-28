---
name: create-new-component
description: Create a new Stimulus component package under components/<name>/ following repo conventions
---

# Skill: Create a new Stimulus component

When the user asks to create a new component (or "add a component"), create a full component package under `components/<name>/` following this repo's conventions.

## 1. Get the component name

- **Name**: Use a **kebab-case** name (e.g. `my-controller`, `auto-submit`).
- **Class**: PascalCase (e.g. `MyController`, `AutoSubmit`).
- **Controller identifier**: Same as name, kebab-case (e.g. `data-controller="my-controller"`).
- **Build fileName**: `stimulus-<name>` (e.g. `stimulus-my-controller`).
- **Package name**: `@stimulus-components/<name>`.

If the user gives a single name (e.g. "tabs"), derive: name = `tabs`, class = `Tabs`, identifier = `tabs`, fileName = `stimulus-tabs`.

## 2. Create the component folder and files

Create `components/<name>/` with these files.

### `components/<name>/src/index.ts`

- One default-exported class extending `Controller` from `@hotwired/stimulus`.
- Class name = PascalCase of the name (e.g. `Tabs` for `tabs`).
- Use `declare` for TypeScript typings of any `static targets` and `static values`.
- Use `static targets = ["..."]` and/or `static values = { ... }` as needed.
- Prefer `connect()` / `disconnect()` for setup/teardown; use `initialize()` when binding methods (e.g. for event handlers).
- If the component needs transitions or other stimulus-use features, add `stimulus-use` and use it like in `dropdown`; otherwise depend only on `@hotwired/stimulus` like `character-counter`.

Minimal template (no extra deps):

```ts
import { Controller } from "@hotwired/stimulus"

export default class<PascalName> extends Controller {
  static targets = [] // e.g. ["panel"]
  static values = {} // e.g. { open: Boolean } if needed

  connect(): void {
    // setup
  }

  disconnect(): void {
    // teardown
  }
}
```

### `components/<name>/package.json`

- `name`: `"@stimulus-components/<name>"`
- `version`: `"1.0.0"`
- `description`: One line describing the controller.
- `keywords`: Include `"stimulus"`, `"stimulusjs"`, `"stimulus controller"`, and the component name.
- Copy `repository`, `bugs`, `author`, `license`, `homepage`, `private`, `publishConfig` from `components/character-counter/package.json`.
- `main`: `"dist/stimulus-<name>.umd.js"`
- `module`: `"dist/stimulus-<name>.mjs"`
- `types`: `"dist/types/index.d.ts"`
- `scripts`: `"types": "tsc --noEmit false --declaration true --emitDeclarationOnly true --outDir dist/types"`, `"dev": "vite"`, `"build": "vite build && pnpm run types"`, `"version": "pnpm run build"`
- **peerDependencies**: `"@hotwired/stimulus": "^3"`
- **dependencies**: Only if needed (e.g. `"stimulus-use": "^0.52.3"` for transition/use APIs).

### `components/<name>/vite.config.mts`

- `entry`: `resolve(__dirname, "src/index.ts")`
- `name`: `Stimulus<PascalName>` (e.g. `StimulusTabs`)
- `fileName`: `stimulus-<name>`
- `external` and `output.globals`: Include `@hotwired/stimulus`; add `stimulus-use` (and globals) only if the component uses it.

Use `components/character-counter/vite.config.mts` as base when there are no extra deps; use `components/dropdown/vite.config.mts` when using stimulus-use.

### `components/<name>/tsconfig.json`

```json
{ "extends": "../../tsconfig.json" }
```

### `components/<name>/index.html`

- Title: `Stimulus <PascalName>`.
- Import `../app.css`, `Application` from `@hotwired/stimulus`, and the controller from `./src/index`.
- Start Application, register controller with identifier `"<name>"` (e.g. `"tabs"`).
- Body: one or more examples with `data-controller="<name>"` and the right targets/values.

### `components/<name>/README.md`

- Title: `Stimulus <PascalName>`.
- Short “Getting started” and link to docs: `https://www.stimulus-components.com/docs/stimulus-<name>/`.
- Standard “Contributing” and “License” sections (see `components/dropdown/README.md`).

### `components/<name>/CHANGELOG.md`

- Use “Keep a Changelog” style.
- Initial entry: `## [Unreleased]` and `## 1.0.0 - <date>` with “### Added” and “- Initial release.” or similar.

## 3. Shared code

- If the component needs debounce/throttle/sleep, import from `"../../../utils"` (relative to repo root), e.g. `import { debounce } from "../../../utils"`.

## 4. Tests (recommended)

- Create `components/<name>/spec/index.test.ts`.
- Use Vitest: `describe`, `it`, `beforeEach`, `expect`.
- Start Stimulus with `Application.start()`, register the controller with the kebab-case name, then set `document.body.innerHTML` with the right `data-controller`, targets, and values.
- See `components/character-counter/spec/index.test.ts` for structure.

## 5. Docs site (optional)

- Add to `docs/package.json` dependencies: `"@stimulus-components/<name>": "workspace:*"`.
- Add a Vue demo in `docs/components/content/Demo/<PascalName>.vue` if the component should appear in the docs.
- Add content and routes in `docs/` as needed (e.g. @nuxt/content).

## 6. Checklist

- [ ] All identifiers use kebab-case; class name is PascalCase.
- [ ] `package.json` name is `@stimulus-components/<name>` and build outputs `stimulus-<name>.mjs` / `stimulus-<name>.umd.js`.
- [ ] `vite.config.mts` has correct `name`, `fileName`, and externals/globals.
- [ ] No semicolons; Prettier 120 print width (per `.prettierrc`).
- [ ] Run from repo root: `pnpm install`, `pnpm run lint`, `pnpm run test`.

## Quick reference: naming

| Concept       | Example (name: `tabs`)            |
| ------------- | --------------------------------- |
| Folder        | `components/tabs/`                |
| Package name  | `@stimulus-components/tabs`       |
| Controller id | `tabs` (`data-controller="tabs"`) |
| Class name    | `Tabs`                            |
| Vite lib name | `StimulusTabs`                    |
| File name     | `stimulus-tabs`                   |
