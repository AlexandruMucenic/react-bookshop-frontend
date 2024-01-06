import React from 'react'
import { FaFacebook, FaGoodreads, FaInstagram } from 'react-icons/fa'
import './Footer.css'

const Footer: React.FC = () => {
  return (
    <footer className="footerContainer">
      {/* Details */}
      <div className="textContainer">
        <div className="detailsContainer">
          <h4>Address</h4>
          <p>500 Terry Francois Street San Francisco, CA 94158</p>
        </div>
        <div className="detailsContainer">
          <h4>Contact Us</h4>
          <p>Phone: 123-456-7890</p>
          <p>Email: info@mysite.com</p>
        </div>
        <div className="detailsContainer">
          <h4>Open Hours</h4>
          <p>Mon - Fri: 10am - 7pm</p>
        </div>
      </div>

      {/* Copyright & Icons */}
      <div className="copyrightContainer">
        <p>© 2023 Proudly created by Mius</p>
        <div className="iconContainer">
          <button>
            <FaFacebook />
          </button>
          <button>
            <FaInstagram />
          </button>
          <button>
            <FaGoodreads />
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
