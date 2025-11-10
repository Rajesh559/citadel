'use client';

import DateRange from '@/app/components/dashboard/header/date-range';
import DaysCompleted from '@/app/components/dashboard/header/days-completed';
import LastUpdated from '@/app/components/dashboard/header/last-updated';
import WorkCompleted from '@/app/components/dashboard/header/work-completed';
import logo from '@/public/logo.svg';
import { Icon } from 'dms-common-ux/components/icon';
import { Select, SelectOptionType } from 'dms-common-ux/components/select';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface HeaderProps {
  completed_details: {
    days_details: { completed_days: number; total_days: number };
    work_completed_percentage: number;
  };
  current_sprint: {
    end_date: string;
    name: string;
    start_date: string;
  };
  end_date: string;
  release_version: string;
  start_date: string;
  timestamp: string;
}

type ThemeType = 'dark' | 'light' | 'system';

const Header: React.FC<HeaderProps> = ({
  completed_details = {
    days_details: { completed_days: 0, total_days: 0 },
    work_completed_percentage: 0,
  },
  current_sprint = { end_date: '', name: '', start_date: '' },
  end_date,
  release_version,
  start_date,
  timestamp,
}) => {
  const [theme, setTheme] = useState<ThemeType>('system');
  const [isExpand, setIsExpand] = useState(false);
  const completed_days = completed_details?.days_details?.completed_days ?? 0;
  const total_days = completed_details?.days_details?.total_days ?? 0;

  const handleExpand = () => {
    setIsExpand(prev => !prev);
  };

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const applyTheme = (themeValue: ThemeType) => {
    document.body.classList.remove('light', 'dark');
    if (themeValue === 'light') {
      document.body.classList.toggle('light');
    } else if (themeValue === 'dark') {
      document.body.classList.toggle('dark');
    } else if (themeValue === 'system') {
      if (typeof window !== 'undefined') {
        const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.body.classList.add(isDark ? 'dark' : 'light');
      }
    }
  };

  const handleThemeChange = (value?: string) => {
    if (value && ['dark', 'light', 'system'].includes(value)) {
      setTheme(value as ThemeType);
    }
  };

  const options: SelectOptionType<string>[] = [
    {
      id: 'dark',
      label: (
        <span className="flex items-center gap-2">
          <Icon name="abb/moon" size="1.5rem" className={theme === 'dark' ? '!text-dropdown-selected' : ''} />
          <span>Dark theme</span>
        </span>
      ),
      value: 'dark',
      displayValue: <Icon name="abb/moon" size="1.5rem" />,
    },
    {
      id: 'light',
      label: (
        <span className="flex items-center gap-2">
          <Icon name="abb/sun" size="1.5rem" className={theme === 'light' ? '!text-dropdown-selected' : ''} />
          <span>Light theme</span>
        </span>
      ),
      value: 'light',
      displayValue: <Icon name="abb/sun" size="1.5rem" />,
    },
    {
      id: 'system',
      label: (
        <span className="flex items-center gap-2">
          <Icon name="abb/screen" size="1.25rem" className={theme === 'system' ? '!text-dropdown-selected' : ''} />
          <span>System</span>
        </span>
      ),
      value: 'system',
      displayValue: <Icon name="abb/screen" size="1.25rem" />,
    },
  ];

  return (
    <header className="bg-foreground-inverted border-b-border-primary-default sticky top-0 z-[9999] flex min-w-fit flex-col gap-4 border-b p-3 md:px-6">
      <div className="flex items-center gap-4">
        <Image src={logo} alt="logo" className="h-5 w-[52px]" />
        <div className="bg-border-primary-default h-8 w-px" />
        <h3 className="text-sm leading-none font-medium">EDGE Gateway Program (CITADEL) - Status</h3>
        <LastUpdated className="ml-auto hidden md:flex" timestamp={timestamp} />
        <div className="bg-border-primary-default hidden h-8 w-px lg:block" />
        <DateRange className="hidden" end_date={end_date} release_version={release_version} start_date={start_date} />
        <div className="bg-border-primary-default hidden h-8 w-px lg:block" />
        <DateRange
          className="hidden"
          end_date={current_sprint.end_date}
          release_version={current_sprint.name}
          start_date={current_sprint.start_date}
        />
        <div className="bg-border-primary-default hidden h-8 w-px lg:block" />
        <DaysCompleted className="hidden min-w-44" completed_days={completed_days} total_days={total_days} />
        <div className="bg-border-primary-default hidden h-8 w-px lg:block" />
        <WorkCompleted className="hidden min-w-44" completion_percent={completed_details.work_completed_percentage} />
        <div className="mt-2.5 sm:block md:hidden">
          <Icon
            name={isExpand ? 'abb/information-circle-1' : 'abb/information-circle-2'}
            size="1.5rem"
            onClick={handleExpand}
          />
        </div>
        <div className="bg-border-primary-default h-8 w-px md:block" />
        <div className="mt-2.5">
          <Select options={options} value={theme} onChange={handleThemeChange} className="!border-0" />
        </div>
      </div>
      {isExpand && (
        <div className="bg-foreground-inverted flex flex-col">
          <LastUpdated className="flex justify-between p-2" timestamp={timestamp} />
          <div className="bg-border-primary-default m-2 h-px" />
          <DateRange
            className="flex justify-between p-2"
            end_date={end_date}
            release_version={release_version}
            start_date={start_date}
          />
          <div className="bg-border-primary-default m-2 h-px" />
          <DateRange
            className="flex justify-between p-2"
            end_date={current_sprint.end_date}
            release_version={current_sprint.name}
            start_date={current_sprint.start_date}
          />
          <div className="bg-border-primary-default m-2 h-px" />
          <DaysCompleted className="flex p-2" completed_days={completed_days} total_days={total_days} />
          <div className="bg-border-primary-default m-2 h-px" />
          <WorkCompleted className="flex p-2" completion_percent={completed_details.work_completed_percentage} />
        </div>
      )}
    </header>
  );
};

export default Header;
