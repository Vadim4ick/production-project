import { Listbox as HListBox } from '@headlessui/react';
import { Fragment, ReactNode, useMemo } from 'react';

import { Button } from '../../../Button';
import { Icon } from '../../../Icon';
import { mapDirectionClass } from '../../styles/consts';

import popupCls from './../../styles/popup.module.scss';
import cls from './ListBox.module.scss';
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { DropdownDirection } from '@/shared/types/ui';

export interface ListBoxItem<T extends string> {
  value: string;
  content: ReactNode;
  disabled?: boolean;
}

interface ListBoxProps<T extends string> {
  items?: ListBoxItem<T>[];
  className?: string;
  value?: T;
  defaultValue?: T;
  onChange: (value: T) => void;
  readonly?: boolean;
  label?: string;
  direction?: DropdownDirection;
}

export function ListBox<T extends string>(props: ListBoxProps<T>) {
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

  const selectedItem = useMemo(() => {
    return items?.find((item) => item.value === value);
  }, [items, value]);

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
        <ToggleFeatures
          feature="isAppRedesigned"
          off={
            <HListBox.Button as={'div'}>
              <Button className={cls.trigger}>
                {selectedItem?.content ?? defaultValue}
              </Button>
            </HListBox.Button>
          }
          on={
            <HListBox.Button as={'div'}>
              <Button variant="filled" addonRight={<Icon Svg={ArrowIcon} />}>
                {selectedItem?.content ?? defaultValue}
              </Button>
            </HListBox.Button>
          }
        />

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
                      [popupCls.selected]: selected,
                    },
                    [],
                  )}
                >
                  {selected}
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
