/**
 * 颜色匹配游戏的JavaScript
 * 处理游戏逻辑和用户交互
 */

// 游戏配置
const GAME_CONFIG = {
    gameDuration: 60, // 游戏时长（秒）
    gameId: 'color-match' // 游戏ID，用于存储统计数据
};

// 颜色数据
const COLORS = [
    { name: '红色', class: 'red' },
    { name: '蓝色', class: 'blue' },
    { name: '绿色', class: 'green' },
    { name: '黄色', class: 'yellow' },
    { name: '紫色', class: 'purple' },
    { name: '橙色', class: 'orange' }
];

// 游戏状态
let gameState = {
    score: 0,
    timeLeft: GAME_CONFIG.gameDuration,
    isPlaying: false,
    timer: null,
    currentWord: null,
    currentColor: null,
    isMatching: false
};

// DOM元素
let elements = {};

// 初始化游戏
document.addEventListener('DOMContentLoaded', function() {
    // 初始化移动端菜单
    initMobileMenu();
    
    // 获取DOM元素
    elements = {
        gameWelcome: document.getElementById('gameWelcome'),
        gamePlay: document.getElementById('gamePlay'),
        gameOver: document.getElementById('gameOver'),
        colorWord: document.getElementById('colorWord'),
        timeLeft: document.getElementById('timeLeft'),
        score: document.getElementById('score'),
        finalScore: document.getElementById('finalScore'),
        gameOverMessage: document.getElementById('gameOverMessage'),
        startButton: document.getElementById('startButton'),
        startGameBtn: document.getElementById('startGameBtn'),
        matchBtn: document.getElementById('matchBtn'),
        noMatchBtn: document.getElementById('noMatchBtn'),
        playAgainBtn: document.getElementById('playAgainBtn'),
        shareBtn: document.getElementById('shareBtn')
    };
    
    // 添加事件监听
    elements.startButton.addEventListener('click', startGame);
    elements.startGameBtn.addEventListener('click', startGame);
    elements.matchBtn.addEventListener('click', () => handleAnswer(true));
    elements.noMatchBtn.addEventListener('click', () => handleAnswer(false));
    elements.playAgainBtn.addEventListener('click', resetGame);
    elements.shareBtn.addEventListener('click', shareScore);
    
    // 添加键盘事件监听
    document.addEventListener('keydown', handleKeyPress);
});

/**
 * 初始化移动端菜单
 */
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }
}

/**
 * 开始游戏
 */
function startGame() {
    // 重置游戏状态
    resetGameState();
    
    // 显示游戏界面
    elements.gameWelcome.style.display = 'none';
    elements.gamePlay.style.display = 'flex';
    elements.gameOver.style.display = 'none';
    
    // 生成第一个单词
    generateNewRound();
    
    // 开始计时器
    gameState.timer = setInterval(updateTimer, 1000);
    gameState.isPlaying = true;
    
    // 记录游戏开始
    recordGameStart();
}

/**
 * 重置游戏状态
 */
function resetGameState() {
    gameState.score = 0;
    gameState.timeLeft = GAME_CONFIG.gameDuration;
    gameState.isPlaying = false;
    
    if (gameState.timer) {
        clearInterval(gameState.timer);
        gameState.timer = null;
    }
    
    // 更新UI
    elements.score.textContent = gameState.score;
    elements.timeLeft.textContent = gameState.timeLeft;
}

/**
 * 生成新一轮游戏
 */
function generateNewRound() {
    // 随机选择一个单词（颜色名称）
    const wordIndex = Math.floor(Math.random() * COLORS.length);
    gameState.currentWord = COLORS[wordIndex];
    
    // 决定是否匹配（50%的概率）
    gameState.isMatching = Math.random() < 0.5;
    
    // 如果匹配，颜色与单词相同；如果不匹配，选择不同的颜色
    if (gameState.isMatching) {
        gameState.currentColor = gameState.currentWord;
    } else {
        let colorIndex;
        do {
            colorIndex = Math.floor(Math.random() * COLORS.length);
        } while (colorIndex === wordIndex);
        gameState.currentColor = COLORS[colorIndex];
    }
    
    // 更新UI
    elements.colorWord.textContent = gameState.currentWord.name;
    
    // 移除所有颜色类
    COLORS.forEach(color => {
        elements.colorWord.classList.remove(color.class);
    });
    
    // 添加当前颜色类
    elements.colorWord.classList.add(gameState.currentColor.class);
}

/**
 * 处理用户回答
 * @param {boolean} userSaysMatch 用户是否选择"匹配"
 */
function handleAnswer(userSaysMatch) {
    if (!gameState.isPlaying) return;
    
    // 检查答案是否正确
    const isCorrect = (userSaysMatch === gameState.isMatching);
    
    // 如果正确，增加分数
    if (isCorrect) {
        gameState.score++;
        elements.score.textContent = gameState.score;
    }
    
    // 生成新一轮
    generateNewRound();
}

/**
 * 更新计时器
 */
function updateTimer() {
    gameState.timeLeft--;
    elements.timeLeft.textContent = gameState.timeLeft;
    
    // 如果时间到，结束游戏
    if (gameState.timeLeft <= 0) {
        endGame();
    }
}

/**
 * 结束游戏
 */
function endGame() {
    // 停止计时器
    clearInterval(gameState.timer);
    gameState.timer = null;
    gameState.isPlaying = false;
    
    // 显示游戏结束界面
    elements.gamePlay.style.display = 'none';
    elements.gameOver.style.display = 'block';
    
    // 更新最终得分
    elements.finalScore.textContent = gameState.score;
    
    // 根据得分显示不同的消息
    if (gameState.score >= 30) {
        elements.gameOverMessage.textContent = '太棒了！你的反应速度和专注力非常出色！';
    } else if (gameState.score >= 20) {
        elements.gameOverMessage.textContent = '做得好！你的表现超过了大多数人！';
    } else if (gameState.score >= 10) {
        elements.gameOverMessage.textContent = '不错的尝试！再来一次，你可以做得更好！';
    } else {
        elements.gameOverMessage.textContent = '继续练习，你的反应速度会提高的！';
    }
    
    // 保存游戏统计数据
    saveGameResult();
}

/**
 * 重置游戏（再玩一次）
 */
function resetGame() {
    elements.gameOver.style.display = 'none';
    startGame();
}

/**
 * 分享得分
 */
function shareScore() {
    // 创建分享文本
    const shareText = `我在AOneRest的颜色匹配游戏中获得了${gameState.score}分！来挑战我吧！`;
    
    // 如果支持Web Share API
    if (navigator.share) {
        navigator.share({
            title: 'AOneRest颜色匹配游戏',
            text: shareText,
            url: window.location.href
        }).catch(error => {
            console.log('分享失败:', error);
            // 回退到复制到剪贴板
            copyToClipboard(shareText);
        });
    } else {
        // 不支持Web Share API，复制到剪贴板
        copyToClipboard(shareText);
    }
}

/**
 * 复制文本到剪贴板
 * @param {string} text 要复制的文本
 */
function copyToClipboard(text) {
    // 创建临时元素
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    
    // 选择并复制
    tempInput.select();
    document.execCommand('copy');
    
    // 移除临时元素
    document.body.removeChild(tempInput);
    
    // 提示用户
    alert('成绩已复制到剪贴板！');
}

/**
 * 处理键盘按键
 * @param {KeyboardEvent} event 键盘事件
 */
function handleKeyPress(event) {
    if (!gameState.isPlaying) return;
    
    // 左箭头或A键 - 匹配
    if (event.key === 'ArrowLeft' || event.key.toLowerCase() === 'a') {
        handleAnswer(true);
    }
    // 右箭头或D键 - 不匹配
    else if (event.key === 'ArrowRight' || event.key.toLowerCase() === 'd') {
        handleAnswer(false);
    }
}

/**
 * 记录游戏开始
 */
function recordGameStart() {
    // 获取游戏数据
    const gameData = getGameById(GAME_CONFIG.gameId);
    
    if (gameData) {
        // 获取当前游戏统计
        const stats = getGameStatById(GAME_CONFIG.gameId) || {};
        
        // 更新游戏次数
        const playCount = (stats.playCount || 0) + 1;
        
        // 保存更新的统计
        saveGameStats(GAME_CONFIG.gameId, {
            playCount: playCount,
            startTime: new Date().toISOString()
        });
    }
}

/**
 * 保存游戏结果
 */
function saveGameResult() {
    // 获取游戏数据
    const gameData = getGameById(GAME_CONFIG.gameId);
    
    if (gameData) {
        // 获取当前游戏统计
        const stats = getGameStatById(GAME_CONFIG.gameId) || {};
        
        // 计算游戏时间（分钟）
        const playTime = GAME_CONFIG.gameDuration / 60;
        
        // 更新最高分
        const highScore = Math.max(stats.highScore || 0, gameState.score);
        
        // 更新总游戏时间
        const totalPlayTime = (stats.totalPlayTime || 0) + playTime;
        
        // 保存更新的统计
        saveGameStats(GAME_CONFIG.gameId, {
            highScore: highScore,
            lastScore: gameState.score,
            totalPlayTime: totalPlayTime,
            playTime: playTime
        });
        
        // 记录游戏历史
        recordGameHistory(GAME_CONFIG.gameId, {
            score: gameState.score,
            duration: playTime
        });
    }
} 