/**
 * Game Pages Update Script
 * 
 * This script helps update all game pages to ensure consistent branding and styling.
 * It uses the game data from games-data.js and the template from game-template.html
 * to generate or update game pages.
 */

// Load the required Node.js modules
const fs = require('fs');
const path = require('path');

// Define paths
const GAMES_DATA_PATH = path.join(__dirname, 'games-data.js');
const TEMPLATE_PATH = path.join(__dirname, '..', 'games', 'game-template.html');
const GAMES_DIRECTORY = path.join(__dirname, '..', 'games');

// Helper function to extract game data array from games-data.js
function extractGamesData() {
    // Read the games-data.js file
    const gamesDataContent = fs.readFileSync(GAMES_DATA_PATH, 'utf8');
    
    // Extract the gamesData array
    const gamesDataMatch = gamesDataContent.match(/const\s+gamesData\s*=\s*\[([\s\S]*?)\];/);
    
    if (!gamesDataMatch) {
        console.error('Failed to extract games data from games-data.js');
        return null;
    }
    
    // Parse the games data array
    const gamesDataString = `[${gamesDataMatch[1]}]`;
    
    // Use Function constructor to safely evaluate the games data
    // Note: This assumes games-data.js is trusted content
    const gamesData = new Function(`return ${gamesDataString}`)();
    
    return gamesData;
}

// Helper function to get game type display name
function getGameTypeName(type) {
    const typeNames = {
        'focus': 'Focus',
        'creative': 'Creativity',
        'logic': 'Logic',
        'calm': 'Relaxation'
    };
    return typeNames[type] || 'Unknown';
}

// Helper function to generate game instructions based on game type
function generateGameInstructions(game) {
    // This is a simple example - in a real implementation,
    // you might want to store these instructions in a separate file or in the game data
    
    const genericInstructions = `
    <p>This game helps improve your ${game.type === 'focus' ? 'focus and attention' : 
      game.type === 'creative' ? 'creative thinking' : 
      game.type === 'logic' ? 'logical reasoning' : 
      'relaxation and mindfulness'}.</p>
    <ul>
        <li>Follow the on-screen instructions to play.</li>
        <li>Try to improve your score with each session.</li>
        <li>Take breaks if needed - mental refreshment is the goal!</li>
    </ul>
    `;
    
    return genericInstructions;
}

// Helper function to generate game content placeholder
function generateGameContent(game) {
    return `
    <div class="game-welcome" id="gameWelcome">
        <h2>Ready?</h2>
        <p>Click the "Start Game" button to begin the challenge!</p>
        <button class="btn btn-primary" id="startButton">Start Game</button>
    </div>

    <div class="game-play" id="gamePlay" style="display: none;">
        <!-- Game-specific content will be implemented in the game's JavaScript -->
        <div class="game-placeholder">
            <p>Game content will appear here when started.</p>
        </div>
    </div>

    <div class="game-over" id="gameOver" style="display: none;">
        <h2 class="game-over-title">Game Over!</h2>
        <p class="game-over-score">Your score: <span id="finalScore">0</span></p>
        <p class="game-over-message" id="gameOverMessage"></p>
        <div class="game-over-buttons">
            <button class="btn btn-primary" id="playAgainBtn">Play Again</button>
            <button class="btn btn-secondary" id="shareBtn">Share Score</button>
        </div>
    </div>
    `;
}

// Main function to update a single game page
function updateGamePage(game) {
    console.log(`Updating game page for: ${game.title}`);
    
    // Read the template
    let templateContent = fs.readFileSync(TEMPLATE_PATH, 'utf8');
    
    // Get the game file name from the path
    const gameFileName = path.basename(game.path);
    const gameId = game.id;
    
    // Extract CSS and JS file names (assuming they match the game ID)
    const gameCss = gameId;
    const gameJs = gameId;
    
    // Extract image file name from the image path
    const gameImage = path.basename(game.image);
    
    // Replace template placeholders
    const gamePageContent = templateContent
        .replace(/{{GAME_TITLE}}/g, game.title)
        .replace(/{{GAME_DESCRIPTION}}/g, game.description)
        .replace(/{{GAME_CSS}}/g, gameCss)
        .replace(/{{GAME_IMAGE}}/g, gameImage)
        .replace(/{{GAME_TYPE}}/g, game.type)
        .replace(/{{GAME_TYPE_NAME}}/g, getGameTypeName(game.type))
        .replace(/{{GAME_LONG_DESCRIPTION}}/g, game.description)
        .replace(/{{GAME_INSTRUCTIONS}}/g, generateGameInstructions(game))
        .replace(/{{GAME_CONTENT}}/g, generateGameContent(game))
        .replace(/{{GAME_JS}}/g, gameJs)
        .replace(/{{ADDITIONAL_SCRIPTS}}/g, '');
    
    // Write the updated game page
    fs.writeFileSync(path.join(GAMES_DIRECTORY, gameFileName), gamePageContent);
    
    console.log(`Successfully updated: ${gameFileName}`);
}

// Main function to update all game pages
function updateAllGamePages() {
    console.log('Starting to update all game pages...');
    
    // Extract games data
    const gamesData = extractGamesData();
    
    if (!gamesData) {
        return;
    }
    
    // Update each game page
    gamesData.forEach(game => {
        updateGamePage(game);
    });
    
    console.log('All game pages updated successfully!');
}

// Execute the update function
updateAllGamePages(); 