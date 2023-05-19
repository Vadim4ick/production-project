import cls from './PageLoader.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Loader } from '@/shared/ui/redesigned/Loader';

interface PageLoaderProps {
  className?: string;
}

export const PageLoader: React.FC<PageLoaderProps> = (props) => {
  const { className } = props;

  return (
    <div className={classNames(cls.pageLoader, {}, [className as string])}>
      <Loader />
    </div>
  );
};
