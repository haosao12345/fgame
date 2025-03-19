# Game Pages Update Guide

This guide explains how to maintain consistent branding and styling across all game pages for the onerestgame website.

## Overview

We've created a system to ensure all game pages have a consistent look and feel, with proper branding as "onerestgame". The system includes:

1. A game card component (`js/components/game-card.js`) for displaying game cards in a configurable way
2. A template file (`games/game-template.html`) that defines the structure for all game pages
3. An update script (`js/update-game-pages.js`) that can automatically update all game pages to maintain consistency

## 游戏卡片跳转修复记录 (2025-03-19)

### 问题描述
游戏卡片点击无法正常跳转到统一的游戏详情页面。Monster Survivors游戏卡片与Color Match游戏卡片出现重叠，导致Monster Survivors不可见。

### 修复内容

1. **游戏数据修改** (`js/games-data.js`)
   - 添加了Monster Survivors游戏数据
   - 设置正确的游戏路径指向云服务器上的游戏
   ```javascript
   {
       id: 'monster-survivors',
       title: 'Monster Survivors',
       description: 'A fast-paced action game that provides the perfect mental refresh. Navigate through waves of monsters for a quick cognitive reset.',
       type: 'focus',
       image: 'https://img.itch.zone/aW1hZ2UvMTI5NzU1NS83NTU0NzI1LnBuZw==/original/WYIk3D.png',
       path: 'https://cloud.onlinegames.io/games/2025/unity/monster-survivors/index-og.html'
   }
   ```

2. **游戏卡片组件修改** (`js/components/game-card.js`)
   - 修改了游戏卡片的点击事件处理，确保所有卡片点击后都导航到`game-detail.html`页面
   - 为卡片添加了`cursor: pointer`样式，提供视觉反馈表明卡片可点击
   - 添加了`data-id`属性，方便通过URL传递游戏ID参数
   - 阻止了按钮点击事件冒泡，避免与卡片点击事件冲突
   ```javascript
   if (this.options.clickable) {
       card.style.cursor = 'pointer';
       card.addEventListener('click', () => {
           // Navigate to game-detail.html with game ID
           window.location.href = `game-detail.html?id=${id}`;
       });
   }
   ```

3. **游戏详情页面修改** (`game-detail.html`)
   - 改用动态加载方式，根据URL参数中的游戏ID展示相应游戏内容
   - 添加了JavaScript代码从URL参数中获取游戏ID
   - 根据游戏ID动态更新页面标题、描述、游戏标签等信息
   - 根据游戏类型显示不同的控制说明
   - 添加了错误处理，当游戏ID无效时显示适当的错误信息
   ```javascript
   // 从 URL 参数中获取游戏 ID
   const urlParams = new URLSearchParams(window.location.search);
   const gameId = urlParams.get('id');
   
   // 默认游戏 ID，如果未提供
   const defaultGameId = 'monster-survivors';
   
   // 使用 games-data.js 中的函数获取游戏数据
   const game = getGameById(gameId || defaultGameId);
   ```

4. **样式修复**
   - 为游戏卡片添加了`position: relative`和`z-index`属性，防止卡片重叠
   - 为悬停的卡片增加了更高的`z-index`值，确保悬停卡片总是在最上层
   ```css
   .game-card {
       position: relative;
       z-index: 1;
   }
   
   .game-card:hover {
       z-index: 2;
   }
   ```

### 后续注意事项

1. 添加新游戏时，确保在`js/games-data.js`中添加完整的游戏数据
2. 对于即将推出的游戏，可以设置`comingSoon: true`属性
3. 每个游戏的`id`属性必须唯一
4. 点击游戏卡片时，会通过URL参数传递游戏ID，格式为`game-detail.html?id=游戏ID`
5. 游戏详情页面会根据游戏ID动态加载相应的游戏内容

## How to Use the Update Script

When you need to update all game pages (for example, after changing the branding or making design changes):

### Prerequisites

- Node.js installed on your system
- Access to the project files

### Steps

1. Make sure your game data is correctly defined in `js/games-data.js`
2. Update the template in `games/game-template.html` if needed
3. Run the update script:

```bash
node js/update-game-pages.js
```

4. Check the updated game pages to ensure everything looks correct

## Adding a New Game

When adding a new game:

1. Add the game data to `js/games-data.js` with all required fields:
   - `id`: A unique identifier for the game
   - `title`: The display name of the game
   - `description`: A short description of the game
   - `type`: The game type (focus, creative, logic, or calm)
   - `image`: Path to the game image
   - `path`: Path to the game HTML file

2. Create any game-specific CSS and JS files (with names matching the game ID)

3. Run the update script to generate the game page:

```bash
node js/update-game-pages.js
```

4. Customize the game-specific JavaScript to implement the game functionality

## Customizing Game Pages

While the update script ensures consistency, you may need to customize specific aspects of a game:

- For game-specific styling, edit the CSS file named after the game ID
- For game-specific behavior, edit the JS file named after the game ID
- If a game requires completely custom HTML, create it manually but ensure it follows the branding guidelines

## Troubleshooting

If you encounter issues when running the update script:

- Make sure all paths in the script are correct for your environment
- Check that the games-data.js file is properly formatted
- Ensure you have write permissions for the games directory

## Maintaining Brand Consistency

Remember these key elements of the onerestgame brand:

- Always use "onerestgame" (lowercase) in the logo and references
- Use the standard footer with SEO content
- Maintain the consistent color scheme and typography across all pages
- All content should be in English for international users

For any questions or issues, please contact the web development team. 