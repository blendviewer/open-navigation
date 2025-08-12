'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, Tag, ExternalLink, BookOpen, Heart, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  newsArticles,
  getArticlesByCategory,
  searchArticles,
  type NewsArticle,
} from '@/data/news-articles';

interface NewsProps {
  articles?: NewsArticle[];
}

// 简单的Markdown渲染器
const MarkdownRenderer = ({ content }: { content: string }) => {
  const renderMarkdown = (text: string) => {
    return (
      text
        // 标题
        .replace(
          /^### (.*$)/gim,
          '<h3 class="text-lg font-bold text-gray-900 dark:text-gray-100 mt-4 mb-2">$1</h3>'
        )
        .replace(
          /^## (.*$)/gim,
          '<h2 class="text-xl font-bold text-gray-900 dark:text-gray-100 mt-6 mb-3">$1</h2>'
        )
        .replace(
          /^# (.*$)/gim,
          '<h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">$1</h1>'
        )
        // 粗体
        .replace(
          /\*\*(.*?)\*\*/g,
          '<strong class="font-bold text-gray-900 dark:text-gray-100">$1</strong>'
        )
        // 斜体
        .replace(/\*(.*?)\*/g, '<em class="italic text-gray-700 dark:text-gray-300">$1</em>')
        // 代码块
        .replace(
          /```([\s\S]*?)```/g,
          '<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto my-4"><code class="text-sm text-gray-800 dark:text-gray-200">$1</code></pre>'
        )
        // 行内代码
        .replace(
          /`(.*?)`/g,
          '<code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono text-gray-800 dark:text-gray-200">$1</code>'
        )
        // 链接
        .replace(
          /\[([^\]]+)\]\(([^)]+)\)/g,
          '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 hover:underline">$1</a>'
        )
        // 列表
        .replace(/^\* (.*$)/gim, '<li class="ml-4 text-gray-700 dark:text-gray-300">$1</li>')
        .replace(/^- (.*$)/gim, '<li class="ml-4 text-gray-700 dark:text-gray-300">$1</li>')
        // 段落
        .replace(/\n\n/g, '</p><p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">')
        .replace(
          /^(?!<[h|p|u|o|li|pre])(.*$)/gim,
          '<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">$1</p>'
        )
    );
  };

  return (
    <div
      className="prose prose-gray dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
    />
  );
};

export default function News({ articles = [] }: NewsProps) {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [searchQuery, setSearchQuery] = useState('');
  const [likedArticles, setLikedArticles] = useState<Set<string>>(new Set());

  const allArticles = articles.length > 0 ? articles : newsArticles;

  const categories = [
    '全部',
    ...Array.from(new Set(allArticles.map((article) => article.category))),
  ];

  const filteredArticles = useMemo(() => {
    let articles = allArticles;

    // 按分类过滤
    if (selectedCategory !== '全部') {
      articles = getArticlesByCategory(selectedCategory);
    }

    // 按搜索词过滤
    if (searchQuery.trim()) {
      articles = searchArticles(searchQuery);
    }

    return articles;
  }, [allArticles, selectedCategory, searchQuery]);

  const handleLike = (articleId: string) => {
    setLikedArticles((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(articleId)) {
        newSet.delete(articleId);
      } else {
        newSet.add(articleId);
      }
      return newSet;
    });
  };

  const handleShare = (article: NewsArticle) => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      });
    } else {
      // 复制链接到剪贴板
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 dark:from-gray-100 dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent mb-4">
            AI资讯中心
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            获取最新的AI技术动态、行业趋势和实用指南
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="搜索文章..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                  className="whitespace-nowrap"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredArticles.map((article, index) => (
            <Card
              key={article.id}
              className={cn(
                'group relative overflow-hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] cursor-pointer',
                article.featured && 'ring-2 ring-amber-500/50'
              )}
              onClick={() => setSelectedArticle(article)}
              style={{
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'both',
              }}
            >
              {/* Featured Badge */}
              {article.featured && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                    ⭐ 推荐
                  </Badge>
                </div>
              )}

              {/* Article Image */}
              {article.imageUrl && (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
              )}

              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {article.category}
                  </Badge>
                  {article.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <CardTitle className="text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                  {article.title}
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400 line-clamp-3">
                  {article.excerpt}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{article.publishDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(article.id);
                    }}
                    className={cn(
                      'text-gray-500 hover:text-red-500 transition-colors',
                      likedArticles.has(article.id) && 'text-red-500'
                    )}
                  >
                    <Heart
                      className={cn(
                        'h-4 w-4 mr-1',
                        likedArticles.has(article.id) && 'fill-current'
                      )}
                    />
                    {likedArticles.has(article.id) ? '已喜欢' : '喜欢'}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare(article);
                    }}
                    className="text-gray-500 hover:text-blue-500 transition-colors"
                  >
                    <Share2 className="h-4 w-4 mr-1" />
                    分享
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Article Detail Modal */}
        {selectedArticle && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedArticle(null)}
          >
            <div
              className="bg-white dark:bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                      <BookOpen className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        文章详情
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">阅读完整内容</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedArticle(null)}
                    className="w-8 h-8 p-0"
                  >
                    ✕
                  </Button>
                </div>
              </div>

              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                    {selectedArticle.title}
                  </h1>

                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{selectedArticle.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{selectedArticle.publishDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{selectedArticle.readTime}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-6">
                    <Badge variant="secondary">{selectedArticle.category}</Badge>
                    {selectedArticle.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <MarkdownRenderer content={selectedArticle.content} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              没有找到相关文章
            </h3>
            <p className="text-gray-500 dark:text-gray-400">尝试调整搜索条件或选择其他分类</p>
          </div>
        )}
      </div>
    </div>
  );
}
