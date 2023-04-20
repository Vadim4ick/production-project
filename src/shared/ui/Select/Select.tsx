import { ChangeEvent, useMemo } from 'react';

import { Mods, classNames } from '@/shared/lib/classNames/classNames';

import cls from './Select.module.scss';

export interface SelectOptions<T extends string> {
  value: T;
  content: string;
}

interface SelectProps<T extends string> {
  className?: string;
  label?: string;
  options?: SelectOptions<T>[];
  value?: T;
  readonly?: boolean;
  onChange?: (value: T) => void;
}

export const Select = <T extends string>(props: SelectProps<T>) => {
  const { className, label, options, onChange, value, readonly } = props;

  const mods: Mods = {
    [cls.readonly]: readonly,
  };

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value as T);
  };

  const optionsList = useMemo(() => {
    return options?.map((opt) => (
      <option className={cls.option} value={opt.value} key={opt.value}>
        {opt.content}
      </option>
    ));
  }, [options]);

  return (
    <div className={classNames(cls.wrapper, mods, [className])}>
      {label && <span className={cls.label}>{label + '>'}</span>}

      <select
        disabled={readonly}
        value={value}
        className={cls.select}
        onChange={onChangeHandler}
      >
        {optionsList}
      </select>
    </div>
  );
};
