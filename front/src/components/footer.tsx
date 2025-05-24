import "./footercss.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import potatoImg from '../assets/potato.png'; 
const Footer = () => {
  return (
    <div className="container">
      <footer className="py-5">
        <div className="row">
          <div className="col-6 col-md-2 mb-3">
            <h5>Product Sections</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="/products" className="nav-link p-0 text-body-secondary">
                  All Products
                </a>
              </li>
            </ul>
          </div>

          <div className="col-6 col-md-2 mb-3">
            <h5>Quick Links</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2"><a href="/home" className="nav-link p-0 text-body-secondary">Home</a></li>
              <li className="nav-item mb-2"><a href="/products" className="nav-link p-0 text-body-secondary">Products</a></li>
              <li className="nav-item mb-2"><a href="/contact" className="nav-link p-0 text-body-secondary">Contact</a></li>
              <li className="nav-item mb-2"><a href="/blog" className="nav-link p-0 text-body-secondary">Blog</a></li>
            </ul>
          </div>

          <div className="col-md-5 offset-md-1 mb-3">
            <form>
              <h5>Subscribe to our newsletter</h5>
              <p>Monthly digest of what's new and exciting from us.</p>
              <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                <label htmlFor="newsletter1" className="visually-hidden">Email address</label>
                <input id="newsletter1" type="email" className="form-control" placeholder="Email address" required />
                <button className="btn btn-danger" type="submit">Subscribe</button>
              </div>
            </form>
          </div>
        </div>

        <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
          <p>© 2025 Dr-MKO, Inc. All rights reserved.</p>
          <ul className="list-unstyled d-flex">

            {/* Linktree */}
            <li className="ms-3">
              <a className="link-body-emphasis" href="https://linktr.ee/BIGGASPASS" target="_blank" rel="noopener noreferrer">
                <img src="logo.png" alt="gaspass" className="logo"/>
                
              </a>
            </li>

            {/* Telegram Contact */}
            <li className="ms-3">
              <a className="link-body-emphasis" href="https://t.me/GaspassReal" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-telegram fa-lg"></i>
              </a>
            </li>

            {/* Telegram Menu */}
            <li className="ms-3">
              <a className="link-body-emphasis" href="https://t.me/gaspass_new" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-telegram-plane fa-lg"></i>
              </a>
            </li>

            {/* Potato Menu */}
            <li className="ms-3">
              <a className="link-body-emphasis" href="https://diptm.org/gaspass" target="_blank" rel="noopener noreferrer">
                <img src={potatoImg} alt="potato" className="logo" />
              </a>
            </li>

            {/* Signal DM */}
            <li className="ms-3">
              <a className="link-body-emphasis" href="https://signal.me/#eu/-Wf8gt7vEtIVzSY08xQlyEjqPxycxqbZoJXzIdpURrTOgd-GXqJJxJEMiW8tpIJe" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-signal-messenger fa-lg"></i> {/* Si dispo sinon alternative ci-dessous */}
              </a>
            </li>

          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Footer;