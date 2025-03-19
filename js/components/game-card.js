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
            showDescription: true,
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
            description, 
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
                // Navigate to game-detail.html with game ID
                window.location.href = `game-detail.html?id=${id}`;
            });
        }
        
        // Use default image as fallback
        const imageSrc = image || 'images/games/default-game.jpg';
        
        // Build card HTML
        let cardHTML = `
            <img src="${imageSrc}" alt="${title}" class="game-image">
            <div class="game-content">
                <h3 class="game-title">${title}</h3>
        `;
        
        // Add description if enabled
        if (this.options.showDescription) {
            cardHTML += `<p class="game-description">${description}</p>`;
        }
        
        // Add game type if enabled
        if (this.options.showType) {
            cardHTML += `
                <div class="game-meta">
                    <span class="game-type ${type}">${getGameTypeName(type)}</span>
                </div>
            `;
        }
        
        // Add action button
        if (!this.game.comingSoon) {
            cardHTML += `
                <button class="btn-play">Play Now</button>
            `;
        } else {
            cardHTML += `
                <button class="btn-play coming-soon">Coming Soon</button>
            `;
        }
        
        // Close content div
        cardHTML += `</div>`;
        
        // Set inner HTML
        card.innerHTML = cardHTML;
        
        // Add event listener to Play Now button to prevent propagation
        const playButton = card.querySelector('.btn-play');
        if (playButton && !this.game.comingSoon) {
            playButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent the card click event
                window.location.href = `game-detail.html?id=${id}`;
            });
        }
        
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