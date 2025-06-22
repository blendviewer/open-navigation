'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'space-y-4',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 hover:bg-white/80 dark:hover:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-600/30 transition-all duration-300'
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex w-full',
        head_cell:
          'text-muted-foreground w-9 font-normal text-[0.8rem] flex items-center justify-center',
        row: 'flex w-full mt-2',
        cell: 'relative flex items-center justify-center p-0 text-center text-sm focus-within:relative focus-within:z-20 w-9 h-9',
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-9 w-9 p-0 font-normal flex items-center justify-center hover:bg-white/80 dark:hover:bg-gray-800/80 focus:bg-white/80 dark:focus:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-transparent hover:border-white/20 dark:hover:border-gray-600/30 transition-all duration-300'
        ),
        day_selected:
          'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 hover:text-white focus:bg-blue-500 focus:text-white dark:bg-blue-500 dark:text-white dark:hover:bg-blue-600 dark:hover:text-white dark:focus:bg-blue-600 dark:focus:text-white',
        day_today:
          'bg-gradient-to-r from-slate-100 to-slate-200 text-slate-900 dark:from-slate-800 dark:to-slate-700 dark:text-slate-50',
        day_outside: 'text-muted-foreground opacity-50',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{}}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
