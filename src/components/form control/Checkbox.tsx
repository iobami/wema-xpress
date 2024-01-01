import React, { ChangeEvent } from 'react';

interface IProps {
  name?: string;
  title?: string;
  id?: string;
  className?: string;
  checked: boolean;
  // eslint-disable-next-line
  onChange: (checked: boolean) => void;
  labelClass?: string;
}

const CheckBox = (props: IProps) => {
  const {
    name, title, id, checked, className, onChange, labelClass,
  } = props;

  return (
    <div className={`form-check form-check-inline mb-0 app__checkbox__con d-flex align-items-center gap-2 ${className || ''}`}>
      <input
        checked={checked}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          onChange(e.target.checked);
        }}
        type="checkbox"
        id={`customRadio_${id}`}
        name={name}
        className="form-check-input cursor-pointer"
      />
      {!!title && (
        <label
          className={`form-check-label cursor-pointer ${labelClass}`}
          htmlFor={`customRadio_${id}`}
        >
          {title}
        </label>
      )}
    </div>
  );
};

export default CheckBox;
