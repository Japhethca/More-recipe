import React, { Component } from 'react';
import './footer.scss';

class Footer extends Component {
  render() {
    return (
      <div>
        <footer className="page-footer">
          <div className="footer-copyright">
            <div className="container center">
                    © 2017 More Recipe
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
