import React from 'react'
import { Link } from 'react-router-dom'
import css from './Button.module.css'

const Button = ({text, to, size}) => {
  return (
      <Link to={to} >
          <button className={`${css.button} ${css[size]}`}>{text}</button>
      </Link>
  )
}

export default Button