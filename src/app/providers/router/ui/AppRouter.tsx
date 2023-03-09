import { Suspense, memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { getAuthUserData } from 'entities/User';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';
import { PageLoader } from 'widgets/PageLoader/PageLoader';

const AppRouter = () => {
  const isAuth = useSelector(getAuthUserData);

  const routes = useMemo(() => {
    return Object.values(routeConfig).filter((route) => {
      if (route.authOnly && !isAuth) {
        return false;
      }

      return true;
    });
  }, [isAuth]);

  return (
    <Routes>
      {routes.map(({ element, path }) => (
        <Route
          key={path}
          element={
            <div className="page-wrapper">
              <Suspense fallback={<PageLoader />}>{element}</Suspense>
            </div>
          }
          path={path}
        />
      ))}
    </Routes>
  );
};

export default memo(AppRouter);
