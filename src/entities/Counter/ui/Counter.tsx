/* eslint-disable i18next/no-literal-string */
import { useCounterValue } from '../model/selectors/getCounterValue/getCounterValue';
import { useCounterActions } from '../model/slice/counterSlice';

import { Button } from '@/shared/ui/deprecated/Button';

export const Counter = () => {
  const counterValue = useCounterValue();

  const { decrement, increment, addFive } = useCounterActions();

  const handelIncrement = () => {
    increment();
  };

  const handelDecrement = () => {
    decrement();
  };
  const handelAddFive = () => {
    addFive(5);
  };

  return (
    <div>
      <h1 data-testid="value-title">{counterValue}</h1>
      <Button data-testid="increment-btn" onClick={handelIncrement}>
        increment
      </Button>
      <Button data-testid="decrement-btn" onClick={handelDecrement}>
        decrement
      </Button>
      <Button onClick={handelAddFive}>decrement</Button>
    </div>
  );
};
