import { Link } from "react-router-dom";
import "../styles/Footer.css";
import appQr from "../assets/footerImg/appQr.png";
import appstoreImg from "../assets/footerImg/appstoreImg.png";
import playstoreImg from "../assets/footerImg/playstoreImg.png";
import linkedinIcon from "../assets/socialcons/LinkedIn.png"
import twitterIcon from "../assets/socialcons/Twitter.png"
import instagramIcon from "../assets/socialcons/Instagram.png"
import facebookIcon from "../assets/socialcons/Facebook.png"
// importing custom hooks 
import useScrollAnimation from '../hooks/UseScrollAnimation';

function Footer() {
  const elementRef = useScrollAnimation('fade-up');
  return (
    <footer ref={elementRef}>
      <div className="footer-div">
        <section className="download-app-sec">
          <h3 className="footer-heading">Download App</h3>
          <div className="qr-container | text-center two-col-grid">
            <img src={appQr} alt={appQr} />
            <img src={appQr} alt={appQr} />
          </div>
          <div className="download-icon-links | text-center two-col-grid">
            <a href="/">
              <img src={appstoreImg} alt={appstoreImg} />
            </a>
            <a href="/">
              <img src={playstoreImg} alt={playstoreImg} />
            </a>
          </div>
        </section>

        <section className="footer-nav-sec">
          <div className="footer-nav-div | block p-50 flex two-col-grid">
              <nav>
                <ul>
                  <li>
                    <Link
                      to="/"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/upload"
                    >
                      Upload
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="https://msng.link/o?logicspine=tg"
                    >
                      Community
                    </Link>
                  </li>
                  {/* <li>
                    <Link
                      to="/blogs"
                    >
                      Blog
                    </Link>
                  </li> */}
                  <li>
                    <Link
                      to="/contact"
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </nav>
              <nav>
                <ul>
                <li>
                    <Link
                      to="/privacy"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  
                <li>
                    <Link
                      to="/terms"
                    >
                      Consumer Terms
                    </Link>
                  </li>
                <li>
                    <Link
                      to="/disclaimer"
                    >
                      Disclaimer
                    </Link>
                  </li>
                  
                </ul>
              </nav>
          </div>
        </section>

        <section className="social-icons-sec">
          <div className="social-icons-div">
            <h3 className="footer-heading text-right">Follow Us</h3>
            <div className="footer-icons-div | mt-200">
              <ul>
                <li>
                  <Link to="/">
                    <img src={linkedinIcon} alt=".." />
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <img src={twitterIcon} alt=".." />
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <img src={instagramIcon} alt=".." />
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <img src={facebookIcon} alt=".." />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
}

export default Footer;
