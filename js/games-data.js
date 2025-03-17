/**
 * 游戏数据
 * 包含所有游戏的信息，用于在游戏列表页面和首页显示
 */
const gamesData = [
    {
        id: 'color-match',
        title: '颜色匹配',
        description: '测试你的注意力和反应速度，判断单词的颜色是否与其含义匹配。',
        type: 'focus',
        duration: 5,
        image: 'images/games/color-match.jpg',
        path: 'games/color-match.html'
    },
    {
        id: 'memory-cards',
        title: '记忆卡片',
        description: '翻转卡片并找到匹配对，锻炼你的短期记忆和专注力。',
        type: 'focus',
        duration: 10,
        image: 'images/games/memory-cards.jpg',
        path: 'games/memory-cards.html'
    },
    {
        id: 'word-scramble',
        title: '单词重组',
        description: '重新排列字母，找出隐藏的单词，提升你的词汇量和创造性思维。',
        type: 'creative',
        duration: 8,
        image: 'images/games/word-scramble.jpg',
        path: 'games/word-scramble.html'
    },
    {
        id: 'pattern-tap',
        title: '图案点击',
        description: '按照指定顺序点击图案，测试你的记忆力和注意力。',
        type: 'focus',
        duration: 7,
        image: 'images/games/pattern-tap.jpg',
        path: 'games/pattern-tap.html'
    },
    {
        id: 'math-challenge',
        title: '数学挑战',
        description: '解决简单的数学问题，在时间限制内提高你的计算速度。',
        type: 'logic',
        duration: 5,
        image: 'images/games/math-challenge.jpg',
        path: 'games/math-challenge.html'
    },
    {
        id: 'breathing-exercise',
        title: '呼吸练习',
        description: '跟随动画进行深呼吸，减轻压力，提高专注力。',
        type: 'calm',
        duration: 5,
        image: 'images/games/breathing-exercise.jpg',
        path: 'games/breathing-exercise.html'
    },
    {
        id: 'puzzle-slide',
        title: '拼图滑块',
        description: '移动方块重组图片，锻炼你的空间思维能力。',
        type: 'logic',
        duration: 12,
        image: 'images/games/puzzle-slide.jpg',
        path: 'games/puzzle-slide.html'
    },
    {
        id: 'word-association',
        title: '词语联想',
        description: '找出与给定词语相关的单词，激发你的创造力和联想能力。',
        type: 'creative',
        duration: 8,
        image: 'images/games/word-association.jpg',
        path: 'games/word-association.html'
    },
    {
        id: 'sound-meditation',
        title: '声音冥想',
        description: '聆听舒缓的声音，放松心情，恢复精力。',
        type: 'calm',
        duration: 10,
        image: 'images/games/sound-meditation.jpg',
        path: 'games/sound-meditation.html'
    },
    {
        id: 'reaction-test',
        title: '反应测试',
        description: '测试你的反应速度，提高注意力和手眼协调能力。',
        type: 'focus',
        duration: 3,
        image: 'images/games/reaction-test.jpg',
        path: 'games/reaction-test.html'
    },
    {
        id: 'visual-illusion',
        title: '视觉错觉',
        description: '体验各种视觉错觉，了解大脑如何处理视觉信息。',
        type: 'creative',
        duration: 6,
        image: 'images/games/visual-illusion.jpg',
        path: 'games/visual-illusion.html'
    },
    {
        id: 'logic-puzzle',
        title: '逻辑谜题',
        description: '解决逻辑谜题，锻炼你的推理能力和批判性思维。',
        type: 'logic',
        duration: 15,
        image: 'images/games/logic-puzzle.jpg',
        path: 'games/logic-puzzle.html'
    }
];

/**
 * 获取所有游戏数据
 * @returns {Array} 游戏数据数组
 */
function getAllGames() {
    return gamesData;
}

/**
 * 根据ID获取游戏数据
 * @param {string} id 游戏ID
 * @returns {Object|null} 游戏数据对象或null
 */
function getGameById(id) {
    return gamesData.find(game => game.id === id) || null;
}

/**
 * 根据类型筛选游戏
 * @param {string} type 游戏类型
 * @returns {Array} 筛选后的游戏数组
 */
function getGamesByType(type) {
    if (type === 'all') {
        return gamesData;
    }
    return gamesData.filter(game => game.type === type);
}

/**
 * 根据时长筛选游戏
 * @param {number} maxDuration 最大时长（分钟）
 * @returns {Array} 筛选后的游戏数组
 */
function getGamesByDuration(maxDuration) {
    if (maxDuration === 'all') {
        return gamesData;
    }
    return gamesData.filter(game => game.duration <= maxDuration);
}

/**
 * 获取推荐游戏（首页展示）
 * @param {number} count 获取数量
 * @returns {Array} 推荐游戏数组
 */
function getFeaturedGames(count = 6) {
    // 这里可以根据需要实现不同的推荐逻辑
    // 简单示例：随机选择指定数量的游戏
    const shuffled = [...gamesData].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

/**
 * 获取游戏类型的中文名称
 * @param {string} type 游戏类型
 * @returns {string} 类型的中文名称
 */
function getGameTypeName(type) {
    const typeNames = {
        'focus': '专注力',
        'creative': '创造力',
        'logic': '逻辑思维',
        'calm': '放松'
    };
    return typeNames[type] || '未知';
}

/**
 * 格式化游戏时长
 * @param {number} duration 游戏时长（分钟）
 * @returns {string} 格式化后的时长
 */
function formatGameDuration(duration) {
    return `${duration} 分钟`;
} 