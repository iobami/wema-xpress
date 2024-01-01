import React, { ReactNode } from 'react';

interface IProps extends Omit<React.HTMLProps<HTMLButtonElement>, 'size'> {
  title?: string;
  isLoading?: boolean;
  href?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  variant?: 'outline' | 'contained' | 'text';
  size?: 'sm' | 'md' | 'lg';
  color?: 'dark' | 'grey' | 'orange' | 'red' | 'transparent';
  children?: ReactNode;
}

export default function SubmitButton(props: IProps) {
  const {
    title,
    className,
    isLoading,
    href,
    onClick,
    variant = 'contained',
    size = 'lg',
    children,
    color,
    ...restProps
  } = props;

  if (href) {
    return (
      <a
        href={href}
        className={`btn w-100 app__submit__button ${variant} ${size} ${color} ${className}`}
      >
        {title || children}
      </a>
    );
  }

  const spinner = (
    <div className="d-flex justify-content-center align-items-center app__submit__button__spinner">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <button
        disabled={isLoading}
        type="submit"
        className={`btn w-100 app__submit__button position-relative ${variant} ${size} ${color || ''} ${className || ''}`}
        {...restProps}
      >
        {spinner}
        <span className="invisible">{title || children}</span>
      </button>
    );
  }

  return (
    <button
      type={onClick ? 'button' : 'submit'}
      onClick={onClick}
      className={`btn w-100 app__submit__button ${variant} ${size} ${color} ${className}`}
      {...restProps}
    >
      {title || children}
    </button>
  );
}
