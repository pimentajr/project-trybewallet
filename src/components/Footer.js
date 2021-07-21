import React from 'react';
import './footer.css';

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <p className="footer-item">
          Projeto desenvolvido por
          {' '}
          <b className="footer-item">Laura Gusmão</b>
          {' '}
          durante o curso de Desenvolvimento Web da
          {' '}
          <a
            className="footer-item"
            href="https://www.betrybe.com/"
            rel="noreferrer"
            target="_blank"
          >
            Trybe
          </a>
          .
        </p>
        <nav className="footer-item">
          <a
            className="footer-item"
            href="https://www.linkedin.com/in/laurargusmao/"
            rel="noreferrer"
            target="_blank"
          >
            LinkedIn
          </a>
          <a
            className="footer-item"
            href="https://github.com/LauraGusmao"
            rel="noreferrer"
            target="_blank"
          >
            GitHub
          </a>
        </nav>
      </footer>
    );
  }
}

export default Footer;
