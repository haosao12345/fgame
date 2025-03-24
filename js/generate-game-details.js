/**
 * Game Details Pages Generator
 * 
 * 这个脚本根据games-data.js中的游戏数据和游戏详情页模板为每个游戏生成独立的详情页面。
 * 使用方法: node js/generate-game-details.js
 */

// 引入Node.js模块
const fs = require('fs');
const path = require('path');

// 定义路径
const TEMPLATE_PATH = path.join(__dirname, '..', 'games', 'game-detail-template.html');
const GAMES_DIR = path.join(__dirname, '..', 'games');
const LOG_FILE = path.join(__dirname, '..', 'generate-details-log.txt');
const GAMES_DATA_PATH = path.join(__dirname, 'games-data.js');

// 记录日志到文件
function log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    fs.appendFileSync(LOG_FILE, logMessage);
    console.log(message);
}

// 清除之前的日志
fs.writeFileSync(LOG_FILE, ''); // 清空日志文件

// 从games-data.js读取游戏数据
let gamesData = [];
try {
    const gamesDataContent = fs.readFileSync(GAMES_DATA_PATH, 'utf8');
    // 提取gamesData数组的内容
    const gamesDataMatch = gamesDataContent.match(/const gamesData = \[([\s\S]*?)\];/);
    if (gamesDataMatch) {
        const gamesDataStr = gamesDataMatch[1];
        // 使用eval安全地解析游戏数据
        gamesData = eval(`[${gamesDataStr}]`);
    }
} catch (error) {
    log(`读取游戏数据时出错: ${error.message}`);
    process.exit(1);
}

// 获取游戏类型显示名称的辅助函数
function getGameTypeName(type) {
    const typeNames = {
        'focus': 'Focus',
        'creative': 'Creativity',
        'logic': 'Logic',
        'calm': 'Relaxation'
    };
    return typeNames[type] || 'Unknown';
}

// 根据游戏类型生成游戏控制说明
function generateGameControls(game) {
    switch (game.id) {
        case 'monster-survivors':
            return `
                <div class="control-item">
                    <span class="control-key">W A S D</span>
                    <span>Move character</span>
                </div>
                <div class="control-item">
                    <span class="control-key">Space</span>
                    <span>Use special ability</span>
                </div>
                <div class="control-item">
                    <span class="control-key">1-5</span>
                    <span>Select weapon</span>
                </div>
                <div class="control-item">
                    <span class="control-key">ESC</span>
                    <span>Pause game</span>
                </div>
            `;
        case 'color-match':
            return `
                <div class="control-item">
                    <span class="control-key">✓</span>
                    <span>Match (word color matches meaning)</span>
                </div>
                <div class="control-item">
                    <span class="control-key">✗</span>
                    <span>No match (word color differs from meaning)</span>
                </div>
            `;
        default:
            return `
                <div class="control-item">
                    <span class="control-key">Mouse</span>
                    <span>Interact with game elements</span>
                </div>
                <div class="control-item">
                    <span class="control-key">Click</span>
                    <span>Select options</span>
                </div>
            `;
    }
}

// 生成游戏目标说明
function generateGameGoal(game) {
    switch (game.id) {
        case 'monster-survivors':
            return 'Survive as long as possible while defeating monsters and collecting upgrades. Each run is short but satisfying, making it perfect for a quick brain break.';
        case 'color-match':
            return 'Quickly determine if the color of the word matches its meaning. This game tests your attention and cognitive flexibility.';
        case 'memory-cards':
            return 'Flip cards and find matching pairs to train your memory. Complete the board in as few attempts as possible.';
        default:
            return 'Each game is designed to provide a satisfying experience in a short time, making it perfect for a quick brain break. The difficulty curve is designed to provide just the right level of challenge for a mental reset.';
    }
}

// 生成游戏容器内容
function generateGameContainer(game) {
    if (game.path && !game.comingSoon) {
        // 检查是否是gameflare的游戏
        if (game.path.includes('gameflare.com')) {
            return `<iframe src="${game.path}" allowfullscreen="true" frameborder="0"></iframe>`;
        } else if (game.path.includes('playhop.com')) {
            // 如果是playhop的游戏，使用embed路径
            const gameId = game.path.split('/').pop();
            return `<iframe src="https://playhop.com/embed/${gameId}" allowfullscreen="true" frameborder="0"></iframe>`;
        } else {
            // 其他游戏保持原样
            return `<iframe src="${game.path}" allowfullscreen="true" frameborder="0"></iframe>`;
        }
    } else {
        // 对于即将推出的游戏，显示预览图像
        const imgPath = game.image.startsWith('http') ? game.image : `../${game.image}`;
        return `
            <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; flex-direction: column; background-color: #f5f5f7; position: absolute; top: 0; left: 0;">
                <img src="${imgPath}" alt="${game.title}" style="max-width: 80%; max-height: 80%; object-fit: contain;">
                ${game.comingSoon ? '<div style="margin-top: 1rem; font-size: 1.5rem; font-weight: bold; color: #007AFF;">Coming Soon</div>' : ''}
            </div>
        `;
    }
}

// 生成游戏特定的脚本
function generateAdditionalScripts(game) {
    return '';
}

// 为每个游戏生成详情页面
function generateDetailPage(game) {
    log(`正在为游戏 '${game.title}' 生成详情页...`);
    
    try {
        let templateContent = fs.readFileSync(TEMPLATE_PATH, 'utf8');
        
        // 替换模板中的占位符
        templateContent = templateContent.replace(/{{GAME_TITLE}}/g, game.title);
        templateContent = templateContent.replace('{{GAME_DESCRIPTION}}', game.description || '暂无描述');
        templateContent = templateContent.replace(/{{GAME_TYPE}}/g, game.type);
        templateContent = templateContent.replace(/{{GAME_TYPE_NAME}}/g, getGameTypeName(game.type));
        templateContent = templateContent.replace(/{{GAME_TYPE_LOWERCASE}}/g, getGameTypeName(game.type).toLowerCase());
        
        // 替换游戏控制说明
        templateContent = templateContent.replace('{{GAME_CONTROLS}}', generateGameControls(game));
        
        // 替换游戏目标说明
        templateContent = templateContent.replace('{{GAME_GOAL}}', generateGameGoal(game));
        
        // 替换游戏容器内容
        templateContent = templateContent.replace('{{GAME_CONTAINER_CONTENT}}', generateGameContainer(game));
        templateContent = templateContent.replace(/{{ADDITIONAL_SCRIPTS}}/g, generateAdditionalScripts(game));
        
        // 确保游戏目录存在
        if (!fs.existsSync(GAMES_DIR)) {
            fs.mkdirSync(GAMES_DIR, { recursive: true });
        }
        
        // 创建游戏详情页文件
        const detailPagePath = `${GAMES_DIR}/${game.id}-detail.html`;
        fs.writeFileSync(detailPagePath, templateContent);
        
        log(`✓ 游戏 '${game.title}' 的详情页生成成功: ${detailPagePath}`);
    } catch (error) {
        const errorMsg = `为游戏 '${game.title}' 生成详情页时出错: ${error.message}`;
        log(errorMsg);
        console.error(error);
    }
}

// 定义新增的游戏ID列表
const newGameIds = [
    'Railbound',
    'Color-Water-Sort-3D',
    'Craft-Cars-Flying-Pigs',
    'World-Hardest-Game',
    'Save-The-Dog',
    'Save-the-Fish',
    'City-Blocks'
];

// 主函数
async function main() {
    log('===================================');
    log('开始为新增游戏生成详情页...');
    log('===================================');

    // 只处理新增的游戏
    const gamesToProcess = gamesData.filter(game => newGameIds.includes(game.id));
    log(`找到 ${gamesToProcess.length} 个新增游戏，开始生成详情页...`);

    for (const game of gamesToProcess) {
        log(`正在为游戏 '${game.title}' 生成详情页...`);
        try {
            generateDetailPage(game);
            log(`✓ 游戏 '${game.title}' 的详情页生成成功: ${path.join(GAMES_DIR, `${game.id}-detail.html`)}`);
        } catch (error) {
            log(`✗ 生成游戏 '${game.title}' 的详情页时出错: ${error.message}`);
        }
    }

    log('===================================');
    log('新增游戏详情页生成完成！');
    log('===================================');
}

// 执行主函数
main(); 