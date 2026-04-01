# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WME E85 is a TamperMonkey/GreaseMonkey userscript for Waze Map Editor (WME). It provides tools to simplify and straighten street geometry — removing unnecessary geometry nodes, straightening segments, aligning segments by angle, and removing micro doglegs.

Source is written in TypeScript under `src/`, built with Rollup into a single IIFE at `dist/WME-E85.user.js`. GreasyFork auto-syncs from the dist output.

## Commands

- **Install:** `npm install`
- **Build:** `npm run build`
- **Watch:** `npm run watch` (rebuild on changes)
- No test or lint steps exist.

## Architecture

```
src/
├── meta.ts          # userscript header (comment block, not TS code)
├── style.css        # plain CSS, imported as string
├── globals.d.ts     # declares WME runtime globals (WMEBase, WMEUI, GeoUtils, etc.)
├── translations.ts  # NAME constant, TRANSLATION (en, uk, ru)
├── settings.ts      # SETTINGS defaults, getButtons() function
├── e85.ts           # E85 class (extends WMEBase)
└── index.ts         # bootstrap: registers translations/CSS, instantiates E85
```

**Build output:** `dist/WME-E85.user.js` — IIFE with userscript header prepended as banner. Version is read from `package.json` via `{{version}}` placeholder in `meta.ts`.

**Key external dependencies** (loaded via `@require` in userscript header, not bundled):
- WME-Bootstrap.js, WME-Base.js, WME-UI.js, CommonUtils.js (WME script ecosystem)
- GeoUtils.js (spherical geometry utilities — bearing, distance, intersection)

## Important Notes

- GeoUtils is loaded externally via `@require`, NOT bundled. It is declared in `globals.d.ts` and used as a global class with static methods throughout `e85.ts`.
- The `getButtons()` function in `settings.ts` must be called at runtime (not module load time) because it depends on `I18n.t()` which requires translations to be registered first.

## Coding Conventions

- TypeScript with `strict: false` — minimal type annotations, `any` for WME SDK types
- GitHub Actions auto-builds `dist/` on push to main
