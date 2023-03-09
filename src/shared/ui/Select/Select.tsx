import { ChangeEvent, memo, useMemo } from 'react';

import { Mods, classNames } from 'shared/lib/classNames/classNames';

import cls from './Select.module.scss';

export interface SelectOptions {
  value: string;
  content: string;
}

interface SelectProps {
  className?: string;
  label?: string;
  options?: SelectOptions[];
  value?: string;
  readonly?: boolean;
  onChange?: (value: string) => void;
}

export const Select: React.FC<SelectProps> = memo((props) => {
  const { className, label, options, onChange, value, readonly } = props;

  const mods: Mods = {
    [cls.readonly]: readonly,
  };

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value);
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
});
