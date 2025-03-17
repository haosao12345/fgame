/**
 * 游戏列表页面的JavaScript
 * 处理游戏卡片的渲染和筛选功能
 */

document.addEventListener('DOMContentLoaded', function() {
    // 初始化移动端菜单
    initMobileMenu();
    
    // 渲染游戏卡片
    renderGames(getAllGames());
    
    // 初始化筛选功能
    initFilters();
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
 * 渲染游戏卡片
 * @param {Array} games 游戏数据数组
 */
function renderGames(games) {
    const gamesGrid = document.getElementById('gamesGrid');
    const noResults = document.getElementById('noResults');
    
    if (!gamesGrid) return;
    
    // 清空现有内容
    gamesGrid.innerHTML = '';
    
    // 检查是否有游戏
    if (games.length === 0) {
        gamesGrid.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }
    
    // 显示游戏网格，隐藏无结果提示
    gamesGrid.style.display = 'grid';
    noResults.style.display = 'none';
    
    // 渲染每个游戏卡片
    games.forEach(game => {
        const gameCard = createGameCard(game);
        gamesGrid.appendChild(gameCard);
    });
}

/**
 * 创建游戏卡片元素
 * @param {Object} game 游戏数据
 * @returns {HTMLElement} 游戏卡片DOM元素
 */
function createGameCard(game) {
    const card = document.createElement('div');
    card.className = 'game-card';
    
    // 使用默认图片作为备用
    const imageSrc = game.image || 'images/games/default-game.jpg';
    
    card.innerHTML = `
        <img src="${imageSrc}" alt="${game.title}" class="game-image">
        <div class="game-content">
            <h3 class="game-title">${game.title}</h3>
            <p class="game-description">${game.description}</p>
            <div class="game-meta">
                <span class="game-type ${game.type}">${getGameTypeName(game.type)}</span>
                <span class="game-duration">${formatGameDuration(game.duration)}</span>
            </div>
        </div>
    `;
    
    // 添加点击事件
    card.addEventListener('click', function() {
        window.location.href = game.path;
    });
    
    return card;
}

/**
 * 初始化筛选功能
 */
function initFilters() {
    // 获取所有筛选按钮
    const typeButtons = document.querySelectorAll('.filter-btn[data-type]');
    const durationButtons = document.querySelectorAll('.filter-btn[data-duration]');
    
    // 当前筛选条件
    let currentType = 'all';
    let currentDuration = 'all';
    
    // 为类型筛选按钮添加事件监听
    typeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 更新按钮状态
            typeButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // 更新当前类型
            currentType = this.getAttribute('data-type');
            
            // 应用筛选
            applyFilters(currentType, currentDuration);
        });
    });
    
    // 为时长筛选按钮添加事件监听
    durationButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 更新按钮状态
            durationButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // 更新当前时长
            currentDuration = this.getAttribute('data-duration');
            
            // 应用筛选
            applyFilters(currentType, currentDuration);
        });
    });
}

/**
 * 应用筛选条件
 * @param {string} type 游戏类型
 * @param {string|number} duration 游戏最大时长
 */
function applyFilters(type, duration) {
    // 获取所有游戏
    let filteredGames = getAllGames();
    
    // 按类型筛选
    if (type !== 'all') {
        filteredGames = filteredGames.filter(game => game.type === type);
    }
    
    // 按时长筛选
    if (duration !== 'all') {
        filteredGames = filteredGames.filter(game => game.duration <= parseInt(duration));
    }
    
    // 渲染筛选后的游戏
    renderGames(filteredGames);
} 