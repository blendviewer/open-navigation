export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  publishDate: string;
  readTime: string;
  tags: string[];
  category: string;
  featured?: boolean;
  imageUrl?: string;
}

export const newsArticles: NewsArticle[] = [
  {
    id: '1',
    title: 'AI绘画工具的最新发展趋势',
    content: `# AI绘画工具的最新发展趋势

## 引言
随着人工智能技术的快速发展，AI绘画工具正在改变创意产业的格局。从Midjourney到DALL-E 3，这些工具不仅提升了创作效率，还开启了全新的艺术表达方式。

### 主要趋势

**1. 生成式AI的突破**
- 更高质量的图像生成
- 更精确的文本到图像转换
- 更快的处理速度

**2. 商业应用场景**
- 广告设计
- 游戏开发
- 电影制作

### 技术进展

\`\`\`python
# 示例：使用AI生成图像
import openai
response = openai.Image.create(
  prompt="一只可爱的小猫在花园里玩耍",
  n=1,
  size="1024x1024"
)
\`\`\`

### 未来展望

AI绘画工具将继续演进，预计在以下方面会有重大突破：

1. **实时生成** - 更快的响应速度
2. **多模态融合** - 文本、图像、音频的整合
3. **个性化定制** - 更符合用户风格的作品

更多信息请访问 [AI绘画官网](https://example.com)`,
    excerpt: '探索AI绘画工具的最新发展，了解技术突破和商业应用场景...',
    author: 'AI研究员',
    publishDate: '2024-01-15',
    readTime: '5分钟',
    tags: ['AI绘画', '技术趋势', '创意工具'],
    category: '技术趋势',
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
  },
  {
    id: '2',
    title: 'ChatGPT在企业中的实际应用案例',
    content: `# ChatGPT在企业中的实际应用案例

## 客户服务优化

ChatGPT正在改变企业的客户服务方式：

- **24/7在线支持**
- **多语言服务**
- **智能问题分类**

## 内容创作助手

\`\`\`
// 使用ChatGPT API进行内容生成
const response = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [
    {"role": "user", "content": "写一篇关于AI的文章"}
  ]
});
\`\`\`

## 代码开发支持

ChatGPT在编程领域的应用越来越广泛，能够：
- 代码审查
- 调试帮助
- 文档生成

## 实施建议

1. **逐步集成** - 从简单任务开始
2. **培训员工** - 提高使用效率
3. **监控效果** - 持续优化流程`,
    excerpt: '深入了解ChatGPT如何帮助企业提升效率和创新能力...',
    author: '企业技术专家',
    publishDate: '2024-01-12',
    readTime: '8分钟',
    tags: ['ChatGPT', '企业应用', 'AI助手'],
    category: '企业应用',
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop',
  },
  {
    id: '3',
    title: '2024年AI工具投资指南',
    content: `# 2024年AI工具投资指南

## 投资趋势分析

**热门领域：**
- AI基础设施
- 垂直行业应用
- 开源AI项目

## 风险评估

投资AI工具需要考虑以下风险因素：

1. **技术风险**
   - 技术更新迭代快
   - 竞争激烈

2. **市场风险**
   - 市场需求变化
   - 政策法规影响

3. **监管风险**
   - 数据隐私法规
   - AI伦理规范

## 投资策略

### 分散投资
- 不同技术领域
- 不同发展阶段
- 不同地域市场

### 长期持有
- AI技术发展需要时间
- 避免短期投机行为`,
    excerpt: '为投资者提供2024年AI工具领域的投资建议和风险分析...',
    author: '投资分析师',
    publishDate: '2024-01-10',
    readTime: '12分钟',
    tags: ['投资', 'AI工具', '市场分析'],
    category: '行业动态',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
  },
  {
    id: '4',
    title: '如何使用Midjourney创作高质量艺术作品',
    content: `# 如何使用Midjourney创作高质量艺术作品

## 基础设置

首先需要了解Midjourney的基本操作：

1. **加入Discord服务器**
2. **选择适合的频道**
3. **了解基本命令**

## 提示词技巧

### 结构化的提示词
\`\`\`
/imagine prompt: [主体] [风格] [光线] [构图] [质量参数]
\`\`\`

### 常用参数
- **--ar 16:9** - 设置宽高比
- **--v 6** - 选择模型版本
- **--q 2** - 设置质量等级

## 高级技巧

### 风格混合
结合多种艺术风格：
- 写实主义 + 印象派
- 现代主义 + 古典主义

### 光线控制
- 自然光
- 人工照明
- 戏剧性光影

## 常见问题解决

1. **图像质量不佳** - 调整质量参数
2. **风格不符合预期** - 优化提示词
3. **构图问题** - 使用构图指令`,
    excerpt: '学习Midjourney的高级技巧，提升AI艺术创作水平...',
    author: '数字艺术家',
    publishDate: '2024-01-08',
    readTime: '10分钟',
    tags: ['Midjourney', 'AI绘画', '教程'],
    category: '使用教程',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop',
  },
  {
    id: '5',
    title: 'AI语音合成技术的突破与应用',
    content: `# AI语音合成技术的突破与应用

## 技术发展历程

从早期的TTS到现在的神经语音合成：

1. **传统TTS** - 基于规则的合成
2. **统计TTS** - 基于统计模型
3. **神经TTS** - 深度学习驱动

## 最新技术突破

### 自然度提升
- 情感表达更丰富
- 语调变化更自然
- 停顿节奏更真实

### 个性化定制
- 声音克隆技术
- 风格迁移能力
- 多语言支持

## 应用场景

### 内容创作
- 播客制作
- 有声书录制
- 视频配音

### 商业应用
- 客服系统
- 导航语音
- 教育工具

## 技术实现

\`\`\`python
# 使用ElevenLabs API示例
import requests

url = "https://api.elevenlabs.io/v1/text-to-speech/voice_id"
headers = {
    "Accept": "audio/mpeg",
    "Content-Type": "application/json",
    "xi-api-key": "your-api-key"
}
\`\`\``,
    excerpt: '了解AI语音合成技术的最新进展和实际应用...',
    author: '语音技术专家',
    publishDate: '2024-01-05',
    readTime: '7分钟',
    tags: ['语音合成', 'AI技术', '应用案例'],
    category: '技术趋势',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop',
  },
  {
    id: '6',
    title: 'AI代码助手对比：GitHub Copilot vs Cursor',
    content: `# AI代码助手对比：GitHub Copilot vs Cursor

## 功能对比

### GitHub Copilot
**优势：**
- 集成度高
- 支持多种IDE
- 代码质量稳定

**劣势：**
- 价格较高
- 功能相对固定

### Cursor
**优势：**
- 免费使用
- 功能丰富
- 界面现代化

**劣势：**
- 仅支持VS Code
- 稳定性待提升

## 使用体验

### 代码补全
两者都能提供智能代码补全，但风格略有不同：

- **Copilot** - 更保守，代码更规范
- **Cursor** - 更激进，创意性更强

### 代码解释
- **Copilot** - 内置代码解释功能
- **Cursor** - 需要手动触发

## 选择建议

### 适合Copilot的用户
- 企业开发者
- 注重代码质量
- 预算充足

### 适合Cursor的用户
- 个人开发者
- 喜欢尝试新技术
- 预算有限`,
    excerpt: '详细对比两大AI代码助手的优缺点，帮你选择最适合的工具...',
    author: '开发工程师',
    publishDate: '2024-01-03',
    readTime: '6分钟',
    tags: ['代码助手', 'GitHub Copilot', 'Cursor'],
    category: '使用教程',
    imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
  },
];

export const getArticlesByCategory = (category: string): NewsArticle[] => {
  if (category === '全部') {
    return newsArticles;
  }
  return newsArticles.filter((article) => article.category === category);
};

export const searchArticles = (query: string): NewsArticle[] => {
  const lowerQuery = query.toLowerCase();
  return newsArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(lowerQuery) ||
      article.excerpt.toLowerCase().includes(lowerQuery) ||
      article.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
};

export const getFeaturedArticles = (): NewsArticle[] => {
  return newsArticles.filter((article) => article.featured);
};
