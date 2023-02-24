/* eslint-disable react/display-name */
import {
  ChangeEvent,
  InputHTMLAttributes,
  memo,
  useEffect,
  useRef,
  useState,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Input.module.scss';

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange'
>;

interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  autofocus?: boolean;
}

export const Input: React.FC<InputProps> = memo((props) => {
  const {
    className,
    value,
    onChange,
    type = 'text',
    placeholder,
    autofocus,
    ...otherProps
  } = props;

  const ref = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [caretPosition, setCaretPosition] = useState(0);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
    setCaretPosition(e.target.value.length);
  };

  const onBlur = () => {
    setIsFocused(false);
  };

  const onFocus = () => {
    setIsFocused(true);
  };

  const onSelect = (e: ChangeEvent<HTMLInputElement>) => {
    setCaretPosition(e?.target?.selectionStart || 0);
  };

  useEffect(() => {
    if (autofocus) {
      setIsFocused(true);
      ref.current?.focus();
    }
  }, [autofocus]);

  return (
    <div className={classNames(cls.inputWrapper, {}, [className as string])}>
      {placeholder && (
        <div className={cls.placeholder}>{placeholder + ' >'}</div>
      )}

      <div className={cls.caretWrapper}>
        <input
          ref={ref}
          className={cls.input}
          type={type}
          value={value}
          onChange={onChangeHandler}
          onFocus={onFocus}
          onBlur={onBlur}
          onSelect={onSelect}
          {...otherProps}
        />

        {/* {type === 'password' && (
          <Button
            onClick={onPass}
            theme={ThemeButton.CLEAR}
            className={cls.icon}
          >
            <Eye />
          </Button>
        )} */}

        {isFocused && (
          <span
            style={{ left: `${caretPosition * 9}px` }}
            className={cls.caret}
          ></span>
        )}
      </div>
    </div>
  );
});
