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
        id: 'house-painter',
        title: 'Home House Painter',
        description: 'A relaxing coloring game that helps reduce stress. Fill spaces with colors to create a beautiful house while refreshing your mind.',
        type: 'calm',
        image: 'images/games/House-Painter.jpg',
        path: 'https://www.onlinegames.io/games/2023/construct/238/house-painter/index.html'
    },
    {
        id: 'charge-it',
        title: 'Charge It',
        description: 'A strategic circuit-building puzzle game designed to provide an effective mental break while exercising logical thinking.',
        type: 'logic',
        image: 'images/games/Charge-It.jpg',
        path: 'https://www.onlinegames.io/games/2023/construct/241/charge-it/index.html'
    },
    {
        id: 'tetris',
        title: 'Tetris',
        description: 'Classic puzzle game for quick mental refreshment',
        type: 'logic',
        image: 'images/games/Tetris.jpg',
        path: 'https://www.onlinegames.io/games/2024/more/tetris/index.html'
    },
    //0323增加
    {
        id: 'block-blast',
        title: 'Block Blaster Puzzle',
        description: 'Aim for high scores or complete level objectives. Rotate and arrange blocks to clear rows and columns while enjoying stunning visuals. Each perfect move brings satisfaction, challenging you to beat your best and master each puzzle!.',
        type: 'logic',
        image: 'images/games/block-blast.jpg',
        path: 'https://cloud.onlinegames.io/games/2024/unity3/block-blast/index-og.html'
    },
    {
        id: 'draw-the-bridge',
        title: 'Draw The Bridge',
        description: 'The classic block-stacking puzzle game that offers a perfect brain refresh. Arrange falling tetrominoes to clear lines and improve your spatial reasoning.',
        type: 'logic',
        image: 'images/games/Draw-the-Bridge.jpg',
        path: 'https://www.onlinegames.io/games/2021/4/draw-the-bridge/index.html'
    },
    {
        id: 'find-it',
        title: 'Find It Out Colorful Book',
        description: 'The classic block-stacking puzzle game that offers a perfect brain refresh. Arrange falling tetrominoes to clear lines and improve your spatial reasoning.',
        type: 'logic',
        image: 'images/games/Find-It.jpg',
        path: 'https://cloud.onlinegames.io/games/2025/unity/find-it/index-og.html'
    },
    {
        id: 'sweet-sugar-match',
        title: 'Sweet Sugar Match',
        description: 'The classic block-stacking puzzle game that offers a perfect brain refresh. Arrange falling tetrominoes to clear lines and improve your spatial reasoning.',
        type: 'logic',
        image: 'images/games/Sweet-Sugar-Match.jpg',
        path: 'https://www.onlinegames.io/games/2022/unity/sweet-sugar-match/index.html'
    },
     //0324增加
    {
        id: 'color-water-sort-3d',
        title: 'Color Sort Puzzle',
        description: 'A soothing color-matching puzzle that provides a perfect mental reset. Sort colored water into matching tubes while enjoying the calming visual effects and gentle gameplay.',
        type: 'calm',
        image: 'images/games/Color-Water-Sort-3D.jpg',
        path: 'https://html5.gamedistribution.com/rvvASMiM/26b3b48bea8e46f2b7123f0742a7164f/index.html'
    },
    {
        id: 'city-blocks',
        title: "City Blocks",
        description: 'A creative city-building puzzle that exercises spatial awareness. Design and arrange city blocks to create efficient layouts, offering a satisfying mental break that enhances planning skills.',
        type: 'creative',
        image: 'images/games/City-Blocks.jpg',
        path: 'https://html5.gamedistribution.com/rvvASMiM/1a6b5d0bd94f40129fd9e698e5b7c556/index.html'
    },
    //0325增加
    {
        id: 'organize-it',
        title: "Organize It",
        description: 'A satisfying organizational puzzle that offers instant mental refreshment with no login required. Sort and categorize items to create order from chaos, providing a perfect brain break that enhances focus and reduces cognitive fatigue.',
        type: 'logic',
        image: 'images/games/Organize-It.jpg',
        path: 'https://html5.gamedistribution.com/0df5240c55bb4e1f8571179ab56f1004/'
    }
    // ,
    // {
    //     id: 'Voxel-Bot',
    //     title: "Voxel Bot",
    //     description: 'An engaging robot-building game that delivers quick cognitive refreshment without any login barriers. Construct and program your robot to navigate challenges, offering a stimulating mental break that activates problem-solving skills and creative thinking.',
    //     type: 'creative',
    //     image: 'images/games/Voxel-Bot.jpg',
    //     path: 'https://games.crazygames.com/en_US/voxel-bot/index.html'
    // }
    // ,
    // {
    //     id: 'Voxel-Bot',
    //     title: "Voxel Bot",
    //     description: 'An engaging robot-building game that delivers quick cognitive refreshment without any login barriers. Construct and program your robot to navigate challenges, offering a stimulating mental break that activates problem-solving skills and creative thinking.',
    //     type: 'creative',
    //     image: 'images/games/Voxel-Bot.jpg',
    //     path: 'https://games.crazygames.com/en_US/cubes-2048-io/index.html'
    // }
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