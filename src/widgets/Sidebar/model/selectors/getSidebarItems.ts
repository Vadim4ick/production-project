import { useSelector } from 'react-redux';

import { SidebarItemType } from '../types/sidebar';

import { getAuthUserData } from '@/entities/User';
import AboutIcon from '@/shared/assets/icons/InfoRedesigned.svg';
import AboutIconDeprecated from '@/shared/assets/icons/about.svg';
import ArticleIconDeprecated from '@/shared/assets/icons/article.svg';
import ArticleIcon from '@/shared/assets/icons/articleRedesigned.svg';
import ProfileIcon from '@/shared/assets/icons/avatarRedesigned.svg';
import HomeIconDeprecated from '@/shared/assets/icons/home.svg';
import MainIcon from '@/shared/assets/icons/homeRedesigned.svg';
import ProfileIconDeprecated from '@/shared/assets/icons/profile.svg';
import {
  getRouteAbout,
  getRouteArticles,
  getRouteMain,
  getRouteProfile,
} from '@/shared/const/router';
import { toggleFeatures } from '@/shared/lib/features';

export const useSidebarItems = () => {
  const userData = useSelector(getAuthUserData);
  const sidebarItemsList: SidebarItemType[] = [
    {
      path: getRouteMain(),
      Icon: toggleFeatures({
        name: 'isAppRedesigned',
        on: () => MainIcon,
        off: () => HomeIconDeprecated,
      }),
      text: 'Главная',
    },
    {
      path: getRouteAbout(),
      Icon: toggleFeatures({
        name: 'isAppRedesigned',
        on: () => AboutIcon,
        off: () => AboutIconDeprecated,
      }),
      text: 'О сайте',
    },
  ];

  if (userData) {
    sidebarItemsList.push(
      {
        path: getRouteProfile(userData?.id),
        Icon: toggleFeatures({
          name: 'isAppRedesigned',
          on: () => ProfileIcon,
          off: () => ProfileIconDeprecated,
        }),
        text: 'Профиль',
        authOnly: true,
      },
      {
        path: getRouteArticles(),
        Icon: toggleFeatures({
          name: 'isAppRedesigned',
          on: () => ArticleIcon,
          off: () => ArticleIconDeprecated,
        }),
        text: 'Статьи',
        authOnly: true,
      },
    );
  }

  return sidebarItemsList;
};
