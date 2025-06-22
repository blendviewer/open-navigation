"use client";

import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

interface PaginationWrapperProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showInfo?: boolean;
  totalItems?: number;
  itemsPerPage?: number;
}

export default function PaginationWrapper({
  currentPage,
  totalPages,
  onPageChange,
  showInfo = true,
  totalItems = 0,
  itemsPerPage = 12,
}: PaginationWrapperProps) {
  if (totalPages <= 1) return null;

  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 7; // 最多显示7个页码

    if (totalPages <= maxVisible) {
      // 如果总页数不超过最大显示数，显示所有页码
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 总是显示第一页
      pages.push(1);

      if (currentPage <= 4) {
        // 当前页在前面时
        for (let i = 2; i <= 5; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        // 当前页在后面时
        pages.push("ellipsis");
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // 当前页在中间时
        pages.push("ellipsis");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="space-y-6 relative">
      {/* 分页背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-purple-50/20 to-pink-50/30 dark:from-blue-950/20 dark:via-purple-950/10 dark:to-pink-950/20 rounded-2xl"></div>
        <div className="absolute top-0 left-10 w-16 h-16 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-0 right-10 w-12 h-12 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      
      {/* 分页信息 */}
      {showInfo && (
        <div className="relative flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-white/20 dark:border-gray-700/20 shadow-sm">
          <div className="flex items-center space-x-2">
            <span>显示第</span>
            <span className="px-2 py-1 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 text-blue-700 dark:text-blue-300 rounded-lg font-semibold border border-blue-100 dark:border-blue-800 shadow-sm">
              {startItem}
            </span>
            <span>到</span>
            <span className="px-2 py-1 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 text-blue-700 dark:text-blue-300 rounded-lg font-semibold border border-blue-100 dark:border-blue-800 shadow-sm">
              {endItem}
            </span>
            <span>项，共</span>
            <span className="px-2 py-1 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 text-purple-700 dark:text-purple-300 rounded-lg font-semibold border border-purple-100 dark:border-purple-800 shadow-sm">
              {totalItems}
            </span>
            <span>项</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>第</span>
            <span className="px-2 py-1 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 text-emerald-700 dark:text-emerald-300 rounded-lg font-semibold border border-emerald-100 dark:border-emerald-800 shadow-sm">
              {currentPage}
            </span>
            <span>页，共</span>
            <span className="px-2 py-1 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 text-emerald-700 dark:text-emerald-300 rounded-lg font-semibold border border-emerald-100 dark:border-emerald-800 shadow-sm">
              {totalPages}
            </span>
            <span>页</span>
          </div>
        </div>
      )}

      {/* 分页控件 */}
      <div className="relative">
        <Pagination className="justify-center">
          <PaginationContent className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-xl p-2 border border-white/30 dark:border-gray-700/30 shadow-lg">
            {/* 上一页按钮 */}
            <PaginationItem>
              <PaginationPrevious
                onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                className={cn(
                  "transition-all duration-200 backdrop-blur-sm border shadow-sm hover:shadow-md transform hover:scale-105",
                  currentPage <= 1
                    ? "pointer-events-none opacity-50 bg-gray-100/60 dark:bg-gray-700/60 border-gray-200/50 dark:border-gray-600/50"
                    : "cursor-pointer bg-white/80 dark:bg-gray-800/80 border-white/30 dark:border-gray-600/30 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 dark:hover:from-blue-950 dark:hover:to-cyan-950 hover:text-blue-700 dark:hover:text-blue-300"
                )}
              />
            </PaginationItem>

            {/* 页码 */}
            {pageNumbers.map((page, index) =>
              page === "ellipsis" ? (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis className="text-gray-400 dark:text-gray-500" />
                </PaginationItem>
              ) : (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => onPageChange(page as number)}
                    isActive={currentPage === page}
                    className={cn(
                      "transition-all duration-200 backdrop-blur-sm border shadow-sm hover:shadow-md transform hover:scale-110 font-semibold",
                      currentPage === page
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white border-blue-400 dark:border-purple-400 shadow-lg hover:from-blue-600 hover:to-purple-600"
                        : "cursor-pointer bg-white/80 dark:bg-gray-800/80 border-white/30 dark:border-gray-600/30 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-950 dark:hover:to-pink-950 hover:text-purple-700 dark:hover:text-purple-300"
                    )}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
            )}

            {/* 下一页按钮 */}
            <PaginationItem>
              <PaginationNext
                onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                className={cn(
                  "transition-all duration-200 backdrop-blur-sm border shadow-sm hover:shadow-md transform hover:scale-105",
                  currentPage >= totalPages
                    ? "pointer-events-none opacity-50 bg-gray-100/60 dark:bg-gray-700/60 border-gray-200/50 dark:border-gray-600/50"
                    : "cursor-pointer bg-white/80 dark:bg-gray-800/80 border-white/30 dark:border-gray-600/30 hover:bg-gradient-to-r hover:from-green-50 hover:to-teal-50 dark:hover:from-green-950 dark:hover:to-teal-950 hover:text-green-700 dark:hover:text-green-300"
                )}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {/* 快速跳转 */}
      {totalPages > 10 && (
        <div className="relative flex items-center justify-center space-x-3 text-sm bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-white/20 dark:border-gray-700/20 shadow-sm">
          <span className="text-gray-600 dark:text-gray-400 font-medium">跳转到第</span>
          <input
            type="number"
            min={1}
            max={totalPages}
            className="w-20 px-3 py-2 text-center border border-white/30 dark:border-gray-600/30 rounded-lg bg-white/80 dark:bg-gray-700/80 text-gray-900 dark:text-gray-100 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 shadow-sm font-semibold transition-all duration-200"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const page = parseInt((e.target as HTMLInputElement).value);
                if (page >= 1 && page <= totalPages) {
                  onPageChange(page);
                }
              }
            }}
          />
          <span className="text-gray-600 dark:text-gray-400 font-medium">页</span>
        </div>
      )}
    </div>
  );
} 