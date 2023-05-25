import React from 'react';
import notFoundImage from '../../assets/404.jpg'

const NotFound = () => {
   return (
      <div>
         <h1>Error 404: Page not found</h1>
         <p>The page you are looking for does not exist</p>
         <img
         src={notFoundImage}
         alt="page NOT FOUND¡¡¡¡"
         style={{ maxWidth: '50%', maxHeight: '50%' }}
         />
      </div>
   );
   };

export default NotFound;
