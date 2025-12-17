import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  hover = false, 
  onClick 
}) => {
  const classes = `card ${hover ? 'card-hover' : ''} ${className}`;

  return (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;