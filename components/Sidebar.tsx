"use client";

import React, { useState, useEffect } from "react";
import { categories, getCategoriesWithCounts, type Category, type SubCategory } from "@/data/ai-tools";
import { ChevronLeft, ChevronRight, ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface SidebarProps {
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export default function Sidebar({ selectedCategory, onCategoryChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);
  
  // 获取带有动态计算数量的分类数据
  const categoriesWithCounts = getCategoriesWithCounts();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && selectedCategory.includes('-')) {
      const [mainCategoryId] = selectedCategory.split('-');
      setExpandedCategories(prev => {
        const newSet = new Set(prev);
        newSet.add(mainCategoryId);
        return newSet;
      });
    }
  }, [selectedCategory, mounted]);

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const CategoryButton = ({ category }: { category: Category }) => {
    const isExpanded = expandedCategories.has(category.id);
    const hasSubCategories = category.subCategories && category.subCategories.length > 0;
    const isCategorySelected = selectedCategory === category.id || selectedCategory.startsWith(`${category.id}-`);

    // 为分类生成色彩主题
    const getCategoryTheme = (id: string) => {
      const themes = [
        { 
          bg: "from-blue-50/90 to-cyan-50/90 dark:from-blue-950/60 dark:to-cyan-950/60", 
          text: "text-blue-700 dark:text-blue-300", 
          border: "border-blue-200/60 dark:border-blue-700/60",
          hover: "hover:from-blue-100/90 hover:to-cyan-100/90 dark:hover:from-blue-900/60 dark:hover:to-cyan-900/60",
          glow: "shadow-blue-200/50 dark:shadow-blue-900/50"
        },
        { 
          bg: "from-purple-50/90 to-pink-50/90 dark:from-purple-950/60 dark:to-pink-950/60", 
          text: "text-purple-700 dark:text-purple-300", 
          border: "border-purple-200/60 dark:border-purple-700/60",
          hover: "hover:from-purple-100/90 hover:to-pink-100/90 dark:hover:from-purple-900/60 dark:hover:to-pink-900/60",
          glow: "shadow-purple-200/50 dark:shadow-purple-900/50"
        },
        { 
          bg: "from-emerald-50/90 to-teal-50/90 dark:from-emerald-950/60 dark:to-teal-950/60", 
          text: "text-emerald-700 dark:text-emerald-300", 
          border: "border-emerald-200/60 dark:border-emerald-700/60",
          hover: "hover:from-emerald-100/90 hover:to-teal-100/90 dark:hover:from-emerald-900/60 dark:hover:to-teal-900/60",
          glow: "shadow-emerald-200/50 dark:shadow-emerald-900/50"
        },
        { 
          bg: "from-orange-50/90 to-amber-50/90 dark:from-orange-950/60 dark:to-amber-950/60", 
          text: "text-orange-700 dark:text-orange-300", 
          border: "border-orange-200/60 dark:border-orange-700/60",
          hover: "hover:from-orange-100/90 hover:to-amber-100/90 dark:hover:from-orange-900/60 dark:hover:to-amber-900/60",
          glow: "shadow-orange-200/50 dark:shadow-orange-900/50"
        },
        { 
          bg: "from-rose-50/90 to-red-50/90 dark:from-rose-950/60 dark:to-red-950/60", 
          text: "text-rose-700 dark:text-rose-300", 
          border: "border-rose-200/60 dark:border-rose-700/60",
          hover: "hover:from-rose-100/90 hover:to-red-100/90 dark:hover:from-rose-900/60 dark:hover:to-red-900/60",
          glow: "shadow-rose-200/50 dark:shadow-rose-900/50"
        },
        { 
          bg: "from-indigo-50/90 to-violet-50/90 dark:from-indigo-950/60 dark:to-violet-950/60", 
          text: "text-indigo-700 dark:text-indigo-300", 
          border: "border-indigo-200/60 dark:border-indigo-700/60",
          hover: "hover:from-indigo-100/90 hover:to-violet-100/90 dark:hover:from-indigo-900/60 dark:hover:to-violet-900/60",
          glow: "shadow-indigo-200/50 dark:shadow-indigo-900/50"
        }
      ];
      let hash = 0;
      for (let i = 0; i < id.length; i++) {
        hash = ((hash << 5) - hash + id.charCodeAt(i)) & 0xffffffff;
      }
      return themes[Math.abs(hash) % themes.length];
    };

    const theme = getCategoryTheme(category.id);

    const categoryButton = (
      <button
        onClick={() => {
          onCategoryChange(category.id);
          if (hasSubCategories && !isCollapsed) {
            toggleCategory(category.id);
          }
        }}
        className={cn(
          "group relative flex items-center text-sm rounded-2xl transition-all duration-500 backdrop-blur-lg border shadow-sm overflow-hidden",
          isCollapsed 
            ? "w-12 h-12 justify-center mx-auto" 
            : "w-full justify-between px-5 py-2.5",
          isCategorySelected
            ? `bg-gradient-to-r ${theme.bg} ${theme.text} ${theme.border} shadow-lg ${theme.glow}`
            : `bg-white/70 dark:bg-gray-800/70 text-gray-700 dark:text-gray-300 border-white/30 dark:border-gray-600/40 hover:bg-white/90 dark:hover:bg-gray-700/90 hover:shadow-lg`
        )}
      >
        {/* 背景水彩效果 */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none",
          isCategorySelected ? theme.bg : "from-gray-50/50 via-white/30 to-gray-100/50 dark:from-gray-700/50 dark:via-gray-600/30 dark:to-gray-500/50"
        )}></div>
        
        {/* 边缘光晕效果 */}
        <div className={cn(
          "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none",
          isCategorySelected ? `shadow-lg ${theme.glow}` : "shadow-md shadow-gray-300/30 dark:shadow-gray-600/30"
        )}></div>

        {isCollapsed ? (
          <span className="relative text-xl transition-all duration-300 group-hover:brightness-110">{category.icon}</span>
        ) : (
          <div className="relative flex items-center space-x-3">
            <span className="text-xl flex-shrink-0 transition-all duration-300 group-hover:brightness-110">{category.icon}</span>
            <span className="font-semibold transition-colors duration-300">{category.name}</span>
          </div>
        )}
        
        {!isCollapsed && hasSubCategories && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleCategory(category.id);
            }}
            className="relative p-2 hover:bg-white/50 dark:hover:bg-gray-600/50 rounded-xl transition-all duration-300 hover:rotate-180"
          >
            <ChevronDown className={cn("h-4 w-4 transition-all duration-500", isExpanded && "rotate-180")} />
          </button>
        )}
      </button>
    );

    const mainButton = (
      <div className="w-full">
        {isCollapsed ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                {categoryButton}
              </TooltipTrigger>
              <TooltipContent side="right" className="ml-2 bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border border-white/30 dark:border-gray-600/30 shadow-xl">
                <p className="font-medium">{category.name}</p>
                {hasSubCategories && (
                  <div className="mt-1 space-y-1">
                    {category.subCategories!.slice(0, 3).map((sub) => (
                      <p key={sub.id} className="text-xs text-muted-foreground">
                        • {sub.name} ({sub.count})
                      </p>
                    ))}
                    {category.subCategories!.length > 3 && (
                      <p className="text-xs text-muted-foreground">
                        ...等{category.subCategories!.length}个分类
                      </p>
                    )}
                  </div>
                )}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          categoryButton
        )}

        {/* Sub categories */}
        {mounted && !isCollapsed && hasSubCategories && isExpanded && (
          <div className="mt-3 ml-8 space-y-2">
            {category.subCategories!.map((subCategory) => (
              <button
                key={subCategory.id}
                onClick={() => onCategoryChange(`${category.id}-${subCategory.id}`)}
                className={cn(
                  "group w-full flex items-center justify-between px-4 py-2 text-sm rounded-xl transition-all duration-400 backdrop-blur-lg border shadow-sm overflow-hidden",
                  selectedCategory === `${category.id}-${subCategory.id}`
                    ? `bg-gradient-to-r ${theme.bg} ${theme.text} ${theme.border} shadow-md ${theme.glow}`
                    : "bg-white/60 dark:bg-gray-800/60 text-gray-600 dark:text-gray-400 border-white/25 dark:border-gray-600/35 hover:bg-white/80 dark:hover:bg-gray-700/80 hover:shadow-md"
                )}
              >
                {/* 子分类背景水彩效果 */}
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-20 transition-opacity duration-400 pointer-events-none",
                  selectedCategory === `${category.id}-${subCategory.id}` ? theme.bg : "from-gray-50/50 to-gray-100/50 dark:from-gray-700/50 dark:to-gray-600/50"
                )}></div>
                
                <span className="relative font-medium transition-colors duration-300">{subCategory.name}</span>
                {subCategory.count !== undefined && subCategory.count > 0 && (
                  <span className="relative px-3 py-1.5 bg-gradient-to-r from-gray-100/90 to-gray-200/90 dark:from-gray-700/90 dark:to-gray-600/90 text-gray-600 dark:text-gray-300 rounded-full text-xs font-semibold shadow-sm backdrop-blur-sm border border-white/20 dark:border-gray-500/20">
                    {subCategory.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    );

    return mainButton;
  };

  if (!mounted) {
    return (
      <div className="h-full bg-gray-50 dark:bg-gray-950 p-4 flex">
        <aside className="w-64 h-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-2xl shadow-2xl shadow-gray-900/10 dark:shadow-black/30 border border-gray-200/50 dark:border-gray-700/50 flex flex-col hover:shadow-2xl hover:shadow-gray-900/15 dark:hover:shadow-black/40">
          <div className="p-4 flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">分类</h2>
            </div>
            <div className="space-y-1">
              {categoriesWithCounts.map((category) => (
                <div key={category.id} className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300">
                  <span className="text-lg">{category.icon}</span>
                  <span className="font-medium">{category.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Footer info */}
          <div className="p-4 mt-auto border-t border-gray-100 dark:border-gray-800">
            <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
              <div>共 {categoriesWithCounts.length} 个分类</div>
              <div>持续更新中...</div>
            </div>
          </div>
        </aside>
      </div>
    );
  }

  return (
    <div className="h-full bg-gray-50 dark:bg-gray-950 p-4 flex relative">
      {/* 侧边栏背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 水彩背景渐变 */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/60 via-purple-50/40 to-blue-50/60 dark:from-indigo-950/30 dark:via-purple-950/20 dark:to-blue-950/30"></div>
        
        {/* 装饰元素 */}
        <div className="absolute top-16 left-2 w-20 h-20 bg-gradient-to-br from-indigo-400/15 to-purple-400/15 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-32 right-2 w-16 h-16 bg-gradient-to-br from-purple-400/15 to-pink-400/15 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/2 left-1 w-12 h-12 bg-gradient-to-br from-blue-400/15 to-cyan-400/15 rounded-full blur-md animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>
      
      <aside className={cn(
        "relative h-full bg-white/85 dark:bg-gray-900/85 backdrop-blur-xl rounded-2xl shadow-2xl shadow-gray-900/10 dark:shadow-black/30 border border-white/30 dark:border-gray-700/30 transition-all duration-300 flex flex-col hover:shadow-2xl hover:shadow-gray-900/15 dark:hover:shadow-black/40 overflow-hidden",
        isCollapsed ? "w-16" : "w-64"
      )}>
        {/* 内部装饰渐变 */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-transparent to-indigo-50/50 dark:from-gray-900/70 dark:via-transparent dark:to-indigo-950/30 pointer-events-none"></div>
        
        {/* Header */}
        <div className={cn("relative border-b border-gray-200/40 dark:border-gray-700/40", isCollapsed ? "p-2" : "p-4")}>
          <div className={cn("flex items-center", isCollapsed ? "justify-center" : "justify-between")}>
            {!isCollapsed && (
              <h2 className="text-sm font-bold bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 dark:from-gray-100 dark:via-indigo-200 dark:to-purple-200 bg-clip-text text-transparent">分类导航</h2>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={cn(
                "group relative overflow-hidden backdrop-blur-lg border shadow-sm transition-all duration-300",
                isCollapsed ? "h-12 w-12 rounded-full" : "h-9 w-9 rounded-xl",
                "bg-white/70 dark:bg-gray-800/70 border-white/30 dark:border-gray-600/40 hover:bg-white/90 dark:hover:bg-gray-700/90 hover:shadow-md"
              )}
            >
              {/* 按钮背景水彩效果 */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-purple-50/30 to-blue-50/50 dark:from-indigo-950/30 dark:via-purple-950/20 dark:to-blue-950/30 opacity-0 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none"></div>
              
              <div className="relative flex items-center justify-center h-full">
                {isCollapsed ? <ChevronRight className="h-4 w-4 transition-transform duration-300" /> : <ChevronLeft className="h-4 w-4 transition-transform duration-300" />}
              </div>
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className={cn("relative space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent", isCollapsed ? "p-2" : "p-4")}>
          {categoriesWithCounts.map((category, index) => (
            <div
              key={category.id}
              className="animate-scale-in"
              style={{
                animationDelay: `${index * 0.1}s`,
                animationFillMode: "both"
              }}
            >
              <CategoryButton category={category} />
            </div>
          ))}
        </div>

        {/* Footer info */}
        {!isCollapsed && (
          <div className="relative p-4 mt-auto border-t border-gray-200/40 dark:border-gray-700/40">
            <div className="text-xs text-gray-500 dark:text-gray-400 space-y-2 bg-gradient-to-r from-indigo-50/70 to-purple-50/70 dark:from-indigo-950/40 dark:to-purple-950/40 p-4 rounded-xl border border-white/25 dark:border-gray-700/25 backdrop-blur-lg shadow-sm">
              <div className="font-medium flex items-center space-x-2">
                <span className="text-sm">🎨</span>
                <span>共 {categoriesWithCounts.length} 个分类</span>
              </div>
              <div className="text-indigo-600 dark:text-indigo-400 font-medium flex items-center space-x-2">
                <span className="text-sm">✨</span>
                <span>持续更新中...</span>
              </div>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
} 