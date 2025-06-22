"use client";

import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Lunar } from "lunar-typescript";
import { DayProps } from "react-day-picker";

type SolarFestivalType = {
  [key: string]: string;
};

const WEEKDAYS = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
const SOLAR_FESTIVALS: SolarFestivalType = {
  '0101': '元旦',
  '0214': '情人节',
  '0308': '妇女节',
  '0312': '植树节',
  '0401': '愚人节',
  '0501': '劳动节',
  '0504': '青年节',
  '0601': '儿童节',
  '0701': '建党节',
  '0801': '建军节',
  '0910': '教师节',
  '1001': '国庆节',
  '1224': '平安夜',
  '1225': '圣诞节'
};

function DayCell({ day, ...props }: DayProps) {
  if (!day) {
    return <div {...props} />;
  }

  const lunar = Lunar.fromDate(day.date);
  const dateKey = format(day.date, 'MMdd');
  const solarFest = SOLAR_FESTIVALS[dateKey];
  const lunarFest = lunar.getFestivals();
  const showFestival = solarFest || lunarFest.length > 0;
  const isFirstDay = lunar.getDay() === 1;

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center" {...props}>
      <div className="text-sm">{format(day.date, 'd')}</div>
      {isFirstDay && (
        <div className="text-[8px] text-gray-500 dark:text-gray-400">
          {lunar.getMonthInChinese()}月
        </div>
      )}
      {showFestival && (
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
          <div className="w-1 h-1 bg-red-500 rounded-full"></div>
        </div>
      )}
    </div>
  );
}

export default function CalendarComponent() {
  const today = new Date();
  const weekday = WEEKDAYS[today.getDay()];
  const formattedDate = format(today, "M月d日", { locale: zhCN });
  
  const lunar = Lunar.fromDate(today);
  const lunarDate = `${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}`;
  const solarFestival = SOLAR_FESTIVALS[format(today, 'MMdd')] || '';
  const lunarFestival = lunar.getFestivals().join(' ');
  const festival = solarFestival || lunarFestival;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-10 px-3 hover:bg-white/80 dark:hover:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-600/30 transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center space-x-2">
              <CalendarIcon className="h-4 w-4" />
              <div className="text-sm font-medium">
                {formattedDate}
                <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                  {weekday}
                </span>
                <span className="ml-1 text-xs text-gray-400 dark:text-gray-500">
                  {lunarDate}
                </span>
                {festival && (
                  <span className="ml-1 text-xs text-red-500 dark:text-red-400">
                    {festival}
                  </span>
                )}
              </div>
            </div>
          </Button>
        </TooltipTrigger>
        <TooltipContent 
          side="top" 
          className="z-[100] bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 border-gray-800 dark:border-gray-200 shadow-2xl px-3 py-2 text-sm font-medium"
          sideOffset={8}
        >
          <div className="text-center">
            <p className="font-medium">{formattedDate} {weekday}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
              农历 {lunarDate}
            </p>
            {festival && (
              <p className="text-xs text-red-400 dark:text-red-500 mt-0.5">
                {festival}
              </p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
} 