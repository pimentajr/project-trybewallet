import React from 'react';
import PropTypes from 'prop-types';

class Layout extends React.Component {
  componentDidMount() {
    const { title } = this.props;

    document.title = `${title ? `${title} | ` : ''}Trybe Wallet`;
  }

  render() {
    const { children } = this.props;

    return (
      <>
        <header>
          <h1>Trybe Wallet</h1>
        </header>
        { children }
        <footer>
          <p>
            Trybe Wallet por
            <a href="https://github.com/MarceloPalochas"> Marcelo Araujo</a>
          </p>
        </footer>
      </>
    );
  }
}

Layout.defaultProps = {
  title: '',
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

export default Layout;
