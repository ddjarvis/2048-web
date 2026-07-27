# 2048

A polished, responsive 2048 game built with vanilla HTML, CSS, and JavaScript. This project is a single-page web app with keyboard and touch controls, animated tiles, score tracking, local persistence, and PWA support.

## Features

- Classic 2048 gameplay on a 4×4 board
- Score, best score, moves, and timer tracking
- Keyboard controls with Arrow keys or WASD
- Touch/swipe controls for mobile devices
- Pause and resume support
- New game reset flow
- Automatic save/load using browser localStorage
- Responsive layout for desktop and mobile screens
- Tile appearance and merge animations
- Progressive web app support through a manifest and service worker

## Demo

The project is also deployed on Netlify at:

https://ddjarvis-2048.netlify.app/

## Controls

- Use the Arrow keys or WASD to move tiles
- Swipe across the board on touch devices to move tiles
- Press R to start a new game
- Use the on-screen buttons for New Game, Pause, and History

## Project Structure

- [index.html](index.html) — main app shell and game UI markup
- [scripts/actions.js](scripts/actions.js) — board movement logic and turn handling
- [scripts/controls.js](scripts/controls.js) — keyboard and swipe input handlers
- [scripts/events.js](scripts/events.js) — score updates, session resets, win/lose/pause state handling
- [scripts/helpers.js](scripts/helpers.js) — tile compression and merge utilities
- [scripts/reactivity.js](scripts/reactivity.js) — reactive state model used by the UI
- [scripts/reactiveBindings.js](scripts/reactiveBindings.js) — binds reactive values to DOM elements
- [scripts/dataStorage.js](scripts/dataStorage.js) — save/load logic using localStorage
- [scripts/ui.js](scripts/ui.js) — board rendering and tile animation updates
- [styles/base.css](styles/base.css) — base reset and layout rules
- [styles/style.css](styles/style.css) — global page styling
- [styles/gameStyle.css](styles/gameStyle.css) — board, tile, and button styling
- [styles/fonts.css](styles/fonts.css) — font-face definitions
- [manifest.json](manifest.json) — PWA manifest
- [service-worker.js](service-worker.js) — caching and offline support
- [assets/](assets/) — icons, fonts, and audio assets
- [css-debug/](css-debug/) — optional debug helpers for viewport inspection

## Running Locally

No build step or package installation is required.

You can open [index.html](index.html) directly in a browser, or serve the project from a local web server:

```bash
python -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## Notes

- The game saves progress in the browser so a refresh or revisit can restore the previous state.
- The History button is present in the UI, but the current implementation does not yet provide a complete history feature.
- [temp.js](temp.js) appears to be a scratch/debug helper and is not part of the core game flow.

## Author

Built by David Jarvis.
