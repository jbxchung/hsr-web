import { FC, FocusEvent, InputHTMLAttributes, useState } from 'react';

import './Input.scss';

const Input: FC<InputHTMLAttributes<HTMLInputElement>> = (props: InputHTMLAttributes<HTMLInputElement>) => {
  const [minimizePlaceholder, setMinimizePlaceholder] = useState<boolean>(!!props.value);

  const onFocus = (e: FocusEvent<HTMLInputElement>) => {
    setMinimizePlaceholder(true);
    props.onFocus?.(e);
  };

  const onBlur = (e: FocusEvent<HTMLInputElement>) => {
    setMinimizePlaceholder(!!props.value);
    props.onBlur?.(e);
  };

  return (
    <div className={`hsr-input ${minimizePlaceholder ? ' min-hint ' : ''}${props.className}`.trim()}>
      <span className={`placeholder`}>{props.placeholder}</span>
      <input
        value={props.value}
        onBlur={onBlur}
        onChange={props.onChange}
        onFocus={onFocus}
      />
    </div>
  );
}

export default Input;