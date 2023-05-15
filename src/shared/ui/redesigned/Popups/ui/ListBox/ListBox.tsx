import { Listbox as HListBox } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';

import { Button } from '../../../Button/Button';
import { mapDirectionClass } from '../../styles/consts';

import popupCls from './../../styles/popup.module.scss';
import cls from './ListBox.module.scss';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';

export interface ListBoxItem {
  value: string;
  content: ReactNode;
  disabled?: boolean;
}

interface ListBoxProps {
  items?: ListBoxItem[];
  className?: string;
  value?: string;
  defaultValue?: string;
  onChange: <T extends string>(value: T) => void;
  readonly?: boolean;
  label?: string;
  direction?: DropdownDirection;
}

export function ListBox(props: ListBoxProps) {
  const {
    className,
    items,
    value,
    defaultValue,
    onChange,
    readonly,
    label,
    direction = 'bottom left',
  } = props;

  const optionsClasses = [mapDirectionClass[direction], popupCls.menu];

  const mods: Mods = {
    [cls.readonly]: readonly,
  };

  return (
    <HListBox
      disabled={readonly}
      as="div"
      className={classNames(cls.content, mods, [className])}
      value={value}
      onChange={onChange}
    >
      {label && <span className={cls.label}>{label + '>'}</span>}

      <div
        className={classNames(cls.listBox, mods, [className, popupCls.popup])}
      >
        <HListBox.Button as={'div'}>
          <Button className={cls.trigger}>{value ?? defaultValue}</Button>
        </HListBox.Button>

        <HListBox.Options
          className={classNames(cls.options, {}, optionsClasses)}
        >
          {items?.map((item) => (
            <HListBox.Option
              key={item.value}
              value={item.value}
              as={Fragment}
              disabled={item.disabled}
            >
              {({ active, selected }) => (
                <li
                  className={classNames(
                    cls.item,
                    {
                      [cls.active]: active,
                      [popupCls.disabled]: item.disabled,
                    },
                    [],
                  )}
                >
                  {selected && '!!!'}
                  {item.content}
                </li>
              )}
            </HListBox.Option>
          ))}
        </HListBox.Options>
      </div>
    </HListBox>
  );
}
