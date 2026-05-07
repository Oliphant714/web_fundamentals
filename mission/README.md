# Mission Statement Page

This folder contains a simple mission statement webpage for Brigham Young University-Idaho.

## What it does

- Displays the BYU-Idaho mission statement and its supporting list of goals.
- Lets the user switch between light and dark themes with a select menu.
- Saves the selected theme in `localStorage` so the choice persists on return visits.
- Swaps the logo image to match the active theme.

## Files

- `index.html` - The page structure, text content, theme selector, and logo.
- `styles.css` - The main styling for the page layout, typography, and theme colors.
- `mission.js` - Theme switching logic and logo updates.
- `index.css` - An alternate stylesheet version for the mission page.
- `byui-logo-blue.webp` - Logo used in the light theme.
- `byui-logo-dark.png` - Logo used in the dark theme.

## Page Content

The page includes:

- A mission statement heading.
- The BYU-Idaho subtitle.
- An introductory paragraph describing the university mission.
- A list of four ways the university carries out that mission.
- A BYU-Idaho logo in the footer.

## Theme Behavior

- Light mode uses the blue logo.
- Dark mode uses the dark logo.
- The selected theme is applied when the page loads.

## Notes

The page is built with plain HTML, CSS, and JavaScript, with no external dependencies.
