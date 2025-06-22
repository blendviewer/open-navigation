export interface AITool {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategory?: string;
  url: string;
  icon?: string;
  featured?: boolean;
}

export interface SubCategory {
  id: string;
  name: string;
  count?: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  subCategories?: SubCategory[];
}

export const categories: Category[] = [
  { 
    id: "common", 
    name: "常用工具", 
    icon: "⚡",
    subCategories: [
      { id: "chatbot", name: "对话助手" },
      { id: "search", name: "AI搜索" },
      { id: "productivity", name: "效率工具" }
    ]
  },
  { 
    id: "writing", 
    name: "AI文字", 
    icon: "✍️",
    subCategories: [
      { id: "copywriting", name: "文案写作" },
      { id: "content", name: "内容生成" },
      { id: "editing", name: "文本编辑" }
    ]
  },
  { 
    id: "image", 
    name: "AI绘画", 
    icon: "🎨",
    subCategories: [
      { id: "text-to-image", name: "文本生图" },
      { id: "image-edit", name: "图像编辑" },
      { id: "avatar", name: "头像生成" }
    ]
  },
  { 
    id: "design", 
    name: "AI设计", 
    icon: "🎯",
    subCategories: [
      { id: "logo", name: "Logo设计" },
      { id: "poster", name: "海报设计" },
      { id: "ui", name: "UI设计" }
    ]
  },
  { 
    id: "video", 
    name: "AI视频", 
    icon: "🎬",
    subCategories: [
      { id: "generation", name: "视频生成" },
      { id: "editing", name: "视频编辑" },
      { id: "animation", name: "动画制作" }
    ]
  },
  { 
    id: "audio", 
    name: "AI音频", 
    icon: "🎵",
    subCategories: [
      { id: "voice", name: "语音合成" },
      { id: "music", name: "音乐生成" },
      { id: "transcription", name: "语音转文字" }
    ]
  },
  { 
    id: "office", 
    name: "AI办公", 
    icon: "💼",
    subCategories: [
      { id: "document", name: "文档处理" },
      { id: "presentation", name: "演示制作" },
      { id: "spreadsheet", name: "表格分析" },
      { id: "meeting", name: "会议助手" }
    ]
  },
  { 
    id: "translate", 
    name: "AI翻译", 
    icon: "🌐",
    subCategories: [
      { id: "text", name: "文本翻译" },
      { id: "document", name: "文档翻译" },
      { id: "real-time", name: "实时翻译" }
    ]
  },
  { 
    id: "commerce", 
    name: "AI电商运营", 
    icon: "🛒",
    subCategories: [
      { id: "product", name: "商品描述" },
      { id: "marketing", name: "营销文案" },
      { id: "analysis", name: "数据分析" }
    ]
  },
  { 
    id: "model", 
    name: "AI模型", 
    icon: "🤖",
    subCategories: [
      { id: "llm", name: "大语言模型" },
      { id: "api", name: "API服务" },
      { id: "fine-tune", name: "模型微调" }
    ]
  },
  { 
    id: "development", 
    name: "AI开发", 
    icon: "💻",
    subCategories: [
      { id: "code", name: "代码生成" },
      { id: "debug", name: "代码调试" },
      { id: "review", name: "代码审查" }
    ]
  },
  { 
    id: "application", 
    name: "AI应用", 
    icon: "📱",
    subCategories: [
      { id: "mobile", name: "移动应用" },
      { id: "web", name: "Web应用" },
      { id: "plugin", name: "浏览器插件" }
    ]
  },
  { 
    id: "website", 
    name: "网站提交", 
    icon: "🔗",
    subCategories: [
      { id: "submit", name: "提交网站" },
      { id: "seo", name: "SEO优化" }
    ]
  },
  { 
    id: "friend", 
    name: "友情链接", 
    icon: "🤝",
    subCategories: [
      { id: "exchange", name: "链接交换" },
      { id: "directory", name: "网站目录" }
    ]
  }
];

export const aiTools: AITool[] = [
  // 常用工具
  {
    id: "chatgpt",
    name: "ChatGPT",
    description: "OpenAI 开发的强大AI对话助手，可以进行多种任务",
    category: "common",
    subcategory: "chatbot",
    url: "https://chat.openai.com",
    featured: true,
    icon: "🤖"
  },
  {
    id: "claude",
    name: "Claude",
    description: "Anthropic 开发的AI助手，在对话和分析方面表现出色",
    category: "common",
    subcategory: "chatbot",
    url: "https://claude.ai",
    featured: true,
    icon: "🎭"
  },
  {
    id: "gemini",
    name: "Gemini",
    description: "Google 的多模态AI模型，支持文本、图像和代码",
    category: "common",
    subcategory: "chatbot",
    url: "https://gemini.google.com",
    featured: true,
    icon: "💎"
  },
  {
    id: "kimi",
    name: "Kimi",
    description: "Kimi 是一个有着超大记忆的智能助手",
    category: "common",
    subcategory: "chatbot",
    url: "https://kimi.moonshot.cn",
    icon: "🌙"
  },
  {
    id: "doubao",
    name: "豆包",
    description: "字节跳动的AI智能助手，拥有丰富的知识储备",
    category: "common",
    subcategory: "chatbot",
    url: "https://www.doubao.com",
    icon: "🫘"
  },
  {
    id: "tongyi",
    name: "通义千问",
    description: "阿里云推出的超大规模语言模型",
    category: "common",
    subcategory: "chatbot",
    url: "https://tongyi.aliyun.com",
    icon: "💫"
  },
  {
    id: "yiyan",
    name: "文心一言",
    description: "百度推出的知识增强大语言模型",
    category: "common",
    subcategory: "chatbot",
    url: "https://yiyan.baidu.com",
    icon: "🧠"
  },
  {
    id: "spark",
    name: "讯飞星火",
    description: "科大讯飞推出的认知智能大模型",
    category: "common",
    subcategory: "chatbot",
    url: "https://xinghuo.xfyun.cn",
    icon: "⭐"
  },
  {
    id: "chat360",
    name: "360智脑",
    description: "360推出的大语言模型应用",
    category: "common",
    subcategory: "chatbot",
    url: "https://chat.360.cn",
    icon: "🛡️"
  },
  {
    id: "perplexity",
    name: "Perplexity",
    description: "AI驱动的智能搜索引擎",
    category: "common",
    subcategory: "search",
    url: "https://perplexity.ai",
    icon: "🔍"
  },
  {
    id: "you-com",
    name: "You.com",
    description: "AI搜索引擎，提供准确的搜索结果",
    category: "common",
    subcategory: "search",
    url: "https://you.com",
    icon: "🌐"
  },
  {
    id: "bing-chat",
    name: "Bing Chat",
    description: "微软集成AI的搜索引擎",
    category: "common",
    subcategory: "search",
    url: "https://bing.com/chat",
    icon: "🔎"
  },
  {
    id: "phind",
    name: "Phind",
    description: "面向开发者的AI搜索引擎",
    category: "common",
    subcategory: "search",
    url: "https://phind.com",
    icon: "💻"
  },
  {
    id: "devv",
    name: "Devv",
    description: "专为程序员设计的AI搜索引擎",
    category: "common",
    subcategory: "search",
    url: "https://devv.ai",
    icon: "⚡"
  },
  {
    id: "grammarly",
    name: "Grammarly",
    description: "AI写作助手，提升工作效率",
    category: "common",
    subcategory: "productivity",
    url: "https://grammarly.com",
    icon: "📝"
  },
  {
    id: "todoist",
    name: "Todoist AI",
    description: "AI智能任务管理工具",
    category: "common",
    subcategory: "productivity",
    url: "https://todoist.com",
    icon: "✅"
  },
  {
    id: "notion-ai",
    name: "Notion AI",
    description: "集成AI功能的全能工作空间",
    category: "common",
    subcategory: "productivity",
    url: "https://notion.so",
    icon: "📋"
  },
  {
    id: "obsidian-ai",
    name: "Obsidian AI",
    description: "AI增强的知识管理工具",
    category: "common",
    subcategory: "productivity",
    url: "https://obsidian.md",
    icon: "🧩"
  },

  // AI文字 - 大幅扩展
  {
    id: "jasper02",
    name: "Jasper",
    description: "专业的AI文案写作工具，适合营销内容创作",
    category: "writing",
    subcategory: "copywriting",
    url: "https://jasper.ai",
    icon: "✍️"
  },
  {
    id: "copy-ai",
    name: "Copy.ai",
    description: "AI驱动的文案生成器，快速创建各种营销文案",
    category: "writing",
    subcategory: "copywriting",
    url: "https://copy.ai",
    icon: "📝"
  },
  {
    id: "writesonic",
    name: "Writesonic",
    description: "多功能AI写作平台，支持文章、广告文案等",
    category: "writing",
    subcategory: "content",
    url: "https://writesonic.com",
    icon: "🖊️"
  },
  {
    id: "rytr",
    name: "Rytr",
    description: "AI写作助手，帮你创建高质量内容",
    category: "writing",
    subcategory: "content",
    url: "https://rytr.me",
    icon: "✨"
  },
  {
    id: "contentbot",
    name: "ContentBot",
    description: "AI内容创作平台，支持多种文本类型",
    category: "writing",
    subcategory: "content",
    url: "https://contentbot.ai",
    icon: "🤖"
  },
  {
    id: "anyword",
    name: "Anyword",
    description: "数据驱动的AI文案写作工具",
    category: "writing",
    subcategory: "copywriting",
    url: "https://anyword.com",
    icon: "📊"
  },
  {
    id: "closerscopy",
    name: "ClosersCopy",
    description: "专注于销售文案的AI写作工具",
    category: "writing",
    subcategory: "copywriting",
    url: "https://closerscopy.com",
    icon: "💰"
  },
  {
    id: "peppertype",
    name: "Peppertype",
    description: "AI内容创作平台，适合营销团队",
    category: "writing",
    subcategory: "content",
    url: "https://peppertype.ai",
    icon: "🌶️"
  },
  {
    id: "copysmith",
    name: "Copysmith",
    description: "专业的AI文案生成工具",
    category: "writing",
    subcategory: "copywriting",
    url: "https://copysmith.ai",
    icon: "🛠️"
  },
  {
    id: "shortly-ai",
    name: "Shortly AI",
    description: "AI写作伙伴，帮你克服写作瓶颈",
    category: "writing",
    subcategory: "content",
    url: "https://shortlyai.com",
    icon: "⚡"
  },
  {
    id: "quillbot",
    name: "QuillBot",
    description: "AI释义和语法检查工具",
    category: "writing",
    subcategory: "editing",
    url: "https://quillbot.com",
    icon: "🪶"
  },
  {
    id: "wordtune",
    name: "Wordtune",
    description: "AI写作伴侣，提升表达效果",
    category: "writing",
    subcategory: "editing",
    url: "https://wordtune.com",
    icon: "🎵"
  },
  {
    id: "hemingway",
    name: "Hemingway Editor",
    description: "让你的写作更加清晰有力",
    category: "writing",
    subcategory: "editing",
    url: "https://hemingwayapp.com",
    icon: "📖"
  },
  {
    id: "ginger",
    name: "Ginger",
    description: "AI语法和拼写检查工具",
    category: "writing",
    subcategory: "editing",
    url: "https://ginger.io",
    icon: "🌿"
  },
  {
    id: "prowritingaid",
    name: "ProWritingAid",
    description: "综合性写作分析和改进工具",
    category: "writing",
    subcategory: "editing",
    url: "https://prowritingaid.com",
    icon: "📚"
  },

  // AI绘画 - 扩展
  {
    id: "midjourney",
    name: "Midjourney",
    description: "业界领先的AI绘画工具，生成高质量艺术作品",
    category: "image",
    subcategory: "text-to-image",
    url: "https://midjourney.com",
    featured: true,
    icon: "🎨"
  },
  {
    id: "dalle",
    name: "DALL-E 3",
    description: "OpenAI的图像生成模型，创造力十足",
    category: "image",
    subcategory: "text-to-image",
    url: "https://labs.openai.com",
    featured: true,
    icon: "🖼️"
  },
  {
    id: "stable-diffusion",
    name: "Stable Diffusion",
    description: "开源的AI图像生成模型，功能强大且可定制",
    category: "image",
    subcategory: "text-to-image",
    url: "https://stability.ai",
    icon: "🎭"
  },
  {
    id: "leonardo-ai",
    name: "Leonardo AI",
    description: "专业的AI艺术创作平台",
    category: "image",
    subcategory: "text-to-image",
    url: "https://leonardo.ai",
    icon: "🖌️"
  },
  {
    id: "playground-ai",
    name: "Playground AI",
    description: "免费的AI图像生成器",
    category: "image",
    subcategory: "text-to-image",
    url: "https://playground.ai",
    icon: "🎪"
  },
  {
    id: "dreamstudio",
    name: "DreamStudio",
    description: "Stability AI官方的图像生成平台",
    category: "image",
    subcategory: "text-to-image",
    url: "https://dreamstudio.ai",
    icon: "💭"
  },
  {
    id: "nightcafe",
    name: "NightCafe",
    description: "AI艺术生成器，支持多种风格",
    category: "image",
    subcategory: "text-to-image",
    url: "https://nightcafe.studio",
    icon: "🌙"
  },
  {
    id: "artbreeder",
    name: "Artbreeder",
    description: "协作式AI艺术创作平台",
    category: "image",
    subcategory: "text-to-image",
    url: "https://artbreeder.com",
    icon: "🧬"
  },
  {
    id: "photoshop-ai",
    name: "Photoshop AI",
    description: "Adobe集成的AI图像编辑功能",
    category: "image",
    subcategory: "image-edit",
    url: "https://photoshop.com",
    icon: "🖌️"
  },
  {
    id: "remove-bg",
    name: "Remove.bg",
    description: "AI背景移除工具，一键去除图片背景",
    category: "image",
    subcategory: "image-edit",
    url: "https://remove.bg",
    icon: "🪄"
  },
  {
    id: "upscayl",
    name: "Upscayl",
    description: "免费开源的AI图像放大工具",
    category: "image",
    subcategory: "image-edit",
    url: "https://upscayl.github.io",
    icon: "📈"
  },
  {
    id: "topaz-gigapixel",
    name: "Topaz Gigapixel",
    description: "专业的AI图像放大软件",
    category: "image",
    subcategory: "image-edit",
    url: "https://topazlabs.com",
    icon: "🔍"
  },
  {
    id: "cleanup-pictures",
    name: "Cleanup Pictures",
    description: "AI驱动的图像修复工具",
    category: "image",
    subcategory: "image-edit",
    url: "https://cleanup.pictures",
    icon: "🧹"
  },
  {
    id: "avatar-ai",
    name: "Avatar AI",
    description: "AI头像生成器，创建个性化头像",
    category: "image",
    subcategory: "avatar",
    url: "https://avatar.ai",
    icon: "👤"
  },
  {
    id: "lensa",
    name: "Lensa AI",
    description: "AI头像和肖像生成应用",
    category: "image",
    subcategory: "avatar",
    url: "https://lensa-ai.com",
    icon: "📸"
  },
  {
    id: "profilepicture",
    name: "ProfilePicture.ai",
    description: "专业的AI头像制作工具",
    category: "image",
    subcategory: "avatar",
    url: "https://profilepicture.ai",
    icon: "🎭"
  },

  // AI设计 - 扩展
  {
    id: "canva-ai",
    name: "Canva AI",
    description: "集成AI功能的设计平台，快速创建专业设计",
    category: "design",
    subcategory: "poster",
    url: "https://canva.com",
    icon: "🎯"
  },
  {
    id: "figma-ai",
    name: "Figma AI",
    description: "设计工具中的AI助手，提升设计效率",
    category: "design",
    subcategory: "ui",
    url: "https://figma.com",
    icon: "🔧"
  },
  {
    id: "looka",
    name: "Looka",
    description: "AI驱动的Logo设计平台",
    category: "design",
    subcategory: "logo",
    url: "https://looka.com",
    icon: "🏷️"
  },
  {
    id: "logoai",
    name: "LogoAI",
    description: "智能Logo设计生成器",
    category: "design",
    subcategory: "logo",
    url: "https://logoai.com",
    icon: "🎨"
  },
  {
    id: "brandmark",
    name: "Brandmark",
    description: "AI品牌设计工具",
    category: "design",
    subcategory: "logo",
    url: "https://brandmark.io",
    icon: "🏢"
  },
  {
    id: "designs-ai",
    name: "Designs.ai",
    description: "一站式AI设计平台",
    category: "design",
    subcategory: "poster",
    url: "https://designs.ai",
    icon: "🎪"
  },
  {
    id: "beautiful-ai",
    name: "Beautiful.ai",
    description: "AI驱动的演示文稿设计工具",
    category: "design",
    subcategory: "poster",
    url: "https://beautiful.ai",
    icon: "📊"
  },
  {
    id: "uizard",
    name: "Uizard",
    description: "AI辅助的UI/UX设计工具",
    category: "design",
    subcategory: "ui",
    url: "https://uizard.io",
    icon: "📱"
  },
  {
    id: "galileo-ai",
    name: "Galileo AI",
    description: "AI界面设计生成器",
    category: "design",
    subcategory: "ui",
    url: "https://usegalileo.ai",
    icon: "🌟"
  },

  // AI视频 - 扩展
  {
    id: "runway",
    name: "Runway",
    description: "AI视频编辑和生成平台，创意无限",
    category: "video",
    subcategory: "generation",
    url: "https://runwayml.com",
    icon: "🎬"
  },
  {
    id: "pika-labs",
    name: "Pika Labs",
    description: "AI视频生成工具，轻松创建动态内容",
    category: "video",
    subcategory: "generation",
    url: "https://pika.art",
    icon: "🎥"
  },
  {
    id: "gen-2",
    name: "Gen-2",
    description: "下一代AI视频生成技术",
    category: "video",
    subcategory: "generation",
    url: "https://runwayml.com/gen-2",
    icon: "🚀"
  },
  {
    id: "steve-ai",
    name: "Steve.ai",
    description: "AI视频制作平台",
    category: "video",
    subcategory: "generation",
    url: "https://steve.ai",
    icon: "📹"
  },
  {
    id: "synthesia",
    name: "Synthesia",
    description: "AI头像视频制作工具",
    category: "video",
    subcategory: "generation",
    url: "https://synthesia.io",
    icon: "👤"
  },
  {
    id: "descript",
    name: "Descript",
    description: "AI驱动的视频编辑工具",
    category: "video",
    subcategory: "editing",
    url: "https://descript.com",
    icon: "✂️"
  },
  {
    id: "kapwing",
    name: "Kapwing",
    description: "在线AI视频编辑平台",
    category: "video",
    subcategory: "editing",
    url: "https://kapwing.com",
    icon: "🎞️"
  },
  {
    id: "invideo-ai",
    name: "InVideo AI",
    description: "AI视频创作平台",
    category: "video",
    subcategory: "editing",
    url: "https://invideo.io",
    icon: "🎭"
  },
  {
    id: "luma-dream",
    name: "Luma Dream Machine",
    description: "AI动画生成工具",
    category: "video",
    subcategory: "animation",
    url: "https://lumalabs.ai",
    icon: "🌈"
  },
  {
    id: "kaiber",
    name: "Kaiber",
    description: "AI驱动的动画制作平台",
    category: "video",
    subcategory: "animation",
    url: "https://kaiber.ai",
    icon: "🎨"
  },

  // AI音频 - 扩展
  {
    id: "elevenlabs",
    name: "ElevenLabs",
    description: "最先进的AI语音合成技术",
    category: "audio",
    subcategory: "voice",
    url: "https://elevenlabs.io",
    icon: "🔊"
  },
  {
    id: "murf",
    name: "Murf",
    description: "专业的AI配音工具",
    category: "audio",
    subcategory: "voice",
    url: "https://murf.ai",
    icon: "🎙️"
  },
  {
    id: "resemble-ai",
    name: "Resemble AI",
    description: "AI语音克隆和合成平台",
    category: "audio",
    subcategory: "voice",
    url: "https://resemble.ai",
    icon: "🎵"
  },
  {
    id: "speechify",
    name: "Speechify",
    description: "AI文本转语音工具",
    category: "audio",
    subcategory: "voice",
    url: "https://speechify.com",
    icon: "📢"
  },
  {
    id: "suno-ai",
    name: "Suno AI",
    description: "AI音乐创作平台",
    category: "audio",
    subcategory: "music",
    url: "https://suno.ai",
    icon: "🎼"
  },
  {
    id: "udio",
    name: "Udio",
    description: "AI音乐生成工具",
    category: "audio",
    subcategory: "music",
    url: "https://udio.com",
    icon: "🎹"
  },
  {
    id: "soundraw",
    name: "Soundraw",
    description: "AI音乐创作工具",
    category: "audio",
    subcategory: "music",
    url: "https://soundraw.io",
    icon: "🎶"
  },
  {
    id: "boomy",
    name: "Boomy",
    description: "AI音乐制作平台",
    category: "audio",
    subcategory: "music",
    url: "https://boomy.com",
    icon: "💿"
  },
  {
    id: "otter-ai",
    name: "Otter.ai",
    description: "AI会议记录和转录工具",
    category: "audio",
    subcategory: "transcription",
    url: "https://otter.ai",
    icon: "🦦"
  },
  {
    id: "whisper",
    name: "Whisper",
    description: "OpenAI的语音识别系统",
    category: "audio",
    subcategory: "transcription",
    url: "https://openai.com/whisper",
    icon: "👂"
  },
  {
    id: "rev-ai",
    name: "Rev AI",
    description: "专业的语音转文字服务",
    category: "audio",
    subcategory: "transcription",
    url: "https://rev.com",
    icon: "📝"
  },

  // AI办公 - 扩展
  {
    id: "copilot-office",
    name: "Microsoft Copilot",
    description: "微软Office套件的AI助手",
    category: "office",
    subcategory: "document",
    url: "https://copilot.microsoft.com",
    icon: "📄"
  },
  {
    id: "google-workspace-ai",
    name: "Google Workspace AI",
    description: "谷歌办公套件的AI功能",
    category: "office",
    subcategory: "document",
    url: "https://workspace.google.com",
    icon: "📊"
  },
  {
    id: "gamma",
    name: "Gamma",
    description: "AI驱动的演示文稿制作工具",
    category: "office",
    subcategory: "presentation",
    url: "https://gamma.app",
    icon: "📈"
  },
  {
    id: "tome",
    name: "Tome",
    description: "AI故事讲述和演示工具",
    category: "office",
    subcategory: "presentation",
    url: "https://tome.app",
    icon: "📚"
  },
  {
    id: "beautiful-ai-ppt",
    name: "Beautiful.ai",
    description: "智能PPT设计平台",
    category: "office",
    subcategory: "presentation",
    url: "https://beautiful.ai",
    icon: "🎨"
  },
  {
    id: "excel-ai",
    name: "Excel AI",
    description: "表格数据分析AI助手",
    category: "office",
    subcategory: "spreadsheet",
    url: "https://microsoft.com/excel",
    icon: "📋"
  },
  {
    id: "dataiku",
    name: "Dataiku",
    description: "AI数据科学平台",
    category: "office",
    subcategory: "spreadsheet",
    url: "https://dataiku.com",
    icon: "📊"
  },
  {
    id: "rows",
    name: "Rows",
    description: "新一代智能表格工具",
    category: "office",
    subcategory: "spreadsheet",
    url: "https://rows.com",
    icon: "📐"
  },
  {
    id: "otter-meetings",
    name: "Otter Meetings",
    description: "AI会议助手和记录工具",
    category: "office",
    subcategory: "meeting",
    url: "https://otter.ai",
    icon: "🤝"
  },
  {
    id: "fireflies",
    name: "Fireflies.ai",
    description: "AI会议笔记和分析工具",
    category: "office",
    subcategory: "meeting",
    url: "https://fireflies.ai",
    icon: "🪰"
  },
  {
    id: "krisp",
    name: "Krisp",
    description: "AI噪音消除会议工具",
    category: "office",
    subcategory: "meeting",
    url: "https://krisp.ai",
    icon: "🔇"
  },

  // AI翻译 - 扩展
  {
    id: "deepl",
    name: "DeepL",
    description: "世界上最准确的AI翻译器",
    category: "translate",
    subcategory: "text",
    url: "https://deepl.com",
    icon: "🌍"
  },
  {
    id: "google-translate",
    name: "Google Translate",
    description: "谷歌免费翻译服务",
    category: "translate",
    subcategory: "text",
    url: "https://translate.google.com",
    icon: "🌐"
  },
  {
    id: "baidu-translate",
    name: "百度翻译",
    description: "百度AI翻译平台",
    category: "translate",
    subcategory: "text",
    url: "https://fanyi.baidu.com",
    icon: "🇨🇳"
  },
  {
    id: "youdao",
    name: "有道翻译",
    description: "网易有道智能翻译",
    category: "translate",
    subcategory: "text",
    url: "https://fanyi.youdao.com",
    icon: "📖"
  },
  {
    id: "pdf-translator",
    name: "PDF Translator",
    description: "AI PDF文档翻译工具",
    category: "translate",
    subcategory: "document",
    url: "https://pdftranslator.ai",
    icon: "📄"
  },
  {
    id: "doc-translator",
    name: "Doc Translator",
    description: "文档翻译专业工具",
    category: "translate",
    subcategory: "document",
    url: "https://doctranslator.com",
    icon: "📝"
  },
  {
    id: "lingvanex",
    name: "Lingvanex",
    description: "多语言文档翻译平台",
    category: "translate",
    subcategory: "document",
    url: "https://lingvanex.com",
    icon: "🗂️"
  },
  {
    id: "live-translator",
    name: "Live Translator",
    description: "实时语音翻译工具",
    category: "translate",
    subcategory: "real-time",
    url: "https://livetranslator.com",
    icon: "🎙️"
  },
  {
    id: "microsoft-translator",
    name: "Microsoft Translator",
    description: "微软实时翻译服务",
    category: "translate",
    subcategory: "real-time",
    url: "https://translator.microsoft.com",
    icon: "🔄"
  },

  // AI开发 - 扩展
  {
    id: "github-copilot",
    name: "GitHub Copilot",
    description: "GitHub的AI编程助手",
    category: "development",
    subcategory: "code",
    url: "https://github.com/features/copilot",
    icon: "🐙"
  },
  {
    id: "cursor",
    name: "Cursor",
    description: "AI驱动的代码编辑器",
    category: "development",
    subcategory: "code",
    url: "https://cursor.sh",
    icon: "👨‍💻"
  },
  {
    id: "codeium",
    name: "Codeium",
    description: "免费的AI代码补全工具",
    category: "development",
    subcategory: "code",
    url: "https://codeium.com",
    icon: "⚡"
  },
  {
    id: "tabnine",
    name: "Tabnine",
    description: "AI代码助手，提升编程效率",
    category: "development",
    subcategory: "code",
    url: "https://tabnine.com",
    icon: "🔥"
  },
  {
    id: "amazon-codewhisperer",
    name: "Amazon CodeWhisperer",
    description: "亚马逊的AI编程助手",
    category: "development",
    subcategory: "code",
    url: "https://aws.amazon.com/codewhisperer",
    icon: "☁️"
  },
  {
    id: "replit-ai",
    name: "Replit AI",
    description: "在线编程平台的AI助手",
    category: "development",
    subcategory: "code",
    url: "https://replit.com",
    icon: "🚀"
  },
  {
    id: "aicommits",
    name: "AI Commits",
    description: "AI生成Git提交信息",
    category: "development",
    subcategory: "code",
    url: "https://github.com/nutlope/aicommits",
    icon: "📝"
  },
  {
    id: "debugger-ai",
    name: "Debugger AI",
    description: "AI辅助代码调试工具",
    category: "development",
    subcategory: "debug",
    url: "https://debugger.ai",
    icon: "🐛"
  },
  {
    id: "codex-debugger",
    name: "Codex Debugger",
    description: "智能代码错误检测",
    category: "development",
    subcategory: "debug",
    url: "https://codexdebugger.com",
    icon: "🔍"
  },
  {
    id: "bug-hunter",
    name: "Bug Hunter AI",
    description: "自动化Bug检测工具",
    category: "development",
    subcategory: "debug",
    url: "https://bughunter.ai",
    icon: "🎯"
  },
  {
    id: "code-reviewer",
    name: "Code Reviewer AI",
    description: "AI代码审查助手",
    category: "development",
    subcategory: "review",
    url: "https://codereviewer.ai",
    icon: "👀"
  },
  {
    id: "pullrequest-ai",
    name: "PullRequest AI",
    description: "智能代码审查平台",
    category: "development",
    subcategory: "review",
    url: "https://pullrequest.com",
    icon: "🔄"
  },
  {
    id: "sonarqube-ai",
    name: "SonarQube AI",
    description: "代码质量分析工具",
    category: "development",
    subcategory: "review",
    url: "https://sonarqube.org",
    icon: "📊"
  }
];

export const getToolsByCategory = (categoryId: string): AITool[] => {
  return aiTools.filter(tool => tool.category === categoryId);
};

export const getToolsBySubcategory = (categoryId: string, subcategoryId: string): AITool[] => {
  return aiTools.filter(tool => tool.category === categoryId && tool.subcategory === subcategoryId);
};

export const getFeaturedTools = (): AITool[] => {
  return aiTools.filter(tool => tool.featured);
};

export const searchTools = (query: string): AITool[] => {
  console.log('searchTools - input query:', query);
  const lowerQuery = query.toLowerCase();
  const results = aiTools.filter(tool => 
    tool.name.toLowerCase().includes(lowerQuery) ||
    tool.description.toLowerCase().includes(lowerQuery)
  );
  console.log('searchTools - results:', results.length);
  return results;
};

// 动态计算子分类数量
export const getSubcategoryCount = (categoryId: string, subcategoryId: string): number => {
  return aiTools.filter(tool => tool.category === categoryId && tool.subcategory === subcategoryId).length;
};

// 动态更新分类数据，计算实际的子分类数量
export const getCategoriesWithCounts = (): Category[] => {
  return categories.map(category => ({
    ...category,
    subCategories: category.subCategories?.map(subCategory => ({
      ...subCategory,
      count: getSubcategoryCount(category.id, subCategory.id)
    }))
  }));
}; 