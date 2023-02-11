
import { classNames } from 'shared/lib/classNames/classNames'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink'
import cls from './Navbar.module.scss'

interface NavbarProps {
  className?: string
}

export const Navbar = ({ className }: NavbarProps) => {
  return (
    <div className={classNames(cls.navbar, {}, [className as string])}>
      <div className={cls.links}>
        <AppLink theme={AppLinkTheme.SECONDARY} to={'/about'}>
          {'ABOUT'}
        </AppLink>
        <AppLink theme={AppLinkTheme.SECONDARY} to={'/'}>
          {'MAIN'}
        </AppLink>
      </div>
    </div>
  )
}
