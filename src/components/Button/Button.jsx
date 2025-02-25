import React from 'react';
import { Link } from 'react-router-dom';
import css from './Button.module.css';

const Button = ({ text, to, onClick, size, transparent, center, disabled }) => {
  return (
    <Link to={to} onClick={onClick}>
      <button
        className={`${css.button} ${css[size]} ${transparent ? css.transparent : ''} ${center ? css.center : ''}`}
        disabled={disabled}
      >
        {text}
      </button>
    </Link>
  );
};

export default Button;
