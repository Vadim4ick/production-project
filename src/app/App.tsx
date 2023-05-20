import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppRouter } from './providers/router';
import { getUserInited, initAuthData } from '@/entities/User';
import { AppLoaderLayout } from '@/shared/layouts/AppLoaderLayout';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Navbar } from '@/widgets/Navbar';
import { PageLoader } from '@/widgets/PageLoader';
import { Sidebar } from '@/widgets/Sidebar';

const App = () => {
  const dispatch = useDispatch();

  const { theme } = useTheme();

  const inited = useSelector(getUserInited);

  useEffect(() => {
    if (!inited) {
      dispatch(initAuthData());
    }
  }, [dispatch, inited]);

  if (!inited) {
    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        off={<PageLoader />}
        on={
          <div id="app" className={classNames(`app_redesigned `, {}, [theme])}>
            <AppLoaderLayout />
          </div>
        }
      />
    );
  }

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      off={
        <div id="app" className={classNames(`app`, {}, [theme])}>
          <Suspense fallback="">
            <Navbar />
            <div className="content-page">
              <Sidebar />
              <AppRouter />
            </div>
          </Suspense>
        </div>
      }
      on={
        <div id="app" className={classNames(`app_redesigned`, {}, [theme])}>
          <Suspense fallback="">
            <MainLayout
              content={<AppRouter />}
              header={<Navbar />}
              sidebar={<Sidebar />}
              toolbar={<div>123</div>}
            />
          </Suspense>
        </div>
      }
    />
  );
};

export default App;
