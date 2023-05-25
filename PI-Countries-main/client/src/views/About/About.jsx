import React from 'react';
import style from './About.module.css';
import htmlImg from '../../assets/html.png';
import cssImg from '../../assets/css.svg';
import javascriptImg from '../../assets/javascript.png';
import reactImg from '../../assets/react1.png';
import reduImg from '../../assets/redu.png';

const About = () => {
  return (
    <div className={style.container}>
      <div className={style.container1}>
        <h4>
          PI Countries | Developed by Juan Carlos Valero &copy;{' '}
          {new Date().getFullYear()}
        </h4>
        <a href="https://www.linkedin.com/in/juan-carlos-valero-v-524403265/">
          <img
            className={style.logoLI}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png"
            alt="LinkedIn"
          />
        </a>
        <a href="https://github.com/JCValeroVergara">
          <img
            className={style.logoGH}
            src="https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_960_720.png"
            alt="Github"
          />
        </a>
        <ul className={style.unorderedList}>
          <li className={style.listItem}>
            <img src={htmlImg} alt="HTML" /> HTML{' '}
          </li>
          <li className={style.listItem}>
            <img src={cssImg} alt="CSS" /> CSS{' '}
          </li>
          <li className={style.listItem}>
            <img src={javascriptImg} alt="JavaScript" />
            JavaScript
          </li>
          <li className={style.listItem}>
            <img src={reactImg} alt="React" />
            React
          </li>
          <li>
            <img src={reduImg} alt="Redux" />
            Redux
          </li>
        </ul>
      </div>
    </div>
  );
};

export default About;
