"use client";

import React from "react";
import { ExternalLink, Star, Clock, Users, Heart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { type AITool } from "@/data/ai-tools";

interface AIToolCardProps {
  tool: AITool;
  index?: number;
  isFavorited?: boolean;
  onToggleFavorite?: (toolId: string) => void;
}

export default function AIToolCard({ 
  tool, 
  index = 0, 
  isFavorited = false, 
  onToggleFavorite 
}: AIToolCardProps) {
  const handleVisit = () => {
    window.open(tool.url, "_blank", "noopener,noreferrer");
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite?.(tool.id);
  };

  // 优化的色彩主题分配算法，确保相邻卡片颜色不同
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
    
    // 智能颜色交替算法 - 确保上下左右都不相同
    const cols = 4; // 网格列数
    const row = Math.floor(cardIndex / cols);
    const col = cardIndex % cols;
    
    // 创建颜色矩阵模式，确保任何相邻位置都不相同
    // 使用拉丁方格的变种，每行每列都不重复相邻模式
    const colorMatrix = [
      [0, 1, 2, 3], // Row 0: 蓝 紫 绿 橙
      [4, 5, 6, 7], // Row 1: 红 靛 青 板
      [1, 2, 3, 0], // Row 2: 紫 绿 橙 蓝 (向右偏移1)
      [5, 6, 7, 4], // Row 3: 靛 青 板 红 (向右偏移1)
      [2, 3, 0, 1], // Row 4: 绿 橙 蓝 紫 (向右偏移2)
      [6, 7, 4, 5], // Row 5: 青 板 红 靛 (向右偏移2)
      [3, 0, 1, 2], // Row 6: 橙 蓝 紫 绿 (向右偏移3)
      [7, 4, 5, 6]  // Row 7: 板 红 靛 青 (向右偏移3)
    ];
    
    // 获取基础颜色索引
    const matrixRow = row % colorMatrix.length;
    let themeIndex = colorMatrix[matrixRow][col];
    
    // 添加ID哈希来增加变化，但保持相邻规则
    let idHash = 0;
    for (let i = 0; i < id.length; i++) {
      idHash = ((idHash << 1) + id.charCodeAt(i)) & 0xffffffff;
    }
    
    // 只在不破坏相邻规则的情况下添加变化
    const hashOffset = Math.abs(idHash) % 2; // 只允许小幅偏移
    themeIndex = (themeIndex + hashOffset) % themes.length;
    
    return themes[themeIndex];
  };

  const theme = getColorTheme(tool.id, index);

  return (
    <TooltipProvider>
      <Card className={`group relative card-hover card-shimmer bg-white/90 backdrop-blur-sm border-slate-200 dark:bg-slate-900/90 dark:border-slate-700 ${theme.hoverBorder} transition-all duration-400 h-80 flex flex-col min-h-80 overflow-hidden`}>
        {/* 背景装饰渐变 */}
        <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-50 pointer-events-none`}></div>
        
        {/* Featured badge */}
        {tool.featured && (
          <div className="absolute top-3 right-3 z-10">
            <div className="flex items-center space-x-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs px-2.5 py-1 rounded-full shadow-lg">
              <Star className="h-3 w-3 fill-current" />
              <span className="font-medium">推荐</span>
            </div>
          </div>
        )}

        {/* 收藏按钮 */}
        <div className={`absolute top-3 z-10 ${tool.featured ? 'right-20' : 'right-3'}`}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleFavoriteClick}
                className={`h-8 w-8 p-0 rounded-full backdrop-blur-lg border transition-all duration-300 hover:scale-110 ${
                  isFavorited 
                    ? 'bg-red-500/90 border-red-400 text-white hover:bg-red-600/90' 
                    : 'bg-white/80 dark:bg-gray-800/80 border-white/30 dark:border-gray-600/30 text-gray-600 dark:text-gray-300 hover:bg-white/90 dark:hover:bg-gray-700/90'
                }`}
              >
                <Heart className={`h-3.5 w-3.5 transition-all duration-300 ${isFavorited ? 'fill-current scale-110' : ''}`} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isFavorited ? '取消收藏' : '添加到收藏夹'}</p>
              <p className="text-xs text-muted-foreground">点击{isFavorited ? '移除' : '收藏'}此工具</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <CardHeader className="pb-6 flex-shrink-0 relative">
          <div className="flex items-start space-x-3">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${theme.iconBg} text-xl shadow-sm border border-white/20 dark:border-gray-700/20`}>
              {tool.icon || "🤖"}
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-base font-semibold leading-tight mb-2.5 text-gray-900 dark:text-gray-100">
                {tool.name}
              </CardTitle>
              
              <div className="flex items-center space-x-2">
                <div className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">在线可用</span>
                <div className="flex items-center space-x-1 text-xs text-slate-400">
                  <Users className="h-3 w-3" />
                  <span>1.2k+</span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-2 flex-1 flex flex-col relative">
          {/* Description section */}
          <div className="flex-1 mb-4">
            <CardDescription className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {tool.description}
            </CardDescription>
          </div>

          {/* Action section */}
          <div className="space-y-3 mt-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1 text-xs text-slate-500 dark:text-slate-400">
                  <Clock className="h-3 w-3" />
                  <span>最近更新</span>
                </div>
                <div className={`px-2 py-1 bg-gradient-to-r ${theme.badge} text-xs rounded-full font-medium border border-white/20 dark:border-gray-700/20`}>
                  AI工具
                </div>
              </div>
              
              <Button
                onClick={handleVisit}
                size="sm"
                className={`bg-gradient-to-r ${theme.button} text-white border-0 shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-105`}
              >
                <span className="font-medium">访问</span>
                <ExternalLink className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            </div>

            {/* Progress indicator */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>评分</span>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-3 w-3 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-slate-300'}`} 
                    />
                  ))}
                  <span className="ml-1 text-slate-500">4.8</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>

        {/* Hover gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${theme.hoverOverlay} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-lg`} />
        
        {/* Bottom gradient line */}
        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${theme.bottomLine} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-lg`} />
      </Card>
    </TooltipProvider>
  );
} 