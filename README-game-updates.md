# Game Pages Update Guide

This guide explains how to maintain consistent branding and styling across all game pages for the onerestgame website.

## Overview

We've created a system to ensure all game pages have a consistent look and feel, with proper branding as "onerestgame". The system includes:

1. A game card component (`js/components/game-card.js`) for displaying game cards in a configurable way
2. A template file (`games/game-template.html`) that defines the structure for all game pages
3. An update script (`js/update-game-pages.js`) that can automatically update all game pages to maintain consistency

## How to Use the Update Script

When you need to update all game pages (for example, after changing the branding or making design changes):

### Prerequisites

- Node.js installed on your system
- Access to the project files

### Steps

1. Make sure your game data is correctly defined in `js/games-data.js`
2. Update the template in `games/game-template.html` if needed
3. Run the update script:

```bash
node js/update-game-pages.js
```

4. Check the updated game pages to ensure everything looks correct

## Adding a New Game

When adding a new game:

1. Add the game data to `js/games-data.js` with all required fields:
   - `id`: A unique identifier for the game
   - `title`: The display name of the game
   - `description`: A short description of the game
   - `type`: The game type (focus, creative, logic, or calm)
   - `image`: Path to the game image
   - `path`: Path to the game HTML file

2. Create any game-specific CSS and JS files (with names matching the game ID)

3. Run the update script to generate the game page:

```bash
node js/update-game-pages.js
```

4. Customize the game-specific JavaScript to implement the game functionality

## Customizing Game Pages

While the update script ensures consistency, you may need to customize specific aspects of a game:

- For game-specific styling, edit the CSS file named after the game ID
- For game-specific behavior, edit the JS file named after the game ID
- If a game requires completely custom HTML, create it manually but ensure it follows the branding guidelines

## Troubleshooting

If you encounter issues when running the update script:

- Make sure all paths in the script are correct for your environment
- Check that the games-data.js file is properly formatted
- Ensure you have write permissions for the games directory

## Maintaining Brand Consistency

Remember these key elements of the onerestgame brand:

- Always use "onerestgame" (lowercase) in the logo and references
- Use the standard footer with SEO content
- Maintain the consistent color scheme and typography across all pages
- All content should be in English for international users

For any questions or issues, please contact the web development team. 