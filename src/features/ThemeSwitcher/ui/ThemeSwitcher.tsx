import { memo } from 'react';

import DarkIcon from '@/shared/assets/icons/theme-dark.svg';
import LightIcon from '@/shared/assets/icons/theme-light.svg';
import { Theme } from '@/shared/const/theme';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Button, ThemeButton } from '@/shared/ui/Button';

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = memo((props) => {
  const { className } = props;
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      theme={ThemeButton.CLEAR}
      className={classNames('', {}, [className as string])}
      onClick={toggleTheme}
    >
      {theme === Theme.DARK ? <DarkIcon /> : <LightIcon />}
    </Button>
  );
});
