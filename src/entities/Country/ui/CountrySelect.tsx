import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';
import { ListBox } from 'shared/ui/ListBox/ListBox';
import { Select } from 'shared/ui/Select/Select';

import { Country } from '../model/types/country';

interface CountrySelectProps {
  className?: string;
  value?: Country;
  onChange?: (value: Country) => void;
  readonly?: boolean;
}

const options = [
  { value: Country.Russia, content: Country.Russia },
  { value: Country.Belarus, content: Country.Belarus },
  { value: Country.George, content: Country.George },
];

export const CountrySelect: React.FC<CountrySelectProps> = memo((props) => {
  const { className, value, onChange, readonly } = props;

  const { t } = useTranslation();

  const onChangeHandler = useCallback(
    (value: string) => {
      onChange?.(value as Country);
    },
    [onChange],
  );

  return (
    <ListBox
      defaultValue={t('Укажите страну')}
      items={options}
      label={t('Укажите страну')}
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
  //     label={t('Укажите страну')}
  //     options={options}
  //     value={value}
  //     onChange={onChangeHandler}
  //     readonly={readonly}
  //   />
  // );
});
