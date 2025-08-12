'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import MainContent from '@/components/MainContent';
import News from '@/components/News';
import {
  aiTools,
  getToolsByCategory,
  getToolsBySubcategory,
  getFeaturedTools,
  searchTools,
  categories,
  getCategoriesWithCounts,
} from '@/data/ai-tools';
import AIToolCard from '@/components/AIToolCard';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('common');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFavoritesModal, setShowFavoritesModal] = useState(false);
  const [showTrendsModal, setShowTrendsModal] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);

  // 在客户端挂载后加载localStorage数据
  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem('ai-nav-favorites');
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to parse favorites from localStorage:', error);
      }
    }
  }, []);

  // Get all tools based on category/search without pagination
  const allTools = useMemo(() => {
    console.log('HomePage - allTools memo:', { searchQuery, selectedCategory });
    if (searchQuery.trim()) {
      const results = searchTools(searchQuery);
      console.log('HomePage - search results:', results.length);
      return results;
    }

    // Handle subcategory selection
    if (selectedCategory.includes('-')) {
      const [mainCategoryId, subCategoryId] = selectedCategory.split('-');
      return getToolsBySubcategory(mainCategoryId, subCategoryId);
    }

    return getToolsByCategory(selectedCategory);
  }, [selectedCategory, searchQuery]);

  // Calculate pagination
  const totalItems = allTools.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Get current page tools
  const currentTools = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return allTools.slice(startIndex, endIndex);
  }, [allTools, currentPage, itemsPerPage]);

  // Get current title and subtitle
  const { title, subtitle } = useMemo(() => {
    if (searchQuery.trim()) {
      return {
        title: `搜索结果: "${searchQuery}"`,
        subtitle: `为您找到 ${totalItems} 个相关AI工具`,
      };
    }

    // Handle subcategory title
    if (selectedCategory.includes('-')) {
      const [mainCategoryId, subCategoryId] = selectedCategory.split('-');
      const category = categories.find((cat) => cat.id === mainCategoryId);
      const subCategory = category?.subCategories?.find((sub) => sub.id === subCategoryId);

      return {
        title: subCategory?.name || '工具分类',
        subtitle: `${category?.name} > ${subCategory?.name} 分类下的AI工具`,
      };
    }

    if (selectedCategory === '全部') {
      return {
        title: '全部工具',
        subtitle: '探索所有优质AI工具',
      };
    }

    const category = categories.find((cat) => cat.id === selectedCategory);
    return {
      title: category?.name || '全部工具',
      subtitle: category ? `探索 ${category.name} 分类下的优质AI工具` : '探索所有优质AI工具',
    };
  }, [selectedCategory, searchQuery, totalItems]);

  const handleSearch = (query: string) => {
    console.log('HomePage - handleSearch:', query);
    setSearchQuery(query);
    setSelectedCategory('common'); // 搜索时重置为常用工具分类
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleTabChange = (tab: string) => {
    // Keep for compatibility, but no longer used
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSearchQuery('');
    setCurrentPage(1); // Reset to first page when changing category
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when changing page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 切换侧边栏
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // 处理收藏
  const handleToggleFavorite = (toolId: string) => {
    setFavorites((prev) => {
      const newFavorites = prev.includes(toolId)
        ? prev.filter((id) => id !== toolId)
        : [...prev, toolId];

      // 保存到本地存储
      if (typeof window !== 'undefined') {
        localStorage.setItem('ai-nav-favorites', JSON.stringify(newFavorites));
      }

      return newFavorites;
    });
  };

  // 显示收藏夹
  const handleShowFavorites = () => {
    setShowFavoritesModal(true);
  };

  // 显示趋势分析
  const handleShowTrends = () => {
    setShowTrendsModal(true);
  };

  // 过滤工具
  const filteredTools = aiTools.filter((tool) => {
    const matchesSearch =
      searchQuery === '' ||
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === '全部' || tool.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // 获取收藏的工具
  const favoriteTools = aiTools.filter((tool) => favorites.includes(tool.id));

  // 检查是否为资讯分类
  const isNewsCategory = selectedCategory === 'news';

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-950">
      <Header
        onSearch={handleSearch}
        onMenuToggle={toggleSidebar}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onShowFavorites={handleShowFavorites}
        onShowTrends={handleShowTrends}
      />

      <div className="flex flex-1 overflow-hidden bg-gray-50 dark:bg-gray-950">
        <Sidebar selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />

        {isNewsCategory ? (
          <div className="flex-1 overflow-hidden">
            <News />
          </div>
        ) : (
          <MainContent
            tools={currentTools}
            title={title}
            subtitle={subtitle}
            viewMode={viewMode}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
          />
        )}
      </div>

      {/* 收藏夹模态框 */}
      {showFavoritesModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowFavoritesModal(false);
            }
          }}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-2xl max-w-5xl w-full max-h-[85vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-lg">⭐</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                      我的收藏夹
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      已收藏 {favorites.length} 个工具
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowFavoritesModal(false)}
                  className="w-8 h-8 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="px-6 pt-6 pb-0 overflow-y-auto max-h-[calc(85vh-120px)]">
              {!isClient ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-500 dark:text-gray-400">加载收藏夹...</p>
                  </div>
                </div>
              ) : favoriteTools.length > 0 ? (
                <div className="space-y-6">
                  {/* 简化的标题区域 */}
                  {/* 收藏夹列表显示 - 优化滚动效果 */}
                  <div className="space-y-3 mb-6">
                    {favoriteTools.map((tool, index) => {
                      // 使用与AIToolCard相同的色彩主题算法
                      const getColorTheme = (id: string, cardIndex: number) => {
                        const themes = [
                          // 蓝色主题
                          {
                            gradient: 'from-blue-500/10 to-cyan-500/10',
                            iconBg: 'from-blue-50 to-cyan-100 dark:from-blue-950 dark:to-cyan-900',
                            hoverBorder: 'hover:border-blue-300 dark:hover:border-blue-600',
                            hoverOverlay: 'from-blue-500/5 via-transparent to-cyan-500/5',
                            bottomLine: 'from-blue-500 to-cyan-500',
                            badge:
                              'from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 text-blue-700 dark:text-blue-300',
                            button:
                              'from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700',
                          },
                          // 紫色主题
                          {
                            gradient: 'from-purple-500/10 to-pink-500/10',
                            iconBg:
                              'from-purple-50 to-pink-100 dark:from-purple-950 dark:to-pink-900',
                            hoverBorder: 'hover:border-purple-300 dark:hover:border-purple-600',
                            hoverOverlay: 'from-purple-500/5 via-transparent to-pink-500/5',
                            bottomLine: 'from-purple-500 to-pink-500',
                            badge:
                              'from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 text-purple-700 dark:text-purple-300',
                            button:
                              'from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700',
                          },
                          // 绿色主题
                          {
                            gradient: 'from-emerald-500/10 to-teal-500/10',
                            iconBg:
                              'from-emerald-50 to-teal-100 dark:from-emerald-950 dark:to-teal-900',
                            hoverBorder: 'hover:border-emerald-300 dark:hover:border-emerald-600',
                            hoverOverlay: 'from-emerald-500/5 via-transparent to-teal-500/5',
                            bottomLine: 'from-emerald-500 to-teal-500',
                            badge:
                              'from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 text-emerald-700 dark:text-emerald-300',
                            button:
                              'from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700',
                          },
                          // 橙色主题
                          {
                            gradient: 'from-orange-500/10 to-amber-500/10',
                            iconBg:
                              'from-orange-50 to-amber-100 dark:from-orange-950 dark:to-amber-900',
                            hoverBorder: 'hover:border-orange-300 dark:hover:border-orange-600',
                            hoverOverlay: 'from-orange-500/5 via-transparent to-amber-500/5',
                            bottomLine: 'from-orange-500 to-amber-500',
                            badge:
                              'from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950 text-orange-700 dark:text-orange-300',
                            button:
                              'from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700',
                          },
                          // 红色主题
                          {
                            gradient: 'from-rose-500/10 to-red-500/10',
                            iconBg: 'from-rose-50 to-red-100 dark:from-rose-950 dark:to-red-900',
                            hoverBorder: 'hover:border-rose-300 dark:hover:border-rose-600',
                            hoverOverlay: 'from-rose-500/5 via-transparent to-red-500/5',
                            bottomLine: 'from-rose-500 to-red-500',
                            badge:
                              'from-rose-50 to-red-50 dark:from-rose-950 dark:to-red-950 text-rose-700 dark:text-rose-300',
                            button: 'from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700',
                          },
                          // 靛蓝主题
                          {
                            gradient: 'from-indigo-500/10 to-violet-500/10',
                            iconBg:
                              'from-indigo-50 to-violet-100 dark:from-indigo-950 dark:to-violet-900',
                            hoverBorder: 'hover:border-indigo-300 dark:hover:border-indigo-600',
                            hoverOverlay: 'from-indigo-500/5 via-transparent to-violet-500/5',
                            bottomLine: 'from-indigo-500 to-violet-500',
                            badge:
                              'from-indigo-50 to-violet-50 dark:from-indigo-950 dark:to-violet-950 text-indigo-700 dark:text-indigo-300',
                            button:
                              'from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700',
                          },
                          // 青色主题
                          {
                            gradient: 'from-cyan-500/10 to-sky-500/10',
                            iconBg: 'from-cyan-50 to-sky-100 dark:from-cyan-950 dark:to-sky-900',
                            hoverBorder: 'hover:border-cyan-300 dark:hover:border-cyan-600',
                            hoverOverlay: 'from-cyan-500/5 via-transparent to-sky-500/5',
                            bottomLine: 'from-cyan-500 to-sky-500',
                            badge:
                              'from-cyan-50 to-sky-50 dark:from-cyan-950 dark:to-sky-950 text-cyan-700 dark:text-cyan-300',
                            button: 'from-cyan-600 to-sky-600 hover:from-cyan-700 hover:to-sky-700',
                          },
                          // 石板色主题
                          {
                            gradient: 'from-slate-500/10 to-gray-500/10',
                            iconBg:
                              'from-slate-50 to-gray-100 dark:from-slate-950 dark:to-gray-900',
                            hoverBorder: 'hover:border-slate-300 dark:hover:border-slate-600',
                            hoverOverlay: 'from-slate-500/5 via-transparent to-gray-500/5',
                            bottomLine: 'from-slate-500 to-gray-500',
                            badge:
                              'from-slate-50 to-gray-50 dark:from-slate-950 dark:to-gray-950 text-slate-700 dark:text-slate-300',
                            button:
                              'from-slate-600 to-gray-600 hover:from-slate-700 hover:to-gray-700',
                          },
                        ];

                        // 智能颜色交替算法
                        const cols = 1; // 列表布局每行只有1列
                        const row = cardIndex;

                        // 为列表布局使用简化的颜色循环
                        let themeIndex = row % themes.length;

                        // 添加ID哈希来增加变化
                        let idHash = 0;
                        for (let i = 0; i < id.length; i++) {
                          idHash = ((idHash << 1) + id.charCodeAt(i)) & 0xffffffff;
                        }

                        const hashOffset = Math.abs(idHash) % 3; // 小幅偏移
                        themeIndex = (themeIndex + hashOffset) % themes.length;

                        return themes[themeIndex];
                      };

                      const theme = getColorTheme(tool.id, index);

                      return (
                        <div
                          key={tool.id}
                          className="animate-slide-in group transform transition-all duration-300 hover:scale-[1.02]"
                          style={{
                            animationDelay: `${index * 0.05}s`,
                            animationFillMode: 'both',
                          }}
                        >
                          <div className="relative">
                            {/* 悬停时的磁性吸附效果 */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-blue-500/20 via-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 rounded-xl blur-sm transition-opacity duration-500"></div>

                            {/* 收藏夹专用列表布局 */}
                            <div
                              className={`relative bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg rounded-xl border border-slate-200 dark:border-slate-700 ${theme.hoverBorder} shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden card-shimmer`}
                            >
                              {/* 背景装饰渐变 */}
                              <div
                                className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-60 pointer-events-none`}
                              ></div>

                              {/* 特色标识 */}
                              {tool.featured && (
                                <div className="absolute top-3 right-3 z-10">
                                  <div className="flex items-center space-x-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs px-2 py-1 rounded-full shadow-lg">
                                    <span className="text-xs">⭐</span>
                                    <span className="font-medium">推荐</span>
                                  </div>
                                </div>
                              )}

                              <div className="p-4 relative">
                                <div className="flex items-center space-x-4">
                                  {/* 图标区域 - 使用主题色彩 */}
                                  <div className="flex-shrink-0">
                                    <div
                                      className={`w-14 h-14 bg-gradient-to-br ${theme.iconBg} rounded-xl flex items-center justify-center border border-white/20 dark:border-gray-700/20 shadow-inner transition-all duration-300 group-hover:scale-105 group-hover:rotate-2`}
                                    >
                                      <span className="text-xl">{tool.icon || '🤖'}</span>
                                    </div>
                                  </div>

                                  {/* 内容区域 */}
                                  <div className="flex-1 min-w-0 space-y-2">
                                    <div className="flex items-start justify-between">
                                      <div className="space-y-1 flex-1">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                          {tool.name}
                                        </h3>
                                        <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                                          {tool.description}
                                        </p>
                                      </div>
                                    </div>

                                    {/* 底部信息 */}
                                    <div className="flex items-center justify-between pt-2">
                                      <div className="flex items-center space-x-3">
                                        <span
                                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${theme.badge} border border-white/20 dark:border-gray-700/20`}
                                        >
                                          {tool.category}
                                        </span>
                                        {tool.subcategory && (
                                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-950/50 text-purple-700 dark:text-purple-300 border border-purple-200/50 dark:border-purple-700/50">
                                            {tool.subcategory}
                                          </span>
                                        )}

                                        {/* 状态指示器 */}
                                        <div className="flex items-center space-x-2">
                                          <div className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                                          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                                            在线可用
                                          </span>
                                        </div>
                                      </div>

                                      {/* 操作按钮组 */}
                                      <div className="flex items-center space-x-2">
                                        {/* 收藏按钮 */}
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleToggleFavorite(tool.id);
                                          }}
                                          className="inline-flex items-center px-3 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-medium rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105"
                                        >
                                          <svg
                                            className="h-3.5 w-3.5 mr-1.5 fill-current"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                          >
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth={2}
                                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                            />
                                          </svg>
                                          <span>已收藏</span>
                                        </button>

                                        {/* 访问按钮 - 使用主题色彩 */}
                                        <a
                                          href={tool.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${theme.button} text-white text-sm font-medium rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105 group-hover:scale-105`}
                                        >
                                          <span>访问工具</span>
                                          <svg
                                            className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                          >
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth={2}
                                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                            />
                                          </svg>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* 悬停渐变覆盖层 */}
                              <div
                                className={`absolute inset-0 bg-gradient-to-br ${theme.hoverOverlay} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl`}
                              />

                              {/* 底部渐变线 */}
                              <div
                                className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${theme.bottomLine} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-xl`}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📋</span>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                    还没有收藏任何工具
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    浏览工具页面，点击❤️按钮来收藏你喜欢的工具
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 趋势分析模态框 */}
      {showTrendsModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowTrendsModal(false);
            }
          }}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-2xl max-w-6xl w-full max-h-[80vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-lg">📈</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">趋势分析</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">AI工具热度与趋势数据</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowTrendsModal(false)}
                  className="w-8 h-8 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {/* 热门分类 */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-xl p-6 border border-blue-200/30 dark:border-blue-700/30">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                    🔥 热门分类
                  </h3>
                  <div className="space-y-3">
                    {['AI绘画', 'AI写作', '代码助手', '语音合成', '图像处理'].map(
                      (category, index) => (
                        <div key={category} className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {category}
                          </span>
                          <div className="flex items-center space-x-2">
                            <div className="w-12 h-2 bg-blue-200 dark:bg-blue-800 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                                style={{ width: `${90 - index * 15}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {90 - index * 15}%
                            </span>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* 新增工具 */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl p-6 border border-green-200/30 dark:border-green-700/30">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                    ✨ 本周新增
                  </h3>
                  <div className="space-y-3">
                    {aiTools.slice(0, 5).map((tool, index) => (
                      <div key={tool.id} className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center shadow-sm">
                          <span className="text-sm">{tool.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                            {tool.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {tool.category}
                          </p>
                        </div>
                        <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full">
                          新
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 用户活跃度 */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-xl p-6 border border-purple-200/30 dark:border-purple-700/30">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                    👥 用户活跃度
                  </h3>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                        1,234
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">今日访问</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                          89
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">新用户</div>
                      </div>
                      <div>
                        <div className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                          156
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">活跃用户</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 详细统计图表区域 */}
              <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  📊 访问趋势
                </h3>
                <div className="h-64 flex items-end space-x-2">
                  {Array.from({ length: 30 }, (_, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t opacity-70 hover:opacity-100 transition-opacity"
                      style={{ height: `${Math.random() * 80 + 20}%` }}
                    ></div>
                  ))}
                </div>
                <div className="mt-4 flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>30天前</span>
                  <span>15天前</span>
                  <span>今天</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
