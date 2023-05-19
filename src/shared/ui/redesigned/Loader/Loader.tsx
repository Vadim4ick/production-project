import './Loader.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

interface LoaderProps {
  className?: string;
}

export const Loader: React.FC<LoaderProps> = (props) => {
  const { className } = props;

  return (
    <div
      className={classNames('lds-dual-ring', {}, [className as string])}
    ></div>
  );
};
