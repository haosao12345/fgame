/**
 * Game Configuration Examples
 * This file demonstrates how to configure game cards and customize their appearance
 */

// Examples of different game card configurations
const gameCardConfigs = {
    // Default configuration (shows everything)
    default: {
        showType: true,
        showDescription: true,
        imageSize: 'medium',
        clickable: true,
        customClass: ''
    },
    
    // Compact configuration (smaller, less info)
    compact: {
        showType: true,
        showDescription: false,
        imageSize: 'small',
        clickable: true,
        customClass: 'compact-card'
    },
    
    // Featured configuration (larger, more prominent)
    featured: {
        showType: true,
        showDescription: true,
        imageSize: 'large',
        clickable: true,
        customClass: 'featured-card'
    },
    
    // Type-only configuration (for category pages)
    typeOnly: {
        showType: true,
        showDescription: false,
        imageSize: 'medium',
        clickable: true,
        customClass: 'type-only-card'
    },
    
    // Non-clickable display (for previews)
    preview: {
        showType: true,
        showDescription: true,
        imageSize: 'medium',
        clickable: false,
        customClass: 'preview-card'
    }
};

/**
 * Example of how to use the GameCard component with different configurations
 */
function createExampleGameCards() {
    // Get a sample game
    const sampleGame = getAllGames()[0];
    
    // Container for examples
    const container = document.createElement('div');
    container.className = 'game-card-examples';
    
    // Create examples for each configuration
    Object.entries(gameCardConfigs).forEach(([configName, options]) => {
        // Create a section for this example
        const section = document.createElement('div');
        section.className = 'example-section';
        
        // Add a heading
        const heading = document.createElement('h3');
        heading.textContent = `${configName.charAt(0).toUpperCase() + configName.slice(1)} Configuration`;
        section.appendChild(heading);
        
        // Create the game card with this configuration
        const gameCard = new GameCard(sampleGame, options);
        section.appendChild(gameCard.render());
        
        // Add the section to the container
        container.appendChild(section);
    });
    
    return container;
}

/**
 * Example of how to use custom click handlers
 */
function customClickExample() {
    const game = getAllGames()[1];
    
    // Custom configuration with a custom click handler
    const options = {
        showType: true,
        showDescription: true,
        imageSize: 'medium',
        clickable: true,
        customClass: 'custom-click-card',
        onClickCallback: (gameData, event) => {
            // Example of a custom action instead of navigation
            alert(`You clicked on ${gameData.title}! This is a custom action.`);
            console.log('Game data:', gameData);
            console.log('Event:', event);
        }
    };
    
    // Create the game card with custom click handler
    const gameCard = new GameCard(game, options);
    return gameCard.render();
}

/**
 * Example of dynamically updating a game card
 */
function updateGameCardExample() {
    // Create a container
    const container = document.createElement('div');
    container.className = 'update-example';
    
    // Get two sample games
    const game1 = getAllGames()[2];
    const game2 = getAllGames()[3];
    
    // Create a game card with the first game
    const gameCard = new GameCard(game1);
    container.appendChild(gameCard.render());
    
    // Add a button to toggle between games
    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Switch Game';
    toggleButton.className = 'toggle-button';
    toggleButton.addEventListener('click', () => {
        // Update the game card with the other game
        const currentGame = gameCard.game.id === game1.id ? game2 : game1;
        gameCard.update(currentGame);
    });
    
    container.appendChild(toggleButton);
    
    return container;
} 