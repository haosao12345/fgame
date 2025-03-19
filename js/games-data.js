/**
 * Game data
 * Contains information for all games to be displayed on the game list page and homepage
 */
const gamesData = [
    {
        id: 'color-match',
        title: 'Color Match',
        description: 'Test your attention and reaction speed by determining if the color of a word matches its meaning.',
        type: 'focus',
        image: 'images/games/color-match.jpg',
        path: 'games/color-match.html'
    },
    {
        id: 'memory-cards',
        title: 'Memory Cards',
        description: 'Flip cards and find matching pairs to train your short-term memory and focus.',
        type: 'focus',
        image: 'images/games/memory-cards.jpg',
        path: 'games/memory-cards.html'
    },
    {
        id: 'word-scramble',
        title: 'Word Scramble',
        description: 'Rearrange letters to find hidden words and improve your vocabulary and creative thinking.',
        type: 'creative',
        image: 'images/games/word-scramble.jpg',
        path: 'games/word-scramble.html'
    },
    {
        id: 'pattern-tap',
        title: 'Pattern Tap',
        description: 'Tap patterns in the specified order to test your memory and attention.',
        type: 'focus',
        image: 'images/games/pattern-tap.jpg',
        path: 'games/pattern-tap.html'
    },
    {
        id: 'math-challenge',
        title: 'Math Challenge',
        description: 'Solve simple math problems and improve your calculation speed within time limits.',
        type: 'logic',
        image: 'images/games/math-challenge.jpg',
        path: 'games/math-challenge.html'
    },
    {
        id: 'breathing-exercise',
        title: 'Breathing Exercise',
        description: 'Follow animated breathing patterns to reduce stress and improve focus.',
        type: 'calm',
        image: 'images/games/breathing-exercise.jpg',
        path: 'games/breathing-exercise.html'
    },
    {
        id: 'puzzle-slide',
        title: 'Puzzle Slide',
        description: 'Move blocks to reconstruct images and train your spatial thinking abilities.',
        type: 'logic',
        image: 'images/games/puzzle-slide.jpg',
        path: 'games/puzzle-slide.html'
    },
    {
        id: 'word-association',
        title: 'Word Association',
        description: 'Find words related to given prompts to stimulate your creativity and associative abilities.',
        type: 'creative',
        image: 'images/games/word-association.jpg',
        path: 'games/word-association.html'
    },
    {
        id: 'sound-meditation',
        title: 'Sound Meditation',
        description: 'Listen to soothing sounds to relax your mind and restore energy.',
        type: 'calm',
        image: 'images/games/sound-meditation.jpg',
        path: 'games/sound-meditation.html'
    },
    {
        id: 'reaction-test',
        title: 'Reaction Test',
        description: 'Test your reaction speed and improve attention and hand-eye coordination.',
        type: 'focus',
        image: 'images/games/reaction-test.jpg',
        path: 'games/reaction-test.html'
    },
    {
        id: 'visual-illusion',
        title: 'Visual Illusions',
        description: 'Experience various visual illusions and understand how your brain processes visual information.',
        type: 'creative',
        image: 'images/games/visual-illusion.jpg',
        path: 'games/visual-illusion.html'
    },
    {
        id: 'logic-puzzle',
        title: 'Logic Puzzles',
        description: 'Solve logic puzzles to train your reasoning abilities and critical thinking.',
        type: 'logic',
        image: 'images/games/logic-puzzle.jpg',
        path: 'games/logic-puzzle.html'
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