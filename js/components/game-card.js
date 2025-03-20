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
        
        // Build card HTML with image container and type badge
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
        
        // Close image container
        cardHTML += `</div>`;
        
        // Add content section with title
        cardHTML += `
            <div class="game-content">
                <h3 class="game-title">${title}</h3>
            </div>
        `;
        
        // Set inner HTML
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
        /* Additional game card styles */
        .game-card.image-small .game-image-container {
            height: 120px;
        }
        
        .game-card.image-medium .game-image-container {
            height: 160px;
        }
        
        .game-card.image-large .game-image-container {
            height: 200px;
        }
    `;
    
    // Add styles to document head
    document.head.appendChild(style);
})(); 