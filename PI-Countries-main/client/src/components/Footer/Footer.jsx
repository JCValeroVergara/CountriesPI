import React from 'react';

const Footer = () => {
   return (
      <footer className="footer">
         <div style={{ display: 'flex', alignItems: 'center' }}>
         <h4>
            PI Countries | Developed by Juan Carlos Valero &copy;{' '}
            {new Date().getFullYear()}
         </h4>
         <a href="https://www.linkedin.com/in/juan-carlos-valero-v-524403265/">
            <img
               className="logoFooterLI"
               src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png"
               alt="LinkedIn"
            />
         </a>
         <a href="https://github.com/JCValeroVergara">
            <img
               className="logoFooterGH"
               src="https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_960_720.png"
               alt="Github"
            />
         </a>
         </div>
      </footer>
   );
};

export default Footer;
