import { MutableRefObject, ReactNode, UIEvent, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { StateSchema } from 'app/providers/StoreProvider';
import { scrollRestorationActions } from 'features/ScrollRestoration';
import { getScrollRestorationByPath } from 'features/ScrollRestoration/model/selectors/scrollRestoration';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useThrottle } from 'shared/lib/hooks/useThrottle/useThrottle';

import cls from './Page.module.scss';

interface PageProps {
  className?: string;
  children: ReactNode;
  onScrollEnd?: () => void;
  isLoading?: boolean;
}

export const PAGE_ID = 'PAGE_ID ';

export const Page = (props: PageProps) => {
  const { className, children, onScrollEnd, isLoading } = props;

  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const scrollPosition = useSelector((state: StateSchema) =>
    getScrollRestorationByPath(state, pathname),
  );

  useInitialEffect(() => {
    wrapperRef.current.scrollTop = scrollPosition;
  });

  const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
    dispatch(
      scrollRestorationActions.setScrollPosition({
        position: e.currentTarget.scrollTop,
        path: pathname,
      }),
    );
  }, 300);

  useInfiniteScroll({
    triggerRef,
    wrapperRef,
    callback: onScrollEnd,
    isLoading: isLoading,
  });

  return (
    <main
      onScroll={onScroll}
      ref={wrapperRef}
      className={classNames(cls.page, {}, [className])}
      id={PAGE_ID}
    >
      {children}

      {onScrollEnd ? <div className={cls.trigger} ref={triggerRef} /> : null}
    </main>
  );
};
