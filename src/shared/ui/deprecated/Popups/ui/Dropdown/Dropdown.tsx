// import {
//   ReferenceElement,
//   computePosition,
//   flip,
//   shift,
// } from '@floating-ui/dom';
import { Menu } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';

import { AppLink } from '../../../AppLink/AppLink';
import { mapDirectionClass } from '../../styles/consts';

import popupCls from './../../styles/popup.module.scss';
import cls from './Dropdown.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';

export interface DropdownItem {
  disabled?: boolean;
  content?: ReactNode;
  onClick?: () => void;
  href?: string;
}

interface DropdownProps {
  className?: string;
  items: DropdownItem[];
  trigger?: ReactNode;
  direction?: DropdownDirection;
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export function Dropdown(props: DropdownProps) {
  const { className, items, trigger, direction = 'bottom right' } = props;

  // const [flag, setFlag] = useState(false);

  // const refBtn = useRef<any>();
  // const tooltip = useRef<any>();

  // useEffect(() => {
  //   if (tooltip.current) {
  //     computePosition(refBtn.current as any, tooltip.current, {
  //       placement: 'top',
  //       middleware: [flip(), shift({ padding: 5 })],
  //     }).then(({ x, y }) => {
  //       console.log(tooltip.current.style);

  //       Object.assign(tooltip.current.style, {
  //         left: `${x}px`,
  //         top: `${y}px`,
  //       });
  //     });
  //   }
  // }, [flag]);

  const menuClasses = [mapDirectionClass[direction]];

  return (
    <Menu
      as="div"
      className={classNames(cls.dropdown, {}, [className, popupCls.popup])}
    >
      <Menu.Button
        // onClick={() => setFlag(!flag)}
        // ref={refBtn}
        className={popupCls.trigger}
      >
        {trigger}
      </Menu.Button>
      <Menu.Items
        // ref={tooltip}
        className={classNames(cls.menu, {}, menuClasses)}
      >
        {items.map((item, i) => {
          const content = ({ active }: { active: boolean }) => {
            return (
              <button
                type="button"
                onClick={item.onClick}
                disabled={item.disabled}
                className={classNames(cls.item, { [cls.active]: active }, [])}
              >
                {item.content}
              </button>
            );
          };

          if (item.href) {
            return (
              <Menu.Item
                key={i}
                as={AppLink}
                to={item.href}
                disabled={item.disabled}
              >
                {content}
              </Menu.Item>
            );
          }
          return (
            <Menu.Item key={i} as={Fragment} disabled={item.disabled}>
              {content}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
}
