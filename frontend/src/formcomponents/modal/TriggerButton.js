import React from 'react';
import '../../components/Header.css';


const Trigger = ({ triggerText, buttonRef, showModal }) => {
  return (
    <button
    className='loginButton'  
      ref={buttonRef}
      onClick={showModal}
    >
      {triggerText}
    </button>
  );
};
export default Trigger;