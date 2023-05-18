import React from 'react';
import { Link } from 'react-router-dom';

const ButtonHome = () => {
  return (
    <div>
      
        <button>
          <Link to="/home">Home</Link>
        </button>
      
    </div>
  );
};

export default ButtonHome;