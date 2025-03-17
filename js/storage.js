/**
 * 本地存储工具
 * 用于保存和获取用户游戏数据和统计信息
 */

const STORAGE_KEYS = {
    GAME_STATS: 'aonerest_game_stats',
    USER_PREFERENCES: 'aonerest_user_preferences',
    GAME_HISTORY: 'aonerest_game_history'
};

/**
 * 保存游戏统计数据
 * @param {string} gameId 游戏ID
 * @param {Object} stats 统计数据对象
 */
function saveGameStats(gameId, stats) {
    const allStats = getGameStats();
    
    // 更新或添加游戏统计
    allStats[gameId] = {
        ...allStats[gameId],
        ...stats,
        lastPlayed: new Date().toISOString()
    };
    
    // 保存到本地存储
    localStorage.setItem(STORAGE_KEYS.GAME_STATS, JSON.stringify(allStats));
}

/**
 * 获取所有游戏统计数据
 * @returns {Object} 所有游戏的统计数据
 */
function getGameStats() {
    const stats = localStorage.getItem(STORAGE_KEYS.GAME_STATS);
    return stats ? JSON.parse(stats) : {};
}

/**
 * 获取特定游戏的统计数据
 * @param {string} gameId 游戏ID
 * @returns {Object} 游戏统计数据
 */
function getGameStatById(gameId) {
    const allStats = getGameStats();
    return allStats[gameId] || {};
}

/**
 * 记录游戏历史
 * @param {string} gameId 游戏ID
 * @param {Object} result 游戏结果
 */
function recordGameHistory(gameId, result) {
    const history = getGameHistory();
    
    // 添加新的历史记录
    history.unshift({
        gameId,
        result,
        timestamp: new Date().toISOString()
    });
    
    // 限制历史记录数量（保留最近100条）
    const limitedHistory = history.slice(0, 100);
    
    // 保存到本地存储
    localStorage.setItem(STORAGE_KEYS.GAME_HISTORY, JSON.stringify(limitedHistory));
}

/**
 * 获取游戏历史记录
 * @param {number} limit 限制返回的记录数量
 * @returns {Array} 游戏历史记录数组
 */
function getGameHistory(limit = 100) {
    const history = localStorage.getItem(STORAGE_KEYS.GAME_HISTORY);
    const parsedHistory = history ? JSON.parse(history) : [];
    return limit ? parsedHistory.slice(0, limit) : parsedHistory;
}

/**
 * 保存用户偏好设置
 * @param {Object} preferences 偏好设置对象
 */
function saveUserPreferences(preferences) {
    const currentPrefs = getUserPreferences();
    
    // 合并新旧偏好设置
    const updatedPrefs = {
        ...currentPrefs,
        ...preferences
    };
    
    // 保存到本地存储
    localStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(updatedPrefs));
}

/**
 * 获取用户偏好设置
 * @returns {Object} 用户偏好设置
 */
function getUserPreferences() {
    const prefs = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
    return prefs ? JSON.parse(prefs) : {
        // 默认偏好设置
        theme: 'light',
        soundEnabled: true,
        notificationsEnabled: true
    };
}

/**
 * 清除所有存储的数据
 */
function clearAllData() {
    localStorage.removeItem(STORAGE_KEYS.GAME_STATS);
    localStorage.removeItem(STORAGE_KEYS.USER_PREFERENCES);
    localStorage.removeItem(STORAGE_KEYS.GAME_HISTORY);
}

/**
 * 获取用户总游戏时间（分钟）
 * @returns {number} 总游戏时间
 */
function getTotalPlayTime() {
    const stats = getGameStats();
    let totalMinutes = 0;
    
    // 计算所有游戏的总时间
    Object.values(stats).forEach(gameStat => {
        if (gameStat.playTime) {
            totalMinutes += gameStat.playTime;
        }
    });
    
    return totalMinutes;
}

/**
 * 获取用户最常玩的游戏类型
 * @returns {string|null} 最常玩的游戏类型
 */
function getMostPlayedGameType() {
    const stats = getGameStats();
    const typeCount = {};
    
    // 统计每种类型的游戏次数
    Object.keys(stats).forEach(gameId => {
        const game = getGameById(gameId);
        if (game && game.type) {
            typeCount[game.type] = (typeCount[game.type] || 0) + (stats[gameId].playCount || 0);
        }
    });
    
    // 找出次数最多的类型
    let maxCount = 0;
    let mostPlayedType = null;
    
    Object.entries(typeCount).forEach(([type, count]) => {
        if (count > maxCount) {
            maxCount = count;
            mostPlayedType = type;
        }
    });
    
    return mostPlayedType;
} 