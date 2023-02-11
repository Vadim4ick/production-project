/* eslint-disable i18next/no-literal-string */
import { useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { LangSwitcher } from 'widgets/LangSwitcher/LangSwitcher'
import { ThemeSwitcher } from 'widgets/ThemeSwitcher'
import cls from './Sidebar.module.scss'

interface SidebarProps {
  className?: string
}

export const Sidebar: React.FC<SidebarProps> = (props) => {
  const { className } = props
  const [collapsed, setCollapsed] = useState(false)

  const onToggle = () => {
    setCollapsed((prev) => !prev)
  }

  return (
    <div
      className={classNames(cls.sidebar, { [cls.collapsed]: collapsed }, [
        className as string
      ])}
    >
      <button onClick={onToggle}>toggle</button>
      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LangSwitcher />
      </div>
    </div>
  )
}
