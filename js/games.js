/**
 * Game list page JavaScript
 * Handles game card rendering and filtering functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu
    initMobileMenu();
    
    // Load game card component
    loadComponent('js/components/game-card.js', function() {
        // Render games after component is loaded
        renderGames(getAllGames());
        
        // Initialize filters
        initFilters();
    });
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
        // Create game card using the component
        const gameCard = new GameCard(game);
        gamesGrid.appendChild(gameCard.render());
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
            applyFilters(currentType);
        });
    });
}

/**
 * Apply filter criteria
 * @param {string} type - Game type
 */
function applyFilters(type) {
    // Get all games
    let filteredGames = getAllGames();
    
    // Filter by type
    if (type !== 'all') {
        filteredGames = filteredGames.filter(game => game.type === type);
    }
    
    // Render filtered games
    renderGames(filteredGames);
} 