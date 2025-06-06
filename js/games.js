/**
 * Game list page JavaScript
 * Handles game card rendering and filtering functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu
    initMobileMenu();
    
    // 直接渲染游戏，不等待组件加载
    renderGames(getAllGames());
    
    // Initialize filters
    initFilters();

    // Initialize search functionality
    initSearch();
});

/**
 * Initialize mobile menu
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
 * Dynamically load a JavaScript component
 * @param {string} src - Path to the component file
 * @param {Function} callback - Function to call after component is loaded
 */
function loadComponent(src, callback) {
    const script = document.createElement('script');
    script.src = src;
    script.onload = callback;
    script.onerror = function() {
        console.error('Failed to load component:', src);
    };
    document.head.appendChild(script);
}

/**
 * Render game cards
 * @param {Array} games - Array of game data
 */
function renderGames(games) {
    const gamesGrid = document.getElementById('gamesGrid');
    const noResults = document.getElementById('noResults');
    
    if (!gamesGrid) return;
    
    // Clear existing content
    gamesGrid.innerHTML = '';
    
    // Check if there are games
    if (games.length === 0) {
        gamesGrid.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }
    
    // Show games grid, hide no results message
    gamesGrid.style.display = 'grid';
    noResults.style.display = 'none';
    
    // Render each game card
    games.forEach(game => {
        // 创建游戏卡片元素
        const card = document.createElement('div');
        card.className = 'game-card';
        card.dataset.id = game.id;
        
        // 使用默认图片作为备用
        const imageSrc = game.image || 'images/games/default-game.jpg';
        
        // 添加图片加载错误处理
        const handleImageError = `onerror="this.onerror=null; this.src='images/games/default-game.jpg';"`;
        
        // 设置卡片HTML
        card.innerHTML = `
            <div class="game-image-container">
                <img 
                    src="${imageSrc}" 
                    alt="Play ${game.title} - ${getGameTypeName(game.type)} mental refresher game" 
                    class="game-image" 
                    ${handleImageError}
                    loading="lazy"
                    title="${game.title} - Free Online ${getGameTypeName(game.type)} Game"
                >
                <div class="game-type ${game.type}">${getGameTypeName(game.type)}</div>
                <div class="game-title-overlay">
                    <h3 class="game-title">${game.title}</h3>
                </div>
            </div>
        `;
        
        // 添加点击事件
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            window.location.href = `games/${game.id}.html`;
        });
        
        gamesGrid.appendChild(card);
    });
}

/**
 * Initialize filters
 */
function initFilters() {
    // Get all filter buttons
    const typeButtons = document.querySelectorAll('.filter-btn[data-type]');
    
    // Current filter criteria
    let currentType = 'all';
    
    // Add event listeners to type filter buttons
    typeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update button state
            typeButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update current type
            currentType = this.getAttribute('data-type');
            
            // Apply filters
            applyFilters();
        });
    });
}

/**
 * Initialize search functionality
 */
function initSearch() {
    const searchInput = document.getElementById('gameSearch');
    const clearButton = document.getElementById('clearSearch');
    const searchWrapper = document.querySelector('.search-input-wrapper');
    
    if (!searchInput || !clearButton) return;
    
    // Add input event listener
    searchInput.addEventListener('input', function() {
        const searchText = this.value.trim();
        
        // Toggle clear button visibility
        clearButton.style.display = searchText.length > 0 ? 'flex' : 'none';
        
        // Apply filters with search
        applyFilters();
    });
    
    // Add clear button event listener
    clearButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        searchInput.value = '';
        this.style.display = 'none';
        
        // Apply filters without search
        applyFilters();
        searchInput.focus();
    });
    
    // Add focus/blur events for mobile
    searchInput.addEventListener('focus', function() {
        if (window.innerWidth <= 480) {
            document.body.classList.add('search-focused');
        }
    });
    
    searchInput.addEventListener('blur', function() {
        setTimeout(() => {
            document.body.classList.remove('search-focused');
        }, 100);
    });
    
    // Add click event to icon for mobile
    searchWrapper.addEventListener('click', function(e) {
        if (window.innerWidth <= 480) {
            searchInput.focus();
        }
    });
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Focus search on Ctrl+F or Command+F
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
            e.preventDefault();
            searchInput.focus();
        }
        
        // Clear search on Escape when search is focused
        if (e.key === 'Escape' && document.activeElement === searchInput) {
            searchInput.value = '';
            clearButton.style.display = 'none';
            applyFilters();
            searchInput.blur();
        }
    });
}

/**
 * Apply filter criteria
 */
function applyFilters() {
    // Get current type filter
    const activeTypeButton = document.querySelector('.filter-btn.active[data-type]');
    const currentType = activeTypeButton ? activeTypeButton.getAttribute('data-type') : 'all';
    
    // Get search query
    const searchInput = document.getElementById('gameSearch');
    const searchQuery = searchInput ? searchInput.value.trim().toLowerCase() : '';
    
    // Get all games
    let filteredGames = getAllGames();
    
    // Filter by type
    if (currentType !== 'all') {
        filteredGames = filteredGames.filter(game => game.type === currentType);
    }
    
    // Filter by search query
    if (searchQuery) {
        filteredGames = filteredGames.filter(game => {
            return (
                game.title.toLowerCase().includes(searchQuery) || 
                game.description.toLowerCase().includes(searchQuery)
            );
        });
    }
    
    // Render filtered games
    renderGames(filteredGames);
} 