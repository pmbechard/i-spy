import React from 'react';
import githubIcon from '../../img/github.png';

const Footer = () => {
  return (
    <footer>
      The content of this site is copyright-protected and is the property of
      Peyton Bechard.
      <img
        src={githubIcon}
        alt='GitHub'
        onClick={() =>
          window.open('https://www.github.com/pmbechard/i-spy', '_blank')
        }
      />
    </footer>
  );
};

export default Footer;
