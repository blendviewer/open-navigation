"use client";

import { useState, useEffect } from 'react';
import { Cloud, CloudRain, Sun, CloudSun, Snowflake, CloudLightning, Wind } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface WeatherData {
  temperature: number;
  condition: string;
  city: string;
}

const getWeatherIcon = (condition: string) => {
  const conditionLower = condition.toLowerCase();
  if (conditionLower.includes('rain')) return <CloudRain className="h-4 w-4" />;
  if (conditionLower.includes('cloud') && conditionLower.includes('sun')) return <CloudSun className="h-4 w-4" />;
  if (conditionLower.includes('cloud')) return <Cloud className="h-4 w-4" />;
  if (conditionLower.includes('snow')) return <Snowflake className="h-4 w-4" />;
  if (conditionLower.includes('thunder')) return <CloudLightning className="h-4 w-4" />;
  if (conditionLower.includes('wind')) return <Wind className="h-4 w-4" />;
  return <Sun className="h-4 w-4" />;
};

export default function Weather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // 这里需要替换为实际的天气 API
        // 示例：使用 OpenWeatherMap API
        const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Shanghai&appid=YOUR_API_KEY&units=metric');
        const data = await response.json();
        
        setWeather({
          temperature: Math.round(data.main.temp),
          condition: data.weather[0].main,
          city: data.name
        });
      } catch (error) {
        console.error('Failed to fetch weather:', error);
        // 使用模拟数据作为fallback
        setWeather({
          temperature: 23,
          condition: 'Sunny',
          city: '上海'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    // 每30分钟更新一次天气
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading || !weather) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="h-10 w-10 p-0 hover:bg-white/80 dark:hover:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-600/30 transition-all duration-300"
      >
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
      </Button>
    );
  }

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
              {getWeatherIcon(weather.condition)}
              <span className="text-sm font-medium">{weather.temperature}°C</span>
            </div>
          </Button>
        </TooltipTrigger>
        <TooltipContent 
          side="top" 
          className="z-[100] bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 border-gray-800 dark:border-gray-200 shadow-2xl px-3 py-2 text-sm font-medium"
          sideOffset={8}
        >
          <div className="text-center">
            <p className="font-medium">{weather.city}</p>
            <p className="text-xs opacity-75 mt-0.5">{weather.condition}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
} 