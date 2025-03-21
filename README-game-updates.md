# Game Pages Update Guide

This guide explains how to maintain consistent branding and styling across all game pages for the onerestgame website.

## 游戏详情页标题与导航优化记录 (2025-03-22)

### 问题描述
游戏详情页面的标题和返回按钮布局存在以下问题：
1. 游戏标题和返回按钮位于页面右侧，与网站标识和品牌（onerestgame）分离
2. 导航元素的视觉层次不清晰，用户难以快速识别当前游戏和返回路径
3. 移动端适配性不足，在小屏幕设备上布局可能出现挤压

### 修复内容

1. **页面布局优化**
   - 将游戏标题和返回按钮从右侧移至左侧（品牌标识区域）
   - 重新设计了页面顶部栏的布局结构，创建了更合理的视觉层次
   ```html
   <div class="header-content">
       <div class="logo-section">
           <a href="../index.html" class="back-link">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                   <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
               </svg>
               返回首页
           </a>
           <h2 class="game-header-name">{{GAME_TITLE}}</h2>
       </div>
       <div class="logo">
           <a href="../index.html">
               <span class="logo-highlight">onerest</span><span class="logo-highlight">game</span>
           </a>
       </div>
   </div>
   ```

2. **苹果风格设计优化**
   - 按照苹果设计系统风格优化了返回按钮样式
   - 添加了过渡动画和交互反馈，提升用户体验
   - 调整了颜色和圆角，使设计更加符合苹果UI风格
   ```css
   .back-link {
       display: flex;
       align-items: center;
       color: var(--apple-blue);
       text-decoration: none;
       font-weight: 500;
       transition: all 0.2s ease;
       padding: 6px 12px;
       border-radius: 8px;
       background-color: rgba(0, 122, 255, 0.1);
       white-space: nowrap;
   }

   .back-link:hover {
       background-color: rgba(0, 122, 255, 0.2);
       transform: translateX(-2px);
   }

   .back-link:active {
       background-color: rgba(0, 122, 255, 0.3);
       transform: translateX(-2px) scale(0.98);
   }
   ```

3. **响应式设计增强**
   - 为不同屏幕尺寸添加了更细致的适配规则
   - 优化了移动端下的元素尺寸和排列方式
   - 添加了文本溢出处理，确保长游戏标题不会破坏布局
   ```css
   .game-header-name {
       margin-left: 12px;
       white-space: nowrap;
       overflow: hidden;
       text-overflow: ellipsis;
       max-width: 240px;
   }
   
   @media (max-width: 768px) {
       .header-content {
           height: 56px;
       }
       
       .game-header-name {
           max-width: 180px;
           font-size: 1.1rem;
       }
   }
   
   @media (max-width: 480px) {
       .header-content {
           height: 50px;
       }
       
       .back-link {
           padding: 4px 8px;
           font-size: 0.9rem;
       }
       
       .game-header-name {
           max-width: 120px;
           font-size: 1rem;
       }
   }
   ```

### 效果与收益
1. 更加符合直觉的导航体验，用户可以快速识别当前游戏并返回首页
2. 视觉层次更加清晰，游戏标题和返回按钮位于左侧，网站标识位于右侧
3. 按照苹果设计规范优化的交互元素，提供了更佳的用户体验
4. 在各种屏幕尺寸下都能良好显示，包括移动设备和平板电脑
5. 动态交互反馈增强了用户体验，提高了导航的可用性

### 后续注意事项
1. 添加新游戏时，应注意游戏标题长度，过长的标题会在移动端被截断
2. 修改游戏详情页模板后，需要重新运行生成脚本更新所有游戏详情页
3. 可以考虑进一步优化移动端下的布局，例如在特小屏幕上调整标题和按钮的排列方式

## 游戏详情页独立化记录 (2025-03-21)

### 问题描述
之前的游戏详情页实现方式是使用单一的`game-detail.html`页面，通过URL参数动态加载不同游戏的内容。这种方式存在以下问题：
1. 搜索引擎优化(SEO)不佳，难以为每个游戏提供独立的元数据
2. 分享链接不够直观，需要带有查询参数
3. 页面加载时有延迟，需要先加载JavaScript然后再动态加载游戏内容

### 修复内容

1. **游戏卡片组件修改** (`js/components/game-card.js`)
   - 更新了游戏卡片的点击事件处理，链接到独立的游戏详情页
   - 将链接路径从`game-detail.html?id=${id}`改为`games/${id}-detail.html`
   ```javascript
   card.addEventListener('click', () => {
       // 修改为导航到每个游戏的独立详情页
       window.location.href = `games/${id}-detail.html`;
   });
   ```

2. **创建游戏详情页模板** (`games/game-detail-template.html`)
   - 创建了一个新模板文件，作为生成独立游戏详情页的基础
   - 包含了样式、结构和游戏相关的占位符
   - 模板基于原有的`game-detail.html`，但针对静态生成进行了优化
   - 添加了游戏类型相关的样式，如针对不同类型的颜色定义

3. **创建详情页生成脚本** (`js/generate-game-details.js`)
   - 开发了一个Node.js脚本，用于为每个游戏生成独立的详情页
   - 脚本从`games-data.js`提取游戏数据，并使用模板创建HTML文件
   - 为不同游戏类型提供了特定的控制说明和游戏目标描述
   - 支持处理外部和本地游戏链接，以及"即将推出"的游戏显示方式
   ```javascript
   // 为每个游戏生成详情页面
   function generateGameDetailPage(game) {
       // 替换模板中的占位符
       let content = template
           .replace(/{{GAME_TITLE}}/g, game.title)
           .replace(/{{GAME_DESCRIPTION}}/g, game.description)
           .replace(/{{GAME_TYPE}}/g, game.type)
           // 更多替换...
   }
   ```

### 效果与收益
1. 每个游戏现在有一个专属的HTML页面，URL更简洁，如`games/monster-survivors-detail.html`
2. 搜索引擎可以更好地索引每个游戏页面，提高SEO效果
3. 页面加载更快，无需等待JavaScript执行就能显示内容
4. 更容易为每个游戏定制特定的内容和行为
5. 分享链接更简洁明了，更适合在社交媒体上传播

### 后续注意事项
1. 添加新游戏时，需要运行`generate-game-details.js`脚本生成对应的详情页
2. 如果修改了详情页模板，需要重新运行脚本来更新所有游戏的详情页
3. 可以通过编辑脚本中的`generateGameControls`和`generateGameGoal`函数来定制特定游戏的说明
4. 确保所有游戏详情页的样式保持一致，以维持品牌形象

## 游戏卡片样式优化记录 (2025-03-20)

### 问题描述
游戏卡片样式存在几个需要优化的地方：
1. 游戏类型标识在透明背景下不够明显
2. 游戏卡片中的图片高度不固定，导致卡片布局不一致
3. 游戏图片上方有重复显示的名称文字，导致信息冗余

### 修复内容

1. **游戏类型标识优化**
   - 调整了游戏类型标识的位置，移至右上角更醒目的位置
   - 增加了背景色为白色，确保在任何图片上都清晰可见
   - 添加了彩色圆点指示器，以便更好地区分不同类型
   - 增加了阴影效果，使标识从背景中脱颖而出
   ```css
   .game-type {
       display: inline-block;
       padding: 4px 10px 4px 26px;
       border-radius: 20px;
       font-size: 0.75rem;
       font-weight: 600;
       text-transform: capitalize;
       background-color: white;
       position: absolute;
       top: 10px;
       right: 10px;
       z-index: 2;
       box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
   }
   
   .game-type::before {
       content: '';
       position: absolute;
       left: 10px;
       top: 50%;
       transform: translateY(-50%);
       width: 8px;
       height: 8px;
       border-radius: 50%;
   }
   ```

2. **图片容器固定高度**
   - 为图片容器设置了固定高度（160px），确保所有卡片保持一致的高度
   - 对于不同尺寸选项，分别设置了120px、160px和200px三种高度
   - 确保图片填充整个容器并保持比例，避免变形
   ```css
   .game-image-container {
       overflow: hidden;
       border-radius: 12px 12px 0 0;
       height: 160px;
       position: relative;
   }
   
   .game-image {
       width: 100%;
       height: 100%;
       object-fit: cover;
       transition: transform 0.3s ease;
   }
   ```

3. **图片上方文字遮罩处理**
   - 添加了顶部渐变遮罩层，用于隐藏外部图片上可能存在的文字
   - 遮罩使用从黑色到透明的渐变，保持图片整体美观
   ```css
   .game-image-container::after {
       content: '';
       position: absolute;
       top: 0;
       left: 0;
       width: 100%;
       height: 40px; /* 仅覆盖顶部区域 */
       background: linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%);
       z-index: 1;
   }
   ```

4. **图片路径和错误处理优化**
   - 将使用外部URL的图片改为使用本地路径
   - 添加图片加载错误处理，确保找不到图片时显示默认图片
   ```javascript
   // 添加图片加载错误处理
   const handleImageError = `onerror="this.onerror=null; this.src='images/games/default-game.jpg';"`;
   
   // 在图片标签中使用
   <img src="${imageSrc}" alt="${title}" class="game-image" ${handleImageError}>
   ```

5. **响应式设计增强**
   - 针对不同屏幕尺寸调整了游戏卡片的尺寸和布局
   - 在小屏幕上减小了图片容器高度和文字大小
   - 调整了网格布局，确保在移动设备上有更好的显示效果
   ```css
   @media (max-width: 768px) {
       .game-grid {
           grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
       }
       
       .game-image-container {
           height: 140px;
       }
   }
   
   @media (max-width: 480px) {
       .game-grid {
           grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
       }
       
       .game-image-container {
           height: 120px;
       }
   }
   ```

### 效果与收益
1. 游戏卡片现在有更一致的高度和布局，无论图片内容和比例如何
2. 游戏类型标识更加醒目，用户可以更容易地识别游戏类型
3. 卡片整体更加美观，有更好的视觉层次和用户体验
4. 解决了使用外部图片可能导致的名称重复问题
5. 增强了响应式设计，在各种设备上都能得到良好的显示效果

### 后续注意事项
1. 添加新游戏时，应尽量使用本地图片，避免使用带有文字的外部图片
2. 如需使用外部图片，顶部遮罩层可以有效隐藏上方的文字
3. 保持图片尺寸一致，建议使用宽高比接近16:9的图片
4. 添加新游戏类型时，记得在CSS中为其添加对应的颜色变量和样式

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

## Overview

We've created a system to ensure all game pages have a consistent look and feel, with proper branding as "onerestgame". The system includes:

1. A game card component (`js/components/game-card.js`) for displaying game cards in a configurable way
2. A template file (`games/game-template.html`) that defines the structure for all game pages
3. An update script (`js/update-game-pages.js`) that can automatically update all game pages to maintain consistency

## 游戏详情页返回按钮优化记录 (2025-03-23)

### 问题描述
游戏详情页的返回按钮存在以下问题：
1. 返回按钮使用中文"返回首页"，不符合国际化设计需求
2. 按钮样式过于突兀，不符合苹果设计风格的极简主义
3. 按钮在交互时的视觉反馈效果不够精细

### 修复内容

1. **返回按钮文本国际化**
   - 将中文"返回首页"改为英文"Home"
   - 使用更简洁的表述，符合苹果系统的导航习惯
   ```html
   <a href="../index.html" class="back-link">
       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
           <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
       </svg>
       Home
   </a>
   ```

2. **苹果风格按钮样式优化**
   - 调整为透明背景，只在交互时显示微妙的背景色变化
   - 减小圆角半径，调整内边距和字体大小
   - 增加字母间距(-0.01em)，符合苹果系统字体特性
   - 优化图标大小和间距，使整体更加协调
   ```css
   .back-link {
       display: flex;
       align-items: center;
       color: var(--apple-blue);
       text-decoration: none;
       font-weight: 500;
       font-size: 14px;
       letter-spacing: -0.01em;
       transition: all 0.2s ease;
       padding: 5px 10px;
       border-radius: 6px;
       background-color: transparent;
       white-space: nowrap;
   }

   .back-link:hover {
       background-color: rgba(0, 122, 255, 0.06);
   }

   .back-link:active {
       background-color: rgba(0, 122, 255, 0.1);
       transform: scale(0.98);
   }

   .back-link svg {
       margin-right: 4px;
       width: 13px;
       height: 13px;
   }
   ```

3. **交互效果优化**
   - 移除原有的位移效果，改为更加微妙的缩放效果
   - 优化悬停状态的背景色透明度，从0.2降低到0.06
   - 点击状态的视觉反馈更加精细，符合苹果系统的交互设计

### 效果与收益
1. 实现网站国际化，符合跨国用户使用习惯
2. 极简设计提升了界面的专业感，与苹果设计语言保持一致
3. 更加精细的交互反馈，提高了用户体验质量
4. 视觉上更加协调，整体页面布局更加平衡
5. 符合现代UI设计趋势，给用户带来熟悉而舒适的体验

### 后续注意事项
1. 保持所有导航元素文本使用英文，确保国际化一致性
2. 如有需要多语言支持，可考虑添加语言切换功能，而非混用中英文
3. 保持按钮样式的一致性，网站其他部分的导航按钮也应采用类似风格
4. 在未来的设计更新中，应继续遵循苹果设计原则的简洁性和精致感

## 游戏详情页标题与导航优化记录 (2025-03-22)

### 问题描述
游戏详情页面的标题和返回按钮布局存在以下问题：
1. 游戏标题和返回按钮位于页面右侧，与网站标识和品牌（onerestgame）分离
2. 导航元素的视觉层次不清晰，用户难以快速识别当前游戏和返回路径
3. 移动端适配性不足，在小屏幕设备上布局可能出现挤压

### 修复内容

1. **页面布局优化**
   - 将游戏标题和返回按钮从右侧移至左侧（品牌标识区域）
   - 重新设计了页面顶部栏的布局结构，创建了更合理的视觉层次
   ```html
   <div class="header-content">
       <div class="logo-section">
           <a href="../index.html" class="back-link">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                   <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
               </svg>
               返回首页
           </a>
           <h2 class="game-header-name">{{GAME_TITLE}}</h2>
       </div>
       <div class="logo">
           <a href="../index.html">
               <span class="logo-highlight">onerest</span><span class="logo-highlight">game</span>
           </a>
       </div>
   </div>
   ```

2. **苹果风格设计优化**
   - 按照苹果设计系统风格优化了返回按钮样式
   - 添加了过渡动画和交互反馈，提升用户体验
   - 调整了颜色和圆角，使设计更加符合苹果UI风格
   ```css
   .back-link {
       display: flex;
       align-items: center;
       color: var(--apple-blue);
       text-decoration: none;
       font-weight: 500;
       transition: all 0.2s ease;
       padding: 6px 12px;
       border-radius: 8px;
       background-color: rgba(0, 122, 255, 0.1);
       white-space: nowrap;
   }

   .back-link:hover {
       background-color: rgba(0, 122, 255, 0.2);
       transform: translateX(-2px);
   }

   .back-link:active {
       background-color: rgba(0, 122, 255, 0.3);
       transform: translateX(-2px) scale(0.98);
   }
   ```

3. **响应式设计增强**
   - 为不同屏幕尺寸添加了更细致的适配规则
   - 优化了移动端下的元素尺寸和排列方式
   - 添加了文本溢出处理，确保长游戏标题不会破坏布局
   ```css
   .game-header-name {
       margin-left: 12px;
       white-space: nowrap;
       overflow: hidden;
       text-overflow: ellipsis;
       max-width: 240px;
   }
   
   @media (max-width: 768px) {
       .header-content {
           height: 56px;
       }
       
       .game-header-name {
           max-width: 180px;
           font-size: 1.1rem;
       }
   }
   
   @media (max-width: 480px) {
       .header-content {
           height: 50px;
       }
       
       .back-link {
           padding: 4px 8px;
           font-size: 0.9rem;
       }
       
       .game-header-name {
           max-width: 120px;
           font-size: 1rem;
       }
   }
   ```

### 效果与收益
1. 更加符合直觉的导航体验，用户可以快速识别当前游戏并返回首页
2. 视觉层次更加清晰，游戏标题和返回按钮位于左侧，网站标识位于右侧
3. 按照苹果设计规范优化的交互元素，提供了更佳的用户体验
4. 在各种屏幕尺寸下都能良好显示，包括移动设备和平板电脑
5. 动态交互反馈增强了用户体验，提高了导航的可用性

### 后续注意事项
1. 添加新游戏时，应注意游戏标题长度，过长的标题会在移动端被截断
2. 修改游戏详情页模板后，需要重新运行生成脚本更新所有游戏详情页
3. 可以考虑进一步优化移动端下的布局，例如在特小屏幕上调整标题和按钮的排列方式

## 游戏详情页独立化记录 (2025-03-21)

### 问题描述
之前的游戏详情页实现方式是使用单一的`game-detail.html`页面，通过URL参数动态加载不同游戏的内容。这种方式存在以下问题：
1. 搜索引擎优化(SEO)不佳，难以为每个游戏提供独立的元数据
2. 分享链接不够直观，需要带有查询参数
3. 页面加载时有延迟，需要先加载JavaScript然后再动态加载游戏内容

### 修复内容

1. **游戏卡片组件修改** (`js/components/game-card.js`)
   - 更新了游戏卡片的点击事件处理，链接到独立的游戏详情页
   - 将链接路径从`game-detail.html?id=${id}`改为`games/${id}-detail.html`
   ```javascript
   card.addEventListener('click', () => {
       // 修改为导航到每个游戏的独立详情页
       window.location.href = `games/${id}-detail.html`;
   });
   ```

2. **创建游戏详情页模板** (`games/game-detail-template.html`)
   - 创建了一个新模板文件，作为生成独立游戏详情页的基础
   - 包含了样式、结构和游戏相关的占位符
   - 模板基于原有的`game-detail.html`，但针对静态生成进行了优化
   - 添加了游戏类型相关的样式，如针对不同类型的颜色定义

3. **创建详情页生成脚本** (`js/generate-game-details.js`)
   - 开发了一个Node.js脚本，用于为每个游戏生成独立的详情页
   - 脚本从`games-data.js`提取游戏数据，并使用模板创建HTML文件
   - 为不同游戏类型提供了特定的控制说明和游戏目标描述
   - 支持处理外部和本地游戏链接，以及"即将推出"的游戏显示方式
   ```javascript
   // 为每个游戏生成详情页面
   function generateGameDetailPage(game) {
       // 替换模板中的占位符
       let content = template
           .replace(/{{GAME_TITLE}}/g, game.title)
           .replace(/{{GAME_DESCRIPTION}}/g, game.description)
           .replace(/{{GAME_TYPE}}/g, game.type)
           // 更多替换...
   }
   ```

### 效果与收益
1. 每个游戏现在有一个专属的HTML页面，URL更简洁，如`games/monster-survivors-detail.html`
2. 搜索引擎可以更好地索引每个游戏页面，提高SEO效果
3. 页面加载更快，无需等待JavaScript执行就能显示内容
4. 更容易为每个游戏定制特定的内容和行为
5. 分享链接更简洁明了，更适合在社交媒体上传播

### 后续注意事项
1. 添加新游戏时，需要运行`generate-game-details.js`脚本生成对应的详情页
2. 如果修改了详情页模板，需要重新运行脚本来更新所有游戏的详情页
3. 可以通过编辑脚本中的`generateGameControls`和`generateGameGoal`函数来定制特定游戏的说明
4. 确保所有游戏详情页的样式保持一致，以维持品牌形象

## 游戏卡片样式优化记录 (2025-03-20)

### 问题描述
游戏卡片样式存在几个需要优化的地方：
1. 游戏类型标识在透明背景下不够明显
2. 游戏卡片中的图片高度不固定，导致卡片布局不一致
3. 游戏图片上方有重复显示的名称文字，导致信息冗余

### 修复内容

1. **游戏类型标识优化**
   - 调整了游戏类型标识的位置，移至右上角更醒目的位置
   - 增加了背景色为白色，确保在任何图片上都清晰可见
   - 添加了彩色圆点指示器，以便更好地区分不同类型
   - 增加了阴影效果，使标识从背景中脱颖而出
   ```css
   .game-type {
       display: inline-block;
       padding: 4px 10px 4px 26px;
       border-radius: 20px;
       font-size: 0.75rem;
       font-weight: 600;
       text-transform: capitalize;
       background-color: white;
       position: absolute;
       top: 10px;
       right: 10px;
       z-index: 2;
       box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
   }
   
   .game-type::before {
       content: '';
       position: absolute;
       left: 10px;
       top: 50%;
       transform: translateY(-50%);
       width: 8px;
       height: 8px;
       border-radius: 50%;
   }
   ```

2. **图片容器固定高度**
   - 为图片容器设置了固定高度（160px），确保所有卡片保持一致的高度
   - 对于不同尺寸选项，分别设置了120px、160px和200px三种高度
   - 确保图片填充整个容器并保持比例，避免变形
   ```css
   .game-image-container {
       overflow: hidden;
       border-radius: 12px 12px 0 0;
       height: 160px;
       position: relative;
   }
   
   .game-image {
       width: 100%;
       height: 100%;
       object-fit: cover;
       transition: transform 0.3s ease;
   }
   ```

3. **图片上方文字遮罩处理**
   - 添加了顶部渐变遮罩层，用于隐藏外部图片上可能存在的文字
   - 遮罩使用从黑色到透明的渐变，保持图片整体美观
   ```css
   .game-image-container::after {
       content: '';
       position: absolute;
       top: 0;
       left: 0;
       width: 100%;
       height: 40px; /* 仅覆盖顶部区域 */
       background: linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%);
       z-index: 1;
   }
   ```

4. **图片路径和错误处理优化**
   - 将使用外部URL的图片改为使用本地路径
   - 添加图片加载错误处理，确保找不到图片时显示默认图片
   ```javascript
   // 添加图片加载错误处理
   const handleImageError = `onerror="this.onerror=null; this.src='images/games/default-game.jpg';"`;
   
   // 在图片标签中使用
   <img src="${imageSrc}" alt="${title}" class="game-image" ${handleImageError}>
   ```

5. **响应式设计增强**
   - 针对不同屏幕尺寸调整了游戏卡片的尺寸和布局
   - 在小屏幕上减小了图片容器高度和文字大小
   - 调整了网格布局，确保在移动设备上有更好的显示效果
   ```css
   @media (max-width: 768px) {
       .game-grid {
           grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
       }
       
       .game-image-container {
           height: 140px;
       }
   }
   
   @media (max-width: 480px) {
       .game-grid {
           grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
       }
       
       .game-image-container {
           height: 120px;
       }
   }
   ```

### 效果与收益
1. 游戏卡片现在有更一致的高度和布局，无论图片内容和比例如何
2. 游戏类型标识更加醒目，用户可以更容易地识别游戏类型
3. 卡片整体更加美观，有更好的视觉层次和用户体验
4. 解决了使用外部图片可能导致的名称重复问题
5. 增强了响应式设计，在各种设备上都能得到良好的显示效果

### 后续注意事项
1. 添加新游戏时，应尽量使用本地图片，避免使用带有文字的外部图片
2. 如需使用外部图片，顶部遮罩层可以有效隐藏上方的文字
3. 保持图片尺寸一致，建议使用宽高比接近16:9的图片
4. 添加新游戏类型时，记得在CSS中为其添加对应的颜色变量和样式

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

## Overview

We've created a system to ensure all game pages have a consistent look and feel, with proper branding as "onerestgame". The system includes:

1. A game card component (`js/components/game-card.js`) for displaying game cards in a configurable way
2. A template file (`games/game-template.html`) that defines the structure for all game pages
3. An update script (`js/update-game-pages.js`) that can automatically update all game pages to maintain consistency 