import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faYoutube,
  faGit,
} from '@fortawesome/free-brands-svg-icons'; // Added faGit
import './Footer.css';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-container'>
        <div className='footer-links'>
          <h3>Links</h3>
          <ul>
            <li>
              <a href='https://www.metrolisboa.pt/'>Travel Card</a>
            </li>
            <li>
              <a href='https://www.sns.gov.pt/'>Health Care</a>
            </li>
            <li>
              <a href='https://www.holmesplace.com/'>Fitness Hub</a>
            </li>
            <li>
              <a href='https://www.visitportugal.com/'>Learn About Portugal</a>
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
              <a href='https://github.com/'>
                <FontAwesomeIcon icon={faGit} />
              </a>
            </li>
          </ul>
        </div>
        <div className='footer-contact'>
          <h3>Contacts</h3>
          <ul>
            <li>
              <FontAwesomeIcon icon={faEnvelope} />{' '}
              <a href='mailto:your@email.com'>abinim.bibek19@email.com</a>
            </li>
            <li>
              <FontAwesomeIcon icon={faPhone} />{' '}
              <a href='tel:+1234567890'>+351-910527001</a>
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
