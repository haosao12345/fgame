/**
 * Game Card Component
 * A reusable component for displaying game cards
 */
class GameCard {
    /**
     * Create a new game card instance
     * @param {Object} gameData - The game data
     * @param {Object} options - Optional configuration options
     */
    constructor(gameData, options = {}) {
        this.game = gameData;
        this.options = {
            showType: true,
            imageSize: 'medium',
            clickable: true,
            customClass: '',
            ...options
        };
        
        // Create and render the card
        this.element = this.render();
    }
    
    /**
     * Render the game card
     * @returns {HTMLElement} The rendered game card element
     */
    render() {
        const { 
            id,
            title, 
            type,
            image
        } = this.game;

        // Create card element
        const card = document.createElement('div');
        card.className = `game-card ${this.options.customClass}`;
        card.dataset.id = id;
        
        // Add image size class
        card.classList.add(`image-${this.options.imageSize}`);
        
        // Make card clickable if enabled
        if (this.options.clickable) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => {
                // 修改为导航到每个游戏的独立详情页
                window.location.href = `games/${id}-detail.html`;
            });
        }
        
        // Use default image as fallback
        const imageSrc = image || 'images/games/default-game.jpg';
        
        // 添加图片加载错误处理
        const handleImageError = `onerror="this.onerror=null; this.src='images/games/default-game.jpg';"`;
        
        // 修改卡片HTML，将游戏名称覆盖在图片上
        let cardHTML = `
            <div class="game-image-container">
                <img src="${imageSrc}" alt="${title}" class="game-image" ${handleImageError}>
        `;
        
        // Add game type if enabled - inside image container
        if (this.options.showType) {
            cardHTML += `
                <div class="game-type ${type}">${getGameTypeName(type)}</div>
            `;
        }
        
        // 添加覆盖在图片上的游戏名称
        cardHTML += `
                <div class="game-title-overlay">
                    <h3 class="game-title">${title}</h3>
                </div>
            </div>
        `;
        
        // 设置内部HTML
        card.innerHTML = cardHTML;
        
        return card;
    }
    
    /**
     * Update the game card data and re-render
     * @param {Object} newGameData - New game data
     * @returns {HTMLElement} The updated game card element
     */
    update(newGameData) {
        this.game = { ...this.game, ...newGameData };
        const newElement = this.render();
        this.element.replaceWith(newElement);
        this.element = newElement;
        
        return newElement;
    }
}

// Note: Most styles are now defined in the main CSS file (style.css)
// This only adds minimal necessary styles not already defined
(function() {
    const style = document.createElement('style');
    style.textContent = `
        /* Game card styles for overlay layout */
        .game-card {
            overflow: hidden;
            border-radius: 12px;
            height: auto;
            position: relative;
        }
        
        .game-image-container {
            position: relative;
            width: 100%;
            height: 100%;
            border-radius: 12px;
            overflow: hidden;
        }
        
        .game-card.image-small .game-image-container {
            height: 190px;
        }
        
        .game-card.image-medium .game-image-container {
            height: 230px;
        }
        
        .game-card.image-large .game-image-container {
            height: 270px;
        }
        
        .game-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease;
        }
        
        .game-title-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 30%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0) 100%);
            padding: 25px 16px 12px;
            transition: padding 0.3s ease;
        }
        
        .game-card:hover .game-title-overlay {
            padding-bottom: 16px;
        }
        
        .game-title {
            color: white;
            margin: 0;
            font-size: 1.1rem;
            font-weight: 600;
            line-height: 1.3;
            text-shadow: 0 1px 2px rgba(0,0,0,0.8);
        }
    `;
    
    // Add styles to document head
    document.head.appendChild(style);
})(); 