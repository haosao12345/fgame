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
        this.options = Object.assign({
            // Default options
            showType: true,              // Whether to show the game type
            showDescription: true,       // Whether to show the game description
            imageSize: 'medium',         // Image size (small, medium, large)
            clickable: true,             // Whether the card is clickable
            customClass: '',             // Additional CSS classes
            onClickCallback: null        // Custom click callback
        }, options);
        
        this.element = null;
    }
    
    /**
     * Render the game card
     * @returns {HTMLElement} The rendered game card element
     */
    render() {
        // Create card element
        const card = document.createElement('div');
        card.className = `game-card ${this.options.customClass}`;
        
        // Add image size class
        card.classList.add(`image-${this.options.imageSize}`);
        
        // Use default image as fallback
        const imageSrc = this.game.image || 'images/games/default-game.jpg';
        
        // Build card HTML
        let cardHTML = `
            <img src="${imageSrc}" alt="${this.game.title}" class="game-image">
            <div class="game-content">
                <h3 class="game-title">${this.game.title}</h3>
        `;
        
        // Add description if enabled
        if (this.options.showDescription) {
            cardHTML += `<p class="game-description">${this.game.description}</p>`;
        }
        
        // Add game type if enabled
        if (this.options.showType) {
            cardHTML += `
                <div class="game-meta">
                    <span class="game-type ${this.game.type}">${getGameTypeName(this.game.type)}</span>
                </div>
            `;
        }
        
        // Close content div
        cardHTML += `</div>`;
        
        // Set inner HTML
        card.innerHTML = cardHTML;
        
        // Add click event if card is clickable
        if (this.options.clickable) {
            card.classList.add('clickable');
            
            card.addEventListener('click', (event) => {
                if (this.options.onClickCallback) {
                    // Use custom callback if provided
                    this.options.onClickCallback(this.game, event);
                } else {
                    // Default behavior: navigate to game page
                    window.location.href = this.game.path;
                }
            });
        }
        
        // Store element reference
        this.element = card;
        
        return card;
    }
    
    /**
     * Update the game card data and re-render
     * @param {Object} newGameData - New game data
     * @returns {HTMLElement} The updated game card element
     */
    update(newGameData) {
        this.game = newGameData;
        
        // If element already exists, replace it
        if (this.element && this.element.parentNode) {
            const newElement = this.render();
            this.element.parentNode.replaceChild(newElement, this.element);
            return newElement;
        }
        
        // Otherwise just render
        return this.render();
    }
}

// Add CSS styles for the component if needed
(function() {
    const style = document.createElement('style');
    style.textContent = `
        /* Game card component styles */
        .game-card {
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .game-card.clickable {
            cursor: pointer;
        }
        
        .game-card.clickable:hover {
            transform: translateY(-5px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
        }
        
        .game-card .game-image {
            width: 100%;
            height: auto;
            object-fit: cover;
        }
        
        /* Image sizes */
        .game-card.image-small .game-image {
            height: 120px;
        }
        
        .game-card.image-medium .game-image {
            height: 160px;
        }
        
        .game-card.image-large .game-image {
            height: 200px;
        }
        
        .game-card .game-content {
            padding: 15px;
        }
        
        .game-card .game-title {
            margin: 0 0 10px;
            font-size: 1.2rem;
            font-weight: 600;
            color: #333;
        }
        
        .game-card .game-description {
            margin: 0 0 15px;
            font-size: 0.9rem;
            color: #666;
            line-height: 1.4;
        }
        
        .game-card .game-meta {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .game-card .game-type {
            display: inline-block;
            padding: 3px 8px;
            border-radius: 4px;
            font-size: 0.8rem;
            font-weight: 500;
        }
        
        /* Type colors */
        .game-card .game-type.focus {
            background-color: #e6f7ff;
            color: #0077cc;
        }
        
        .game-card .game-type.creative {
            background-color: #f9f0ff;
            color: #9c27b0;
        }
        
        .game-card .game-type.logic {
            background-color: #e6fffa;
            color: #00a3a3;
        }
        
        .game-card .game-type.calm {
            background-color: #f0f9ff;
            color: #4caf50;
        }
    `;
    
    // Add styles to document head
    document.head.appendChild(style);
})(); 