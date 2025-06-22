import * as React from "react"
import { cn } from "@/lib/utils"

interface SliderProps {
  value: number[];
  onValueChange: (value: number[]) => void;
  max: number;
  step: number;
  className?: string;
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, value, onValueChange, max, step, ...props }, ref) => (
    <input
      ref={ref}
      type="range"
      min={0}
      max={max}
      step={step}
      value={value[0] || 0}
      onChange={(e) => onValueChange([Number(e.target.value)])}
      className={cn(
        "w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer",
        "slider-thumb:appearance-none slider-thumb:h-4 slider-thumb:w-4 slider-thumb:rounded-full slider-thumb:bg-blue-600 slider-thumb:cursor-pointer",
        "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:cursor-pointer",
        "[&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-600 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-none",
        className
      )}
      style={{
        background: `linear-gradient(to right, rgb(37 99 235) 0%, rgb(37 99 235) ${(value[0] || 0) / max * 100}%, rgb(229 231 235) ${(value[0] || 0) / max * 100}%, rgb(229 231 235) 100%)`
      }}
      {...props}
    />
  )
)
Slider.displayName = "Slider"

export { Slider } 