import React from 'react';
import { RenderIf } from '..';

interface IProps extends React.HTMLProps<HTMLInputElement> {
  type?: React.HTMLInputTypeAttribute;
  errors?: any;
  touched?: any;
  className?: string;
}

const InputField = (props: IProps) => {
  const {
    name = 'name',
    id,
    errors = {},
    touched = {},
    className,
    label,
    ...restProps
  } = props;

  const hasError = (errors[name] && touched[name]) || false;

  return (
    <div className={`app__form__field ${hasError ? 'has_error' : ''} ${className || ''}`}>
      <div className="d-flex flex-column">
        <RenderIf condition={!!label}>
          <label htmlFor={id}>{label}</label>
        </RenderIf>

        <input {...{ ...restProps, id, name }} />
      </div>
      <RenderIf condition={hasError}>
        <div>
          <p className="app__form__field-error">{errors[name]}</p>
        </div>
      </RenderIf>
    </div>
  );
};

export default InputField;
