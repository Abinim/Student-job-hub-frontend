import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

import './Footer.css';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-container'>
        <div className='footer-links'>
          <h3>Links</h3>
          <ul>
            <li>
              <a href='#'>M</a>
            </li>
            <li>
              <a href='#'>H</a>
            </li>
            <li>
              <a href='#'>C</a>
            </li>
            <li>
              <a href='#'>D</a>
            </li>
            <li>
              <a href='#'>JoBhUnT Home</a>
            </li>
          </ul>
        </div>
        <div className='footer-social'>
          <h3>Social media</h3>
          <ul>
            <li>
              <a href='https://www.facebook.com/'>
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
            </li>
            <li>
              <a href='https://www.instagram.com/'>
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </li>
            <li>
              <a href='https://twitter.com/'>
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </li>
            <li>
              <a href='https://www.youtube.com/'>
                <FontAwesomeIcon icon={faYoutube} />
              </a>
            </li>
          </ul>
        </div>
        <div className='footer-contact'>
          <h3>Contact</h3>
          <ul>
            <li>
              <a href='#'>A</a>
            </li>
            <li>
              <a href='#'>P</a>
            </li>
            <li>
              <a href='#'>D</a>
            </li>
            <li>
              <a href='#'>C</a>
            </li>
          </ul>
        </div>
      </div>
      <div className='footer-bottom'>
        <p>&copy; 2024 JoBhUnT. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
