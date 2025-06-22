"use client";

import React from "react";
import AIToolCard from "./AIToolCard";
import PaginationWrapper from "./PaginationWrapper";
import { type AITool } from "@/data/ai-tools";

interface MainContentProps {
  tools: AITool[];
  title: string;
  subtitle?: string;
  loading?: boolean;
  viewMode?: 'grid' | 'list';
  favorites?: string[];
  onToggleFavorite?: (toolId: string) => void;
  // 分页相关
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  totalItems?: number;
  itemsPerPage?: number;
}

export default function MainContent({ 
  tools, 
  title, 
  subtitle, 
  loading,
  viewMode = 'grid',
  favorites = [],
  onToggleFavorite,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  totalItems = 0,
  itemsPerPage = 12
}: MainContentProps) {
  if (loading) {
    return (
      <div className="flex-1 h-full p-4 relative">
        {/* 背景装饰层 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-purple-50/40 to-pink-50/60 dark:from-blue-950/30 dark:via-purple-950/20 dark:to-pink-950/30"></div>
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-28 h-28 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="relative h-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl shadow-gray-900/10 dark:shadow-black/30 border border-white/20 dark:border-gray-700/30 overflow-y-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-gray-50/60 dark:from-gray-900/60 dark:via-transparent dark:to-gray-800/60 rounded-2xl pointer-events-none"></div>
          
          <div className="relative p-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="h-8 bg-gradient-to-r from-gray-200/80 via-blue-100/60 to-gray-200/80 dark:from-gray-700/80 dark:via-blue-900/60 dark:to-gray-700/80 rounded-lg animate-pulse w-48"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200/80 via-purple-100/60 to-gray-200/80 dark:from-gray-700/80 dark:via-purple-900/60 dark:to-gray-700/80 rounded w-64 animate-pulse"></div>
              </div>
              {/* 根据viewMode渲染不同的加载骨架 */}
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {Array.from({ length: 8 }).map((_, i) => {
                    const gradients = [
                      'from-blue-100/80 to-cyan-100/80 dark:from-blue-900/60 dark:to-cyan-900/60',
                      'from-purple-100/80 to-pink-100/80 dark:from-purple-900/60 dark:to-pink-900/60',
                      'from-emerald-100/80 to-teal-100/80 dark:from-emerald-900/60 dark:to-teal-900/60',
                      'from-orange-100/80 to-amber-100/80 dark:from-orange-900/60 dark:to-amber-900/60',
                      'from-rose-100/80 to-red-100/80 dark:from-rose-900/60 dark:to-red-900/60',
                      'from-indigo-100/80 to-violet-100/80 dark:from-indigo-900/60 dark:to-violet-900/60',
                      'from-cyan-100/80 to-sky-100/80 dark:from-cyan-900/60 dark:to-sky-900/60',
                      'from-slate-100/80 to-gray-100/80 dark:from-slate-900/60 dark:to-gray-900/60'
                    ];
                    
                    // 使用与实际卡片相同的颜色矩阵算法
                    const cols = 4;
                    const row = Math.floor(i / cols);
                    const col = i % cols;
                    
                    // 相同的颜色矩阵模式
                    const colorMatrix = [
                      [0, 1, 2, 3], // Row 0: 蓝 紫 绿 橙
                      [4, 5, 6, 7], // Row 1: 红 靛 青 板
                      [1, 2, 3, 0], // Row 2: 紫 绿 橙 蓝
                      [5, 6, 7, 4], // Row 3: 靛 青 板 红
                      [2, 3, 0, 1], // Row 4: 绿 橙 蓝 紫
                      [6, 7, 4, 5], // Row 5: 青 板 红 靛
                      [3, 0, 1, 2], // Row 6: 橙 蓝 紫 绿
                      [7, 4, 5, 6]  // Row 7: 板 红 靛 青
                    ];
                    
                    const matrixRow = row % colorMatrix.length;
                    const gradientIndex = colorMatrix[matrixRow][col];
                    
                    return (
                      <div 
                        key={i} 
                        className={`h-80 bg-gradient-to-br ${gradients[gradientIndex]} rounded-lg animate-pulse border border-white/20 dark:border-gray-700/20`}
                        style={{ animationDelay: `${i * 0.1}s` }}
                      ></div>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div 
                      key={i} 
                      className="h-32 bg-gradient-to-r from-gray-200/80 via-blue-100/60 to-gray-200/80 dark:from-gray-700/80 dark:via-blue-900/60 dark:to-gray-700/80 rounded-xl animate-pulse border border-white/20 dark:border-gray-700/20"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    ></div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 h-full p-4 relative">
      {/* 背景装饰层 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 主背景渐变 */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-purple-50/60 to-pink-50/80 dark:from-blue-950/40 dark:via-purple-950/30 dark:to-pink-950/40"></div>
        
        {/* 装饰圆点 */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-lg animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-br from-green-400/20 to-teal-400/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        
        {/* 网格背景 */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(99 102 241) 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}></div>
      </div>
      
      <div className="relative h-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl shadow-gray-900/10 dark:shadow-black/30 border border-white/20 dark:border-gray-700/30 transition-all duration-300 hover:shadow-2xl hover:shadow-gray-900/15 dark:hover:shadow-black/40 overflow-y-auto">
        {/* 内部装饰渐变 */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-gray-50/60 dark:from-gray-900/60 dark:via-transparent dark:to-gray-800/60 rounded-2xl pointer-events-none"></div>
        
        <div className="relative p-8">
        <div className="space-y-8">
        {/* Header */}
        <div className="space-y-3 pb-6 border-b border-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-gray-700">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-gray-100 dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
            {title}
          </h1>
          {subtitle && (
            <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">
              {subtitle}
            </p>
          )}
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 text-blue-700 dark:text-blue-300 rounded-full font-medium shadow-sm border border-blue-100 dark:border-blue-800">
              共 {totalItems || tools.length} 个工具
            </span>
            <span>•</span>
            <span>更新于 {new Date().toLocaleDateString('zh-CN')}</span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <span className={viewMode === 'grid' ? '⊞' : '☰'} />
              <span>{viewMode === 'grid' ? '网格视图' : '列表视图'}</span>
            </span>
          </div>
        </div>

        {/* Tools layout */}
        {tools.length > 0 ? (
          viewMode === 'grid' ? (
            // 网格布局
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start">
              {tools.map((tool, index) => (
                <div
                  key={tool.id}
                  className="animate-scale-in h-full group transform transition-all duration-300 hover:-translate-y-2"
                  style={{
                    animationDelay: `${index * 0.08}s`,
                    animationFillMode: "both"
                  }}
                >
                  <div className="relative">
                    {/* 悬停时的磁性吸附效果 */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-blue-500/20 via-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 rounded-xl blur-sm transition-opacity duration-500"></div>
                    <AIToolCard tool={tool} index={index} isFavorited={favorites.includes(tool.id)} onToggleFavorite={onToggleFavorite} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // 列表布局
            <div className="space-y-4">
              {tools.map((tool, index) => {
                // 使用与AIToolCard相同的色彩主题算法
                const getColorTheme = (id: string, cardIndex: number) => {
                  const themes = [
                    // 蓝色主题
                    {
                      gradient: "from-blue-500/10 to-cyan-500/10",
                      iconBg: "from-blue-50 to-cyan-100 dark:from-blue-950 dark:to-cyan-900",
                      hoverBorder: "hover:border-blue-300 dark:hover:border-blue-600",
                      hoverOverlay: "from-blue-500/5 via-transparent to-cyan-500/5",
                      bottomLine: "from-blue-500 to-cyan-500",
                      badge: "from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 text-blue-700 dark:text-blue-300",
                      button: "from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                    },
                    // 紫色主题
                    {
                      gradient: "from-purple-500/10 to-pink-500/10",
                      iconBg: "from-purple-50 to-pink-100 dark:from-purple-950 dark:to-pink-900",
                      hoverBorder: "hover:border-purple-300 dark:hover:border-purple-600",
                      hoverOverlay: "from-purple-500/5 via-transparent to-pink-500/5",
                      bottomLine: "from-purple-500 to-pink-500",
                      badge: "from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 text-purple-700 dark:text-purple-300",
                      button: "from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    },
                    // 绿色主题
                    {
                      gradient: "from-emerald-500/10 to-teal-500/10",
                      iconBg: "from-emerald-50 to-teal-100 dark:from-emerald-950 dark:to-teal-900",
                      hoverBorder: "hover:border-emerald-300 dark:hover:border-emerald-600",
                      hoverOverlay: "from-emerald-500/5 via-transparent to-teal-500/5",
                      bottomLine: "from-emerald-500 to-teal-500",
                      badge: "from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 text-emerald-700 dark:text-emerald-300",
                      button: "from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                    },
                    // 橙色主题
                    {
                      gradient: "from-orange-500/10 to-amber-500/10",
                      iconBg: "from-orange-50 to-amber-100 dark:from-orange-950 dark:to-amber-900",
                      hoverBorder: "hover:border-orange-300 dark:hover:border-orange-600",
                      hoverOverlay: "from-orange-500/5 via-transparent to-amber-500/5",
                      bottomLine: "from-orange-500 to-amber-500",
                      badge: "from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950 text-orange-700 dark:text-orange-300",
                      button: "from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700"
                    },
                    // 红色主题
                    {
                      gradient: "from-rose-500/10 to-red-500/10",
                      iconBg: "from-rose-50 to-red-100 dark:from-rose-950 dark:to-red-900",
                      hoverBorder: "hover:border-rose-300 dark:hover:border-rose-600",
                      hoverOverlay: "from-rose-500/5 via-transparent to-red-500/5",
                      bottomLine: "from-rose-500 to-red-500",
                      badge: "from-rose-50 to-red-50 dark:from-rose-950 dark:to-red-950 text-rose-700 dark:text-rose-300",
                      button: "from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700"
                    },
                    // 靛蓝主题
                    {
                      gradient: "from-indigo-500/10 to-violet-500/10",
                      iconBg: "from-indigo-50 to-violet-100 dark:from-indigo-950 dark:to-violet-900",
                      hoverBorder: "hover:border-indigo-300 dark:hover:border-indigo-600",
                      hoverOverlay: "from-indigo-500/5 via-transparent to-violet-500/5",
                      bottomLine: "from-indigo-500 to-violet-500",
                      badge: "from-indigo-50 to-violet-50 dark:from-indigo-950 dark:to-violet-950 text-indigo-700 dark:text-indigo-300",
                      button: "from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700"
                    },
                    // 青色主题
                    {
                      gradient: "from-cyan-500/10 to-sky-500/10",
                      iconBg: "from-cyan-50 to-sky-100 dark:from-cyan-950 dark:to-sky-900",
                      hoverBorder: "hover:border-cyan-300 dark:hover:border-cyan-600",
                      hoverOverlay: "from-cyan-500/5 via-transparent to-sky-500/5",
                      bottomLine: "from-cyan-500 to-sky-500",
                      badge: "from-cyan-50 to-sky-50 dark:from-cyan-950 dark:to-sky-950 text-cyan-700 dark:text-cyan-300",
                      button: "from-cyan-600 to-sky-600 hover:from-cyan-700 hover:to-sky-700"
                    },
                    // 石板色主题
                    {
                      gradient: "from-slate-500/10 to-gray-500/10",
                      iconBg: "from-slate-50 to-gray-100 dark:from-slate-950 dark:to-gray-900",
                      hoverBorder: "hover:border-slate-300 dark:hover:border-slate-600",
                      hoverOverlay: "from-slate-500/5 via-transparent to-gray-500/5",
                      bottomLine: "from-slate-500 to-gray-500",
                      badge: "from-slate-50 to-gray-50 dark:from-slate-950 dark:to-gray-950 text-slate-700 dark:text-slate-300",
                      button: "from-slate-600 to-gray-600 hover:from-slate-700 hover:to-gray-700"
                    }
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
                      animationFillMode: "both"
                    }}
                  >
                    <div className="relative">
                      {/* 悬停时的磁性吸附效果 */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-blue-500/20 via-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 rounded-xl blur-sm transition-opacity duration-500"></div>
                      
                      {/* 长条形卡片 - 使用与网格卡片相同的背景样式 */}
                      <div className={`relative bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg rounded-xl border border-slate-200 dark:border-slate-700 ${theme.hoverBorder} shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden card-shimmer`}>
                        {/* 背景装饰渐变 - 与网格布局一致 */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-50 pointer-events-none`}></div>
                        
                        {/* 特色标识 */}
                        {tool.featured && (
                          <div className="absolute top-4 right-4 z-10">
                            <div className="flex items-center space-x-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs px-2.5 py-1 rounded-full shadow-lg">
                              <span className="text-sm">⭐</span>
                              <span className="font-medium">推荐</span>
                            </div>
                          </div>
                        )}

                        <div className="p-6 relative">
                          <div className="flex items-center space-x-6">
                            {/* 图标区域 - 使用主题色彩 */}
                            <div className="flex-shrink-0">
                              <div className={`w-16 h-16 bg-gradient-to-br ${theme.iconBg} rounded-xl flex items-center justify-center border border-white/20 dark:border-gray-700/20 shadow-inner transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                                <span className="text-2xl">{tool.icon || '🤖'}</span>
                              </div>
                            </div>
                            
                            {/* 内容区域 */}
                            <div className="flex-1 min-w-0 space-y-3">
                              <div className="flex items-start justify-between">
                                <div className="space-y-2">
                                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
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
                                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${theme.badge} border border-white/20 dark:border-gray-700/20`}>
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
                                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">在线可用</span>
                                  </div>
                                </div>
                                
                                {/* 操作按钮组 */}
                                <div className="flex items-center space-x-3">
                                  {/* 收藏按钮 */}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onToggleFavorite?.(tool.id);
                                    }}
                                    className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 ${
                                      favorites.includes(tool.id)
                                        ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg hover:shadow-xl' 
                                        : 'bg-white/80 dark:bg-gray-700/80 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                                    }`}
                                  >
                                    <svg className={`h-4 w-4 mr-1 transition-all duration-300 ${favorites.includes(tool.id) ? 'fill-current scale-110' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                    <span>{favorites.includes(tool.id) ? '已收藏' : '收藏'}</span>
                                  </button>

                                  {/* 访问按钮 - 使用主题色彩 */}
                                  <a
                                    href={tool.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${theme.button} text-white text-sm font-medium rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105 group-hover:scale-105`}
                                  >
                                    <span>访问工具</span>
                                    <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* 悬停渐变覆盖层 - 与网格布局一致 */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${theme.hoverOverlay} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl`} />
                        
                        {/* 底部渐变线 - 与网格布局一致 */}
                        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${theme.bottomLine} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-xl`} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        ) : (
          <div className="flex flex-col items-center justify-center py-24 space-y-8 relative">
            {/* 背景装饰 */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30 dark:from-blue-950/20 dark:via-purple-950/10 dark:to-pink-950/20 rounded-2xl"></div>
            
            <div className="relative p-12 rounded-2xl bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-800/80 dark:to-gray-750/80 shadow-inner border border-white/20 dark:border-gray-700/20 backdrop-blur-sm">
              <div className="text-7xl opacity-60">🔍</div>
            </div>
            <div className="text-center space-y-3 relative">
              <div className="text-xl font-semibold bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-300 dark:to-gray-100 bg-clip-text text-transparent">
                暂无相关工具
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
                尝试搜索其他关键词或选择其他分类<br/>
                探索更多AI工具的可能性
              </div>
            </div>
          </div>
        )}

        {/* Pagination */}
        {onPageChange && tools.length > 0 && (
          <div className="pt-8 border-t border-gray-100 dark:border-gray-800">
            <div className="pt-8">
              <PaginationWrapper
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
              />
            </div>
          </div>
        )}
      </div>
      </div>
      </div>
    </div>
  );
} 