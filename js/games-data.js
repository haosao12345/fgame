/**
 * Game data
 * Contains information for all games to be displayed on the game list page and homepage
 */
const gamesData = [
    {
        id: 'monster-survivors',
        title: 'Monster Survivors',
        description: 'A fast-paced action game that provides the perfect mental refresh. Navigate through waves of monsters for a quick cognitive reset.',
        type: 'focus',
        image: 'images/games/monster-survivors.jpg',
        path: 'https://cloud.onlinegames.io/games/2025/unity/monster-survivors/index-og.html'
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