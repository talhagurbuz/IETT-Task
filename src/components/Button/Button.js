import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = ({ text, onClick, variant = 'primary', type = 'button' }) => {
  return (
    <button 
      className={`btn btn-${variant}`} 
      onClick={onClick} 
      type={type}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'info']),
  type: PropTypes.string,
};

export default Button;
