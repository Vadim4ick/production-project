import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';
import { ListBox } from 'shared/ui/ListBox/ListBox';
import { Select } from 'shared/ui/Select/Select';

import { Currency } from '../../model/types/currency';

interface CurrencySelectProps {
  className?: string;
  value?: Currency;
  onChange?: (value: Currency) => void;
  readonly?: boolean;
}

const options = [
  { value: Currency.RUB, content: Currency.RUB },
  { value: Currency.EUR, content: Currency.EUR },
  { value: Currency.USD, content: Currency.USD },
];

export const CurrencySelect: React.FC<CurrencySelectProps> = memo((props) => {
  const { className, value, onChange, readonly } = props;

  const { t } = useTranslation();

  const onChangeHandler = useCallback(
    (value: string) => {
      onChange?.(value as Currency);
    },
    [onChange],
  );

  return (
    <ListBox
      defaultValue={t('Укажите валюту')}
      items={options}
      label={t('Укажите валюту')}
      value={value}
      className={classNames('', {}, [className])}
      onChange={onChangeHandler}
      readonly={readonly}
      direction={'top right'}
    />
  );

  // return (
  //   <Select
  //     className={classNames('', {}, [className])}
  //     label={t('Укажите валюту')}
  //     options={options}
  //     value={value}
  //     onChange={onChangeHandler}
  //     readonly={readonly}
  //   />
  // );
});
