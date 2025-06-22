'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Music, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from './ui/slider';
import { cn } from '@/lib/utils';

interface Track {
  id: string;
  title: string;
  artist: string;
  url: string;
  duration: number;
}

interface PopupMusicPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  onReopen?: () => void;
}

interface MiniPlayerProps {
  isPlaying: boolean;
  currentTrack: number;
  onTogglePlay: () => void;
  onOpenPlayer: () => void;
  onStopMusic: () => void;
  track: TrackWithLyrics;
}

interface LyricLine {
  time: number; // 时间戳（秒）
  text: string; // 歌词内容
}

interface TrackWithLyrics extends Track {
  lyrics: LyricLine[];
}

const playlist: TrackWithLyrics[] = [
  {
    id: '1',
    title: 'Fiee',
    artist: 'Unknown',
    url: 'https://oss.blendviewer.com/public/0c8bbd70-ff17-11ef-9052-0d67d817c988%2FFiee.mp3',
    duration: 240,
    lyrics: [],
  },
  // {
  //   id: '2',
  //   title: 'Kalimba',
  //   artist: 'Public Domain',
  //   url: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
  //   duration: 30,
  //   lyrics: [
  //     { time: 0, text: '🎼 非洲拇指钢琴' },
  //     { time: 5, text: '清脆悦耳的音色' },
  //     { time: 10, text: '传统民族乐器' },
  //     { time: 15, text: '空灵的旋律' },
  //     { time: 20, text: '放松心灵' },
  //     { time: 25, text: '🌍 来自非洲大陆的声音' },
  //   ],
  // },
];

// 小型悬浮播放器组件
function MiniPlayer({
  isPlaying,
  currentTrack,
  onTogglePlay,
  onOpenPlayer,
  onStopMusic,
  track,
}: MiniPlayerProps) {
  // 简化的波形数据
  const [miniWaveform, setMiniWaveform] = React.useState<number[]>(Array(20).fill(0.3));
  const miniWaveformRef = React.useRef<number>();

  React.useEffect(() => {
    const updateMiniWaveform = () => {
      if (isPlaying) {
        const newWaveform = Array(20)
          .fill(0)
          .map((_, index) => {
            const baseHeight = Math.sin(Date.now() / 800 + index * 0.8) * 0.4 + 0.5;
            const randomVariation = Math.random() * 0.2;
            return Math.max(0.1, baseHeight + randomVariation);
          });
        setMiniWaveform(newWaveform);
        miniWaveformRef.current = requestAnimationFrame(updateMiniWaveform);
      } else {
        setMiniWaveform(Array(20).fill(0.2));
      }
    };

    updateMiniWaveform();
    return () => {
      if (miniWaveformRef.current) {
        cancelAnimationFrame(miniWaveformRef.current);
      }
    };
  }, [isPlaying]);

  return (
    <div className="fixed bottom-4 right-4 z-40 animate-in slide-in-from-bottom-4 zoom-in-95 duration-300">
      <div className="bg-gradient-to-r from-white/95 to-gray-50/95 dark:from-gray-900/95 dark:to-gray-800/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30 p-3 min-w-[280px]">
        <div className="flex items-center space-x-3">
          {/* 专辑封面 */}
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
            <Music className="h-5 w-5 text-white" />
          </div>

          {/* 音乐信息 */}
          <div className="flex-1 min-w-0 cursor-pointer" onClick={onOpenPlayer}>
            <div className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">
              {track.title}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
              <span>{track.artist}</span>
            </div>

            {/* 小型Waveform动画 */}
            <div className="mt-1 flex items-center space-x-0.5 h-3">
              {miniWaveform.map((height, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-t from-blue-400 to-purple-500 rounded-full transition-all duration-75 ease-out"
                  style={{
                    height: `${Math.max(1, height * 10)}px`,
                    width: '1.5px',
                    opacity: isPlaying ? 0.7 : 0.3,
                  }}
                />
              ))}
            </div>
          </div>

          {/* 控制按钮 */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={onTogglePlay}
              className="h-8 w-8 p-0 rounded-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/30 dark:border-gray-600/30 hover:bg-white/80 dark:hover:bg-gray-700/80 hover:scale-110 transition-all duration-200 shadow-md"
            >
              {isPlaying ? (
                <Pause className="h-3 w-3 text-gray-700 dark:text-gray-300" />
              ) : (
                <Play className="h-3 w-3 ml-0.5 text-gray-700 dark:text-gray-300" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={onStopMusic}
              className="h-8 w-8 p-0 rounded-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/30 dark:border-gray-600/30 hover:bg-red-100 dark:hover:bg-red-900/30 hover:scale-110 transition-all duration-200 shadow-md group"
            >
              <X className="h-3 w-3 text-gray-700 dark:text-gray-300 group-hover:text-red-500 dark:group-hover:text-red-400" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PopupMusicPlayer({ isOpen, onClose, onReopen }: PopupMusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [hasEverPlayed, setHasEverPlayed] = useState(false);
  const [waveformData, setWaveformData] = useState<number[]>(Array(50).fill(0));
  const [loopMode, setLoopMode] = useState<'off' | 'one' | 'all'>('off');
  const audioRef = useRef<HTMLAudioElement>(null);
  const waveformAnimationRef = useRef<number>();
  const lyricsContainerRef = useRef<HTMLDivElement>(null);
  const currentLyricRef = useRef<HTMLDivElement>(null);

  const track = playlist[currentTrack];

  // 简化的音频初始化 - 移除复杂的Web Audio API以避免播放问题
  const initializeAudioContext = () => {
    // 仅用于兼容性，不再使用复杂的Web Audio API
    console.log('音频播放器已就绪');
  };

  // 波形动画
  const updateWaveform = () => {
    if (isPlaying) {
      const newWaveform = Array(50)
        .fill(0)
        .map((_, index) => {
          const baseHeight = Math.sin(Date.now() / 1000 + index * 0.5) * 0.5 + 0.5;
          const randomVariation = Math.random() * 0.3;
          return Math.max(0.1, baseHeight + randomVariation);
        });
      setWaveformData(newWaveform);
      waveformAnimationRef.current = requestAnimationFrame(updateWaveform);
    } else {
      // 静态波形
      setWaveformData(Array(50).fill(0.2));
    }
  };

  const stopWaveformAnimation = () => {
    if (waveformAnimationRef.current) {
      cancelAnimationFrame(waveformAnimationRef.current);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => {
      // 根据循环模式处理歌曲结束
      if (loopMode === 'one') {
        // 单曲循环：重新播放当前歌曲
        audio.currentTime = 0;
        audio.play().catch(console.error);
      } else if (loopMode === 'all') {
        // 列表循环：播放下一首，如果是最后一首则回到第一首
        nextTrack();
      } else {
        // 不循环：播放下一首，如果是最后一首则停止
        if (currentTrack < playlist.length - 1) {
          nextTrack();
        } else {
          setIsPlaying(false);
        }
      }
    };
    const handleLoadStart = () => {
      setIsLoading(true);
      setHasError(false);
    };
    const handleCanPlay = () => {
      setIsLoading(false);
      setHasError(false);
      console.log('音频可以播放:', track.title);
    };
    const handleError = (e: Event) => {
      console.error('音频加载错误:', e, track.url);
      setIsLoading(false);
      setHasError(true);
      setIsPlaying(false);
    };
    const handlePlay = () => {
      setIsPlaying(true);
      setHasEverPlayed(true);
      console.log('音频开始播放:', track.title);
    };
    const handlePause = () => {
      setIsPlaying(false);
      console.log('音频暂停:', track.title);
    };

    // 设置跨域属性
    audio.crossOrigin = 'anonymous';

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    // 立即尝试加载音频
    if (audio.src !== track.url) {
      audio.load();
    }

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, [currentTrack, track.url, track.title, loopMode]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio || isLoading || hasError) return;

    if (isPlaying) {
      audio.pause();
      // 不设置setIsPlaying，让事件监听器处理
    } else {
      try {
        // 尝试播放音频
        await audio.play();

        // 不设置setIsPlaying，让事件监听器处理
      } catch (error) {
        console.error('音频播放失败:', error);
        setHasError(true);
        setIsPlaying(false);
      }
    }
  };

  const nextTrack = () => {
    stopWaveformAnimation();
    setCurrentTrack((prev) => (prev + 1) % playlist.length);
    setCurrentTime(0);
    setHasError(false);
    setIsPlaying(false);
    // 保持hasEverPlayed状态，因为用户只是切换歌曲
  };

  const previousTrack = () => {
    stopWaveformAnimation();
    setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length);
    setCurrentTime(0);
    setHasError(false);
    setIsPlaying(false);
    // 保持hasEverPlayed状态，因为用户只是切换歌曲
  };

  // 清理资源
  useEffect(() => {
    return () => {
      stopWaveformAnimation();
    };
  }, []);

  // 管理歌词同步（原频谱动画位置，现在用于歌词）
  useEffect(() => {
    // 歌词会根据 currentTime 自动更新，无需额外处理
  }, [isOpen, isPlaying]);

  // 管理波形动画
  useEffect(() => {
    if (hasEverPlayed) {
      updateWaveform();
    } else {
      stopWaveformAnimation();
    }
    return () => stopWaveformAnimation();
  }, [isPlaying, hasEverPlayed]);

  // 自动滚动歌词到当前位置
  useEffect(() => {
    if (currentLyricRef.current && lyricsContainerRef.current) {
      const container = lyricsContainerRef.current;
      const currentLyric = currentLyricRef.current;

      // 计算当前歌词相对于容器的位置
      const containerHeight = container.clientHeight;
      const lyricTop = currentLyric.offsetTop;
      const lyricHeight = currentLyric.clientHeight;

      // 计算滚动位置，让当前歌词居中显示
      const scrollTop = lyricTop - containerHeight / 2 + lyricHeight / 2;

      // 平滑滚动到目标位置
      container.scrollTo({
        top: Math.max(0, scrollTop),
        behavior: 'smooth',
      });
    }
  }, [currentTime, track.lyrics]);

  // 当播放器打开时，同步音频状态
  useEffect(() => {
    if (isOpen) {
      const audio = audioRef.current;
      if (audio && !audio.paused && !isPlaying) {
        // 音频正在播放但React状态不同步，更新状态
        setIsPlaying(true);
      } else if (audio && audio.paused && isPlaying) {
        // 音频暂停但React状态不同步，更新状态
        setIsPlaying(false);
      }
    }
  }, [isOpen]);

  const handleProgressChange = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = (value[0] / 100) * track.duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0] / 100);
    setIsMuted(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // 停止音乐播放
  const stopMusic = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentTime(0);
    setHasEverPlayed(false); // 重置播放历史，小播放器将消失
    stopWaveformAnimation();
  };

  // 重新打开播放器
  const reopenPlayer = () => {
    if (onReopen) {
      onReopen();
    }
  };

  const progress = track.duration ? (currentTime / track.duration) * 100 : 0;

  // 切换循环模式
  const toggleLoopMode = () => {
    setLoopMode((prev) => {
      if (prev === 'off') return 'all';
      if (prev === 'all') return 'one';
      return 'off';
    });
  };

  // 获取循环模式图标和颜色
  const getLoopIcon = () => {
    switch (loopMode) {
      case 'one':
        return {
          icon: '🔂',
          color: 'text-blue-600 dark:text-blue-400',
          bg: 'bg-blue-100/80 dark:bg-blue-900/60',
        };
      case 'all':
        return {
          icon: '🔁',
          color: 'text-green-600 dark:text-green-400',
          bg: 'bg-green-100/80 dark:bg-green-900/60',
        };
      default:
        return {
          icon: '➡️',
          color: 'text-gray-600 dark:text-gray-400',
          bg: 'bg-white/60 dark:bg-gray-700/60',
        };
    }
  };

  const loopIconData = getLoopIcon();

  return (
    <>
      {/* 音频元素 - 始终存在，不受播放器开关影响 */}
      <audio ref={audioRef} src={track.url} />

      {/* 悬浮小播放器 - 仅在播放器关闭且曾经播放过音乐时显示 */}
      {!isOpen && hasEverPlayed && (
        <MiniPlayer
          isPlaying={isPlaying}
          currentTrack={currentTrack}
          onTogglePlay={togglePlay}
          onOpenPlayer={onReopen || (() => {})}
          onStopMusic={stopMusic}
          track={track}
        />
      )}

      {/* 主播放器 - 仅在打开时显示 */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-end pt-4 pr-2 md:pr-4">
          {/* 背景遮罩 */}
          <div
            className="fixed inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-md animate-in fade-in duration-300"
            onClick={onClose}
          />

          {/* 弹出框 */}
          <div className="relative bg-gradient-to-br from-white/95 via-white/90 to-gray-50/95 dark:from-gray-900/95 dark:via-gray-800/90 dark:to-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-gray-900/25 dark:shadow-black/50 border border-white/20 dark:border-gray-700/30 p-0 w-80 max-w-[calc(100vw-1rem)] max-h-[calc(100vh-2rem)] animate-in slide-in-from-top-4 zoom-in-95 duration-500 ease-out overflow-hidden">
            {/* 箭头指示器 */}
            <div className="absolute -top-2 right-10 w-4 h-4 bg-gradient-to-br from-white/95 to-gray-50/95 dark:from-gray-900/95 dark:to-gray-800/90 border-l border-t border-white/20 dark:border-gray-700/30 transform rotate-45"></div>

            {/* 背景装饰 */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 dark:from-blue-400/10 dark:via-purple-400/10 dark:to-pink-400/10"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-400/10 to-transparent rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-400/10 to-transparent rounded-full blur-xl"></div>
            {/* 关闭按钮 */}
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="absolute top-4 right-4 h-9 w-9 p-0 hover:bg-white/80 dark:hover:bg-gray-800/80 backdrop-blur-sm rounded-full border border-gray-200/50 dark:border-gray-600/50 z-20 transition-all duration-200 hover:scale-105"
            >
              <X className="h-4 w-4" />
            </Button>

            <div className="relative z-10 p-4 space-y-4 max-h-[calc(100vh-6rem)] overflow-y-auto">
              {/* 标题区域 */}
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2">
                  <div className="p-1.5 bg-gradient-to-br from-blue-500/20 to-purple-500/20 dark:from-blue-400/30 dark:to-purple-400/30 rounded-lg backdrop-blur-sm">
                    <Music className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-lg font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-gray-100 dark:via-gray-300 dark:to-gray-100 bg-clip-text text-transparent">
                    背景音乐
                  </span>
                </div>
              </div>

              {/* 专辑封面与音乐信息 */}
              <div className="space-y-2">
                <div className="flex items-center space-x-3 p-3 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/30">
                  {/* 专辑封面占位符 */}
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
                    <Music className="h-6 w-6 text-white" />
                  </div>

                  {/* 音乐信息 */}
                  <div className="flex-1 min-w-0">
                    <div className="text-base font-bold text-gray-800 dark:text-gray-200 truncate">
                      {track.title}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      <span>
                        {hasError ? '音频加载失败' : isLoading ? '加载中...' : track.artist}
                      </span>
                    </div>

                    {/* Waveform动画 */}
                    {hasEverPlayed && (
                      <div className="mt-2 flex items-center justify-center space-x-0.5 h-6">
                        {waveformData.map((height, index) => (
                          <div
                            key={index}
                            className="bg-gradient-to-t from-blue-400 to-purple-500 rounded-full transition-all duration-100 ease-out"
                            style={{
                              height: `${Math.max(2, height * 20)}px`,
                              width: '2px',
                              opacity: isPlaying ? 0.8 : 0.3,
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* 歌词显示 */}
                <div className="p-4 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/30 h-[140px] flex flex-col">
                  {/* 歌词滚动区域 */}
                  <div
                    ref={lyricsContainerRef}
                    className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent"
                  >
                    <div className="text-center space-y-3 py-2">
                      {/* 显示所有歌词，突出当前歌词 */}
                      {track.lyrics && track.lyrics.length > 0 ? (
                        track.lyrics.map((lyric, index) => {
                          const isCurrent =
                            lyric.time <= currentTime &&
                            (index === track.lyrics.length - 1 ||
                              track.lyrics[index + 1].time > currentTime);
                          const isPast = lyric.time < currentTime && !isCurrent;
                          const isFuture = lyric.time > currentTime;

                          return (
                            <div
                              key={index}
                              ref={isCurrent ? currentLyricRef : null}
                              className={`transition-all duration-500 leading-relaxed ${
                                isCurrent
                                  ? 'text-base font-semibold transform scale-105'
                                  : isPast
                                  ? 'text-sm text-gray-400 dark:text-gray-500 opacity-50'
                                  : 'text-sm text-gray-500 dark:text-gray-400 opacity-70'
                              }`}
                            >
                              {isCurrent ? (
                                <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                  {lyric.text}
                                </div>
                              ) : (
                                lyric.text
                              )}
                            </div>
                          );
                        })
                      ) : (
                        <div className="text-base font-semibold text-gray-800 dark:text-gray-200 leading-relaxed">
                          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            🎵 纯音乐，尽情享受...
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 歌词状态指示 */}
                  <div className="text-center mt-3 flex-shrink-0">
                    <div className="flex items-center justify-center space-x-2">
                      <div
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          isPlaying && !hasError && !isLoading
                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse'
                            : 'bg-gray-400'
                        }`}
                      ></div>
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                        {isPlaying && !hasError && !isLoading ? '🎵 歌词同步中' : '📝 歌词待播放'}
                      </span>
                      <div
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          isPlaying && !hasError && !isLoading
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse'
                            : 'bg-gray-400'
                        }`}
                        style={{ animationDelay: '0.5s' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 进度条 */}
              <div className="space-y-2 p-3 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/30">
                <div className="relative">
                  <Slider
                    value={[progress]}
                    onValueChange={handleProgressChange}
                    max={100}
                    step={1}
                    className="w-full [&>span:first-child]:h-2 [&>span:first-child]:bg-gradient-to-r [&>span:first-child]:from-blue-500 [&>span:first-child]:via-purple-500 [&>span:first-child]:to-pink-500 [&>span:first-child]:rounded-full [&_[role=slider]]:bg-white [&_[role=slider]]:border-2 [&_[role=slider]]:border-blue-500 [&_[role=slider]]:w-4 [&_[role=slider]]:h-4 [&_[role=slider]]:shadow-lg hover:[&_[role=slider]]:scale-110 [&_[role=slider]]:transition-transform"
                  />
                </div>
                <div className="flex justify-between text-xs font-medium text-gray-600 dark:text-gray-300">
                  <span className="bg-gray-100/80 dark:bg-gray-700/80 px-2 py-1 rounded-full">
                    {formatTime(currentTime)}
                  </span>
                  <span className="bg-gray-100/80 dark:bg-gray-700/80 px-2 py-1 rounded-full">
                    {formatTime(track.duration)}
                  </span>
                </div>
              </div>

              {/* 控制按钮 */}
              <div className="flex items-center justify-center space-x-4 py-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={previousTrack}
                  className="h-10 w-10 p-0 rounded-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/30 dark:border-gray-600/30 hover:bg-white/80 dark:hover:bg-gray-700/80 hover:scale-110 transition-all duration-200 shadow-lg group"
                >
                  <SkipBack className="h-4 w-4 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                </Button>

                <Button
                  variant="ghost"
                  size="lg"
                  onClick={togglePlay}
                  disabled={isLoading || hasError}
                  className={cn(
                    'h-12 w-12 p-0 rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 border-2 border-white/20',
                    hasError
                      ? 'bg-gradient-to-br from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white'
                      : isLoading
                      ? 'bg-gradient-to-br from-gray-400 to-gray-600 opacity-50'
                      : 'bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600'
                  )}
                >
                  {isLoading ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : hasError ? (
                    <Music className="h-5 w-5 text-white" />
                  ) : isPlaying ? (
                    <Pause className="h-5 w-5 text-white" />
                  ) : (
                    <Play className="h-5 w-5 ml-0.5 text-white" />
                  )}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={nextTrack}
                  className="h-10 w-10 p-0 rounded-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/30 dark:border-gray-600/30 hover:bg-white/80 dark:hover:bg-gray-700/80 hover:scale-110 transition-all duration-200 shadow-lg group"
                >
                  <SkipForward className="h-4 w-4 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                </Button>
              </div>

              {/* 音量控制 */}
              <div className="p-3 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/30">
                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleMute}
                    className="h-8 w-8 p-0 rounded-full bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm border border-white/30 dark:border-gray-600/30 hover:bg-white/80 dark:hover:bg-gray-600/80 hover:scale-110 transition-all duration-200 shadow-md group"
                  >
                    {isMuted ? (
                      <VolumeX className="h-4 w-4 text-gray-700 dark:text-gray-300 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors" />
                    ) : (
                      <Volume2 className="h-4 w-4 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                    )}
                  </Button>
                  <div className="flex-1">
                    <Slider
                      value={[isMuted ? 0 : volume * 100]}
                      onValueChange={handleVolumeChange}
                      max={100}
                      step={1}
                      className="w-full [&>span:first-child]:h-2 [&>span:first-child]:bg-gradient-to-r [&>span:first-child]:from-green-400 [&>span:first-child]:to-blue-500 [&>span:first-child]:rounded-full [&_[role=slider]]:bg-white [&_[role=slider]]:border-2 [&_[role=slider]]:border-green-500 [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:shadow-md hover:[&_[role=slider]]:scale-110 [&_[role=slider]]:transition-transform"
                    />
                  </div>
                  <div className="text-xs font-medium text-gray-600 dark:text-gray-300 bg-gray-100/80 dark:bg-gray-700/80 px-2 py-1 rounded-full min-w-[3rem] text-center">
                    {Math.round(isMuted ? 0 : volume * 100)}%
                  </div>
                </div>
              </div>

              {/* 播放列表 */}
              <div className="p-3 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="p-1 bg-gradient-to-br from-green-400/20 to-blue-500/20 dark:from-green-400/30 dark:to-blue-500/30 rounded-md backdrop-blur-sm">
                      <Music className="h-3 w-3 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-xs font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
                      播放列表
                    </span>
                  </div>
                  {/* 循环模式控制按钮 */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleLoopMode}
                    className={cn(
                      'h-7 px-3 rounded-full text-xs backdrop-blur-sm border border-white/30 dark:border-gray-600/30 hover:scale-105 transition-all duration-200 shadow-sm group',
                      loopIconData.bg,
                      loopMode !== 'off' && 'ring-1 ring-blue-300 dark:ring-blue-600'
                    )}
                    title={
                      loopMode === 'off' ? '顺序播放' : loopMode === 'all' ? '列表循环' : '单曲循环'
                    }
                  >
                    <span className={cn('mr-1', loopIconData.color)}>{loopIconData.icon}</span>
                    <span className={cn('font-medium', loopIconData.color)}>
                      {loopMode === 'off' ? '顺序' : loopMode === 'all' ? '循环' : '单曲'}
                    </span>
                  </Button>
                </div>
                <div className="space-y-1 max-h-24 overflow-y-auto pr-1">
                  {playlist.map((item, index) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setCurrentTrack(index);
                        setHasError(false);
                        setIsPlaying(false);
                      }}
                      className={cn(
                        'w-full text-left px-2 py-1.5 rounded-lg transition-all duration-200 text-xs relative overflow-hidden group',
                        index === currentTrack
                          ? 'bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 dark:from-blue-400/30 dark:via-purple-400/30 dark:to-pink-400/30 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-500/30 shadow-md'
                          : 'bg-white/40 dark:bg-gray-700/40 hover:bg-white/60 dark:hover:bg-gray-700/60 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 border border-transparent hover:border-gray-200/50 dark:hover:border-gray-600/50 hover:shadow-md hover:scale-[1.02]'
                      )}
                    >
                      {index === currentTrack && (
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-blue-400/20 dark:via-purple-400/20 dark:to-pink-400/20"></div>
                      )}
                      <div className="relative z-10">
                        <div className="font-semibold truncate flex items-center space-x-2">
                          {index === currentTrack && isPlaying && (
                            <div className="flex space-x-0.5">
                              <div className="w-0.5 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                              <div
                                className="w-0.5 h-2 bg-purple-500 rounded-full animate-pulse"
                                style={{ animationDelay: '0.1s' }}
                              ></div>
                              <div
                                className="w-0.5 h-3 bg-pink-500 rounded-full animate-pulse"
                                style={{ animationDelay: '0.2s' }}
                              ></div>
                            </div>
                          )}
                          <span className="truncate">{item.title}</span>
                        </div>
                        <div className="text-[10px] opacity-75 truncate mt-0.5">{item.artist}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
