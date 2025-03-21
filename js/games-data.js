/**
 * Game data
 * Contains information for all games to be displayed on the game list page and homepage
 */
const gamesData = [
    {
        id: 'draw-here',
        title: 'Draw Here',
        description: 'A creative drawing game that provides the perfect mental refresh. Express yourself freely while giving your analytical brain a rest.',
        type: 'creative',
        image: 'images/games/draw-here.jpg',
        path: 'https://www.onlinegames.io/games/2021/unity2/draw-here/index.html'
    },
    {
        id: 'House-Painter',
        title: 'House Painter',
        description: 'A relaxing coloring game that helps reduce stress. Fill spaces with colors to create a beautiful house while refreshing your mind.',
        type: 'calm',
        image: 'images/games/House-Painter.jpg',
        path: 'https://www.onlinegames.io/games/2023/construct/238/house-painter/index.html'
    },
    {
        id: 'Charge-It',
        title: 'Charge It',
        description: 'A strategic circuit-building puzzle game designed to provide an effective mental break while exercising logical thinking.',
        type: 'logic',
        image: 'images/games/Charge-It.jpg',
        path: 'https://www.onlinegames.io/games/2023/construct/241/charge-it/index.html'
    },
    {
        id: 'Tetris',
        title: 'Tetris',
        description: 'The classic block-stacking puzzle game that offers a perfect brain refresh. Arrange falling tetrominoes to clear lines and improve your spatial reasoning.',
        type: 'logic',
        image: 'images/games/Tetris.jpg',
        path: 'https://www.onlinegames.io/games/2024/more/tetris/index.html'
    }
];

/**
 * Get all games data
 * @returns {Array} Array of game data
 */
function getAllGames() {
    return gamesData;
}

/**
 * Get game data by ID
 * @param {string} id Game ID
 * @returns {Object|null} Game data object or null
 */
function getGameById(id) {
    return gamesData.find(game => game.id === id) || null;
}

/**
 * Filter games by type
 * @param {string} type Game type
 * @returns {Array} Filtered array of games
 */
function getGamesByType(type) {
    if (type === 'all') {
        return gamesData;
    }
    return gamesData.filter(game => game.type === type);
}

/**
 * Get featured games for homepage display
 * @param {number} count Number of games to get
 * @returns {Array} Array of featured games
 */
function getFeaturedGames(count = 6) {
    // Different recommendation logic can be implemented here as needed
    // Simple example: randomly select a specified number of games
    const shuffled = [...gamesData].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

/**
 * Get the display name for a game type
 * @param {string} type Game type
 * @returns {string} Type display name
 */
function getGameTypeName(type) {
    const typeNames = {
        'focus': 'Focus',
        'creative': 'Creativity',
        'logic': 'Logic',
        'calm': 'Relaxation'
    };
    return typeNames[type] || 'Unknown';
} 