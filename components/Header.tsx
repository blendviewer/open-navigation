"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, Menu, Sparkles, Heart, Clock, TrendingUp, Zap, Command, Star, Filter, SortAsc, Grid, List, Bookmark, History, Music2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import PopupMusicPlayer from "./PopupMusicPlayer";
import { cn } from "@/lib/utils";
import Weather from "./Weather";
import Calendar from "./Calendar";

interface HeaderProps {
  onSearch: (query: string) => void;
  onMenuToggle: () => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  onShowFavorites: () => void;
  onShowTrends: () => void;
}

export default function Header({ 
  onSearch, 
  onMenuToggle, 
  viewMode, 
  onViewModeChange,
  onShowFavorites,
  onShowTrends 
}: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMusicPlayerOpen, setIsMusicPlayerOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [quickAccess] = useState([
    { name: "Midjourney", category: "AI绘画", icon: "🎨" },
    { name: "GitHub Copilot", category: "AI开发", icon: "🐙" },
    { name: "Claude", category: "对话助手", icon: "🎭" },
    { name: "ElevenLabs", category: "语音合成", icon: "🔊" }
  ]);
  
  const searchRef = useRef<HTMLInputElement>(null);

  // 客户端挂载后初始化数据
  useEffect(() => {
    // 从本地存储加载收藏夹
    const savedFavorites = localStorage.getItem('ai-nav-favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Failed to parse favorites from localStorage:', error);
      }
    }

    // 从本地存储加载搜索历史
    const savedSearches = localStorage.getItem('ai-nav-recent-searches');
    if (savedSearches) {
      try {
        setRecentSearches(JSON.parse(savedSearches));
      } catch (error) {
        console.error('Failed to parse recent searches from localStorage:', error);
        setRecentSearches(["AI绘画", "ChatGPT", "代码生成", "语音合成", "图像编辑"]);
      }
    } else {
      setRecentSearches(["AI绘画", "ChatGPT", "代码生成", "语音合成", "图像编辑"]);
    }

    // 检测系统主题
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  // 保存收藏夹到本地存储
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ai-nav-favorites', JSON.stringify(favorites));
    }
  }, [favorites]);

  // 保存搜索历史到本地存储
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ai-nav-recent-searches', JSON.stringify(recentSearches));
    }
  }, [recentSearches]);

  // 键盘快捷键处理
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K 打开命令面板
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowCommandPalette(true);
      }
      // Escape 关闭命令面板和搜索建议
      if (e.key === 'Escape') {
        setShowCommandPalette(false);
        setIsSearchFocused(false);
        searchRef.current?.blur();
      }
      // Cmd/Ctrl + / 聚焦搜索框
      if ((e.metaKey || e.ctrlKey) && e.key === '/') {
        e.preventDefault();
        searchRef.current?.focus();
      }
      // Cmd/Ctrl + B 打开收藏夹
      if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
        e.preventDefault();
        onShowFavorites();
      }
      // Cmd/Ctrl + T 打开趋势分析
      if ((e.metaKey || e.ctrlKey) && e.key === 't') {
        e.preventDefault();
        onShowTrends();
      }
      // Cmd/Ctrl + D 切换主题
      if ((e.metaKey || e.ctrlKey) && e.key === 'd') {
        e.preventDefault();
        toggleTheme();
      }
      // Cmd/Ctrl + M 打开音乐播放器
      if ((e.metaKey || e.ctrlKey) && e.key === 'm') {
        e.preventDefault();
        setIsMusicPlayerOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onShowFavorites, onShowTrends]);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      console.log('Header - handleSearch:', query);
      setSearchQuery(query);
      onSearch(query);
      
      // 添加到搜索历史
      setRecentSearches(prev => {
        const newSearches = [query, ...prev.filter(s => s !== query)].slice(0, 5);
        return newSearches;
      });
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      handleSearch(searchQuery);
      setIsSearchFocused(false);
    }
  };

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
    
    // 保存主题偏好
    if (typeof window !== 'undefined') {
      localStorage.setItem('ai-nav-theme', newDarkMode ? 'dark' : 'light');
    }
  };

  const clearSearchHistory = () => {
    setRecentSearches([]);
  };

  const executeCommand = (command: string) => {
    setShowCommandPalette(false);
    
    switch (command) {
      case 'search':
        searchRef.current?.focus();
        break;
      case 'favorites':
        onShowFavorites();
        break;
      case 'trends':
        onShowTrends();
        break;
      case 'music':
        setIsMusicPlayerOpen(true);
        break;
      case 'theme':
        toggleTheme();
        break;
      case 'grid':
        onViewModeChange('grid');
        break;
      case 'list':
        onViewModeChange('list');
        break;
      default:
        console.log('未知命令:', command);
    }
  };

  const quickSearchSuggestions = [
    { text: "最新AI工具", icon: "✨", action: () => handleSearch("最新") },
    { text: "免费工具", icon: "🆓", action: () => handleSearch("免费") },
    { text: "开源项目", icon: "🔓", action: () => handleSearch("开源") },
    { text: "热门推荐", icon: "🔥", action: () => handleSearch("推荐") }
  ];

  const commandItems = [
    { 
      icon: "🔍", 
      title: "搜索工具", 
      desc: "查找AI工具", 
      shortcut: "⌘+/",
      command: "search"
    },
    { 
      icon: "⭐", 
      title: "查看收藏", 
      desc: "我的收藏夹", 
      shortcut: "⌘+B",
      command: "favorites"
    },
    { 
      icon: "📈", 
      title: "趋势分析", 
      desc: "热门工具趋势", 
      shortcut: "⌘+T",
      command: "trends"
    },
    { 
      icon: "🎵", 
      title: "背景音乐", 
      desc: "放松心情", 
      shortcut: "⌘+M",
      command: "music"
    },
    { 
      icon: "🌙", 
      title: "切换主题", 
      desc: `切换到${isDarkMode ? '浅色' : '深色'}模式`, 
      shortcut: "⌘+D",
      command: "theme"
    },
    { 
      icon: "⊞", 
      title: "网格视图", 
      desc: "切换到网格布局", 
      shortcut: "⌘+1",
      command: "grid"
    },
    { 
      icon: "☰", 
      title: "列表视图", 
      desc: "切换到列表布局", 
      shortcut: "⌘+2",
      command: "list"
    }
  ];

  return (
    <>
      <TooltipProvider>
        <header className="relative h-16 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm overflow-hidden">
          {/* 背景装饰 */}
          <div className="absolute inset-0 pointer-events-none">
            {/* 多层渐变背景 */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50/80 via-purple-50/60 to-pink-50/80 dark:from-blue-950/40 dark:via-purple-950/30 dark:to-pink-950/40"></div>
            
            {/* 装饰性背景元素 */}
            <div className="absolute top-0 left-20 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-2xl"></div>
            <div className="absolute top-0 right-32 w-24 h-24 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-xl"></div>
            <div className="absolute -top-8 left-1/2 w-20 h-20 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-lg"></div>
            
            {/* 海洋波浪动画 - 局部装饰 */}
            <div className="absolute left-0 top-0 w-32 h-16 opacity-20 dark:opacity-15 overflow-hidden">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 120 64" preserveAspectRatio="none">
                {/* 背景海面 */}
                <rect x="0" y="32" width="120" height="32" fill="url(#seaGradient)" opacity="0.3"/>
                
                {/* 动态波浪层 */}
                <path className="animate-wave-1" d="M0,32 Q30,20 60,32 T120,32 L120,64 L0,64 Z" fill="url(#waveGradient1)" opacity="0.6"/>
                <path className="animate-wave-2" d="M0,36 Q25,28 50,36 T100,36 L120,36 L120,64 L0,64 Z" fill="url(#waveGradient2)" opacity="0.4"/>
                <path className="animate-wave-3" d="M0,40 Q35,32 70,40 T120,40 L120,64 L0,64 Z" fill="url(#waveGradient3)" opacity="0.5"/>
                
                {/* 小船动画 */}
                <g className="animate-sail" transformOrigin="60 36">
                  {/* 船体 */}
                  <ellipse cx="60" cy="36" rx="8" ry="3" fill="#8B4513" opacity="0.8"/>
                  {/* 船帆 */}
                  <path d="M60,20 Q65,25 60,32 Q55,25 60,20" fill="#F0F8FF" opacity="0.9"/>
                  {/* 桅杆 */}
                  <line x1="60" y1="20" x2="60" y2="36" stroke="#654321" strokeWidth="0.5"/>
                  {/* 小人 */}
                  <circle cx="58" cy="34" r="1" fill="#FFB347" opacity="0.8"/>
                </g>
                
                {/* SVG渐变定义 */}
                <defs>
                  <linearGradient id="seaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#0ea5e9"/>
                    <stop offset="100%" stopColor="#1e40af"/>
                  </linearGradient>
                  <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.6"/>
                    <stop offset="100%" stopColor="#1e40af" stopOpacity="0.3"/>
                  </linearGradient>
                  <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5"/>
                    <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.2"/>
                  </linearGradient>
                  <linearGradient id="waveGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.4"/>
                    <stop offset="100%" stopColor="#2563eb" stopOpacity="0.1"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          <div className="relative h-full flex items-center px-4 md:px-6">
            <div className="flex items-center justify-between w-full">
              {/* 左侧 - Logo和导航 */}
              <div className="flex items-center space-x-6">
                {/* 菜单按钮 */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onMenuToggle}
                  className="p-2 hover:bg-white/80 dark:hover:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-600/30 transition-all duration-300 lg:hidden"
                >
                  <Menu className="h-5 w-5" />
                </Button>

                {/* Logo */}
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300">
                      <Sparkles className="h-6 w-6 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse"></div>
                  </div>
                  <div className="hidden sm:block">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-gray-100 dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
                      玲珑导航
                    </h1>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">发现最好的AI工具</p>
                  </div>
                </div>

                {/* 快速访问标签 */}
                <div className="hidden xl:flex items-center space-x-2">
                  {quickAccess.slice(0, 3).map((item, index) => (
                    <Tooltip key={index}>
                      <TooltipTrigger asChild>
                        <Badge 
                          variant="secondary" 
                          className="cursor-pointer hover:scale-105 transition-transform bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/30 dark:border-gray-600/30 hover:bg-white/80 dark:hover:bg-gray-700/80"
                          onClick={() => handleSearch(item.name)}
                        >
                          <span className="mr-1">{item.icon}</span>
                          {item.name}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent 
                        side="top" 
                        className="z-[100] bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 border-gray-800 dark:border-gray-200 shadow-2xl px-3 py-2 text-sm font-medium"
                        sideOffset={8}
                      >
                        <div className="text-center">
                          <p className="font-medium">搜索 {item.name}</p>
                          <p className="text-xs opacity-75 mt-0.5">{item.category}</p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </div>

              {/* 中间 - 搜索区域 */}
              <div className="flex-1 max-w-2xl mx-8 relative">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <div className={cn(
                    "relative transition-all duration-300",
                    isSearchFocused && "transform scale-105"
                  )}>
                    <Input
                      ref={searchRef}
                      type="text"
                      placeholder="搜索AI工具... (Ctrl+/ 或 ⌘+K)"
                      value={searchQuery}
                      onChange={(e) => {
                        const value = e.target.value;
                        setSearchQuery(value);
                        if (!value.trim()) {
                          onSearch(""); // 清空搜索时重置结果
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleSearchSubmit(e);
                        }
                      }}
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                      className="w-full pl-12 pr-20 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-white/30 dark:border-gray-600/30 rounded-2xl text-sm shadow-lg hover:shadow-xl focus:shadow-xl transition-all duration-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 dark:focus:border-blue-500"
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                      <Badge variant="outline" className="hidden sm:flex px-2 py-1 text-xs bg-gray-100/80 dark:bg-gray-700/80 border-gray-300/50 dark:border-gray-600/50">
                        <Command className="h-3 w-3 mr-1" />
                        K
                      </Badge>
                    </div>
                  </div>

                  {/* 搜索建议下拉 */}
                  {isSearchFocused && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-white/30 dark:border-gray-600/30 rounded-2xl shadow-2xl shadow-gray-900/20 dark:shadow-black/40 p-4 z-50 animate-in slide-in-from-top-2 duration-200">
                      {/* 快速搜索建议 */}
                      <div className="mb-4">
                        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 flex items-center">
                          <Zap className="h-3 w-3 mr-1" />
                          快速搜索
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                          {quickSearchSuggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                suggestion.action();
                                setIsSearchFocused(false);
                              }}
                              className="flex items-center space-x-2 px-3 py-2 text-sm bg-gray-50/80 dark:bg-gray-800/80 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 rounded-lg transition-colors"
                            >
                              <span>{suggestion.icon}</span>
                              <span>{suggestion.text}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* 搜索历史 */}
                      {recentSearches.length > 0 && (
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 flex items-center">
                              <History className="h-3 w-3 mr-1" />
                              最近搜索
                            </h3>
                            <button
                              onClick={clearSearchHistory}
                              className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                            >
                              清除
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {recentSearches.map((search, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="cursor-pointer hover:scale-105 transition-transform text-xs"
                                onClick={() => {
                                  handleSearch(search);
                                  setIsSearchFocused(false);
                                }}
                              >
                                {search}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </form>
              </div>

              {/* 右侧 - 功能按钮 */}
              <div className="flex items-center space-x-3">
                {/* 视图切换 */}
                <div className="hidden md:flex items-center bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-white/30 dark:border-gray-600/30 p-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={viewMode === 'grid' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => onViewModeChange('grid')}
                        className="h-8 w-8 p-0"
                      >
                        <Grid className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent 
                      side="top" 
                      className="z-[100] bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 border-gray-800 dark:border-gray-200 shadow-2xl px-3 py-2 text-sm font-medium"
                      sideOffset={8}
                    >
                      <div className="text-center">
                        <p className="font-medium">网格视图</p>
                        <p className="text-xs opacity-75 mt-0.5">(⌘+1)</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={viewMode === 'list' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => onViewModeChange('list')}
                        className="h-8 w-8 p-0"
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent 
                      side="top" 
                      className="z-[100] bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 border-gray-800 dark:border-gray-200 shadow-2xl px-3 py-2 text-sm font-medium"
                      sideOffset={8}
                    >
                      <div className="text-center">
                        <p className="font-medium">列表视图</p>
                        <p className="text-xs opacity-75 mt-0.5">(⌘+2)</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </div>

                {/* 快速功能按钮 */}
                <div className="flex items-center space-x-2">
                  <Calendar />
                  <Weather />
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-10 w-10 p-0 hover:bg-white/80 dark:hover:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-600/30 transition-all duration-300 hover:scale-110"
                        onClick={() => setShowCommandPalette(true)}
                      >
                        <Command className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent 
                      side="top" 
                      className="z-[100] bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 border-gray-800 dark:border-gray-200 shadow-2xl px-3 py-2 text-sm font-medium"
                      sideOffset={8}
                    >
                      <div className="text-center">
                        <p className="font-medium">命令面板</p>
                        <p className="text-xs opacity-75 mt-0.5">⌘+K</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-10 w-10 p-0 hover:bg-white/80 dark:hover:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-600/30 transition-all duration-300 hover:scale-110 relative"
                        onClick={onShowFavorites}
                      >
                        <Bookmark className="h-4 w-4" />
                        {favorites.length > 0 && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                            {favorites.length > 9 ? '9+' : favorites.length}
                          </div>
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent 
                      side="top" 
                      className="z-[100] bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 border-gray-800 dark:border-gray-200 shadow-2xl px-3 py-2 text-sm font-medium"
                      sideOffset={8}
                    >
                      <div className="text-center">
                        <p className="font-medium">收藏夹 ({favorites.length})</p>
                        <p className="text-xs opacity-75 mt-0.5">⌘+B</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-10 w-10 p-0 hover:bg-white/80 dark:hover:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-600/30 transition-all duration-300 hover:scale-110"
                        onClick={onShowTrends}
                      >
                        <TrendingUp className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent 
                      side="top" 
                      className="z-[100] bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 border-gray-800 dark:border-gray-200 shadow-2xl px-3 py-2 text-sm font-medium"
                      sideOffset={8}
                    >
                      <div className="text-center">
                        <p className="font-medium">趋势分析</p>
                        <p className="text-xs opacity-75 mt-0.5">⌘+T</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>

                  {/* 音乐播放器按钮 */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={cn(
                          "h-10 w-10 p-0 hover:bg-white/80 dark:hover:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-600/30 transition-all duration-300 hover:scale-110",
                          isMusicPlayerOpen && "bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-blue-400/30 dark:to-purple-400/30 border-blue-500/30 dark:border-blue-400/30"
                        )}
                        onClick={() => setIsMusicPlayerOpen(true)}
                      >
                        <div className="relative">
                          <Music2 className={cn(
                            "h-4 w-4 transition-transform duration-300",
                            isMusicPlayerOpen && "scale-110 text-blue-500 dark:text-blue-400"
                          )} />
                          {isMusicPlayerOpen && (
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" />
                          )}
                        </div>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent 
                      side="top" 
                      className="z-[100] bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 border-gray-800 dark:border-gray-200 shadow-2xl px-3 py-2 text-sm font-medium"
                      sideOffset={8}
                    >
                      <div className="text-center">
                        <p className="font-medium">背景音乐</p>
                        <p className="text-xs opacity-75 mt-0.5">⌘+M</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
        </header>
      </TooltipProvider>

      {/* 音乐播放器 */}
      <PopupMusicPlayer
        isOpen={isMusicPlayerOpen}
        onClose={() => setIsMusicPlayerOpen(false)}
        onReopen={() => setIsMusicPlayerOpen(true)}
      />

      {/* 命令面板 */}
      {showCommandPalette && (
        <div 
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/30 dark:bg-black/50 backdrop-blur-md animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowCommandPalette(false);
            }
          }}
        >
          <div 
            className={cn(
              "bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl",
              "shadow-2xl shadow-gray-900/25 dark:shadow-black/50",
              "border border-white/20 dark:border-gray-700/30",
              "w-full max-w-2xl mx-4 overflow-hidden",
              "animate-in slide-in-from-top-4 zoom-in-95 duration-300"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2.5 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 dark:from-blue-400/30 dark:via-purple-400/30 dark:to-pink-400/30 rounded-xl backdrop-blur-sm border border-white/20 dark:border-gray-700/30">
                  <Command className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                    命令面板
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">快速访问所有功能</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <Input
                    placeholder="搜索命令..."
                    className="w-full pl-9 bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 rounded-xl focus-visible:ring-blue-500/50 dark:focus-visible:ring-blue-400/50 focus-visible:border-blue-300 dark:focus-visible:border-blue-600"
                    autoFocus
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto pr-1 custom-scrollbar">
                  {commandItems.map((item, index) => (
                    <button
                      key={index}
                      className={cn(
                        "flex items-center space-x-3 p-3 text-left",
                        "bg-white/60 dark:bg-gray-800/60 hover:bg-gradient-to-br hover:from-blue-50/80 hover:via-purple-50/80 hover:to-pink-50/80",
                        "dark:hover:from-blue-900/40 dark:hover:via-purple-900/40 dark:hover:to-pink-900/40",
                        "rounded-xl transition-all duration-200",
                        "border border-white/20 dark:border-gray-600/30",
                        "hover:border-blue-200/50 dark:hover:border-blue-700/50",
                        "hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-900/5 dark:hover:shadow-blue-900/5",
                        "group"
                      )}
                      onClick={() => executeCommand(item.command)}
                    >
                      <span className="text-lg group-hover:scale-110 transition-transform duration-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">{item.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 dark:text-gray-100">{item.title}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</div>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "text-xs bg-gray-100/80 dark:bg-gray-700/80",
                          "group-hover:bg-gradient-to-r group-hover:from-blue-100 group-hover:to-purple-100",
                          "dark:group-hover:from-blue-900/60 dark:group-hover:to-purple-900/60",
                          "group-hover:border-blue-200/50 dark:group-hover:border-blue-700/50",
                          "transition-colors duration-200"
                        )}
                      >
                        {item.shortcut}
                      </Badge>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS样式 */}
      <style jsx>{`
        @keyframes wave-1 {
          0%, 100% { d: path('M0,32 Q30,20 60,32 T120,32 L120,64 L0,64 Z'); }
          50% { d: path('M0,28 Q30,16 60,28 T120,28 L120,64 L0,64 Z'); }
        }
        
        @keyframes wave-2 {
          0%, 100% { d: path('M0,36 Q25,28 50,36 T100,36 L120,36 L120,64 L0,64 Z'); }
          50% { d: path('M0,40 Q25,32 50,40 T100,40 L120,40 L120,64 L0,64 Z'); }
        }
        
        @keyframes wave-3 {
          0%, 100% { d: path('M0,40 Q35,32 70,40 T120,40 L120,64 L0,64 Z'); }
          50% { d: path('M0,36 Q35,28 70,36 T120,36 L120,64 L0,64 Z'); }
        }
        
        @keyframes sail {
          0% { transform: translateX(0) rotate(0deg) scaleY(1); }
          25% { transform: translateX(30px) rotate(1deg) scaleY(1.1); }
          50% { transform: translateX(60px) rotate(0deg) scaleY(1); }
          75% { transform: translateX(90px) rotate(-1deg) scaleY(0.9); }
          100% { transform: translateX(120px) rotate(0deg) scaleY(1); }
        }
        
        .animate-wave-1 {
          animation: wave-1 4s ease-in-out infinite;
        }
        
        .animate-wave-2 {
          animation: wave-2 3.5s ease-in-out infinite 0.5s;
        }
        
        .animate-wave-3 {
          animation: wave-3 4.5s ease-in-out infinite 1s;
        }
        
        .animate-sail {
          animation: sail 12s linear infinite;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(156, 163, 175, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(156, 163, 175, 0.7);
        }
      `}</style>
    </>
  );
} 