import  { useState, useEffect } from "react";
import './about.css'; // Fichier CSS

const About = () => {
  // État pour suivre si le mode sombre est activé
  const [darkMode, setDarkMode] = useState(false);

  // Détecte si le mode sombre est activé ou non
  useEffect(() => {
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(prefersDarkMode);
  }, []);

  // Change le thème en fonction de l'état darkMode
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return (
    <div className={`container py-5 ${darkMode ? 'dark-mode' : ''}`}>
      {/* Shipping Policy Section */}
      <section className="mb-5 p-4 bg-light rounded-4 shadow-sm">
        <div className="row align-items-center mb-4">
          <div className="col-md-8">
            <h1 className="display-5 fw-bold text-danger mb-3">
              <i className="bi bi-truck me-3"></i>
              Shipping Policy with FTS
            </h1>
            <div className="d-flex align-items-center bg-white p-3 rounded-3 mb-3">
              <i className="bi bi-lightning-charge-fill text-warning fs-3 me-3"></i>
              <p className="lead mb-0">
                We provide <strong className="text-danger">same day shipping</strong> if your order is placed before{" "}
                <strong className="text-danger">3PM EST</strong>. Tracking available upon request!
              </p>
            </div>
          </div>
          <div className="col-md-4 text-center">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/3710/3710277.png" 
              alt="Shipping" 
              className="img-fluid"
              style={{maxHeight: "150px"}}
            />
          </div>
        </div>

        <div className="bg-white p-4 rounded-4">
          <h3 className="fw-bold mb-4 text-dark">
            <i className="bi bi-currency-exchange me-2"></i>
            Refund Policy
          </h3>
          
          <div className="row g-4">
            <div className="col-md-4">
              <div className="p-3 border border-success border-2 rounded-3 h-100">
                <div className="d-flex align-items-center mb-2">
                  <span className="badge bg-success me-2">✅</span>
                  <h5 className="fw-bold mb-0 text-success">100% Refund</h5>
                </div>
                <p className="mb-0">If we make an error sending to the provided address.</p>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="p-3 border border-warning border-2 rounded-3 h-100">
                <div className="d-flex align-items-center mb-2">
                  <span className="badge bg-warning me-2">⚖️</span>
                  <h5 className="fw-bold mb-0 text-warning">50% Refund</h5>
                </div>
                <p className="mb-0">If tracking doesn't update for more than 14 days.</p>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="p-3 border border-danger border-2 rounded-3 h-100">
                <div className="d-flex align-items-center mb-2">
                  <span className="badge bg-danger me-2">❌</span>
                  <h5 className="fw-bold mb-0 text-danger">0% Refund</h5>
                </div>
                <ul className="mb-0 small">
                  <li>Tracking shows delivered but claimed not received</li>
                  <li>Incorrect shipping information provided</li>
                  <li>Package returned undeliverable</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="p-4 bg-success bg-opacity-10 rounded-4 shadow-sm">
        <div className="row align-items-center">
          <div className="col-lg-5 mb-4 mb-lg-0">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/2639/2639018.png" 
              alt="Cannabis" 
              className="img-fluid rounded-4"
            />
          </div>
          <div className="col-lg-7">
            <h1 className="display-5 fw-bold mb-4 text-success">
              <i className="bi bi-cannabis me-3"></i>
              Welcome to GasPass 🍁
            </h1>
            
            <div className="bg-white p-4 rounded-4">
              <div className="d-flex mb-3">
                <div className="me-3 text-success">
                  <i className="bi bi-check-circle-fill fs-4"></i>
                </div>
                <p className="mb-0">
                  GasPass is a collective of cannabis connoisseurs passionate about the <strong>art of cultivation</strong>.
                </p>
              </div>
              
              <div className="d-flex mb-3">
                <div className="me-3 text-success">
                  <i className="bi bi-check-circle-fill fs-4"></i>
                </div>
                <p className="mb-0">
                  A decade of perfecting our craft to deliver the <strong>highest quality flower</strong> to enthusiasts.
                </p>
              </div>
              
              <div className="d-flex mb-3">
                <div className="me-3 text-success">
                  <i className="bi bi-check-circle-fill fs-4"></i>
                </div>
                <p className="mb-0">
                  Bridging states to provide access to <strong>premium, potent cannabis</strong>.
                </p>
              </div>
              
              <div className="d-flex">
                <div className="me-3 text-success">
                  <i className="bi bi-check-circle-fill fs-4"></i>
                </div>
                <p className="mb-0">
                  Expect <strong>transparency</strong>, <strong>competitive pricing</strong>, <strong>discreet packaging</strong>, and <strong>speedy delivery</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 bg-white p-3 rounded-3 text-center">
          <h5 className="fw-bold mb-3">Our Promise to You</h5>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <span className="badge bg-success bg-opacity-25 text-success p-2">
              <i className="bi bi-shield-check me-1"></i> Quality Guaranteed
            </span>
            <span className="badge bg-primary bg-opacity-25 text-primary p-2">
              <i className="bi bi-lock me-1"></i> Discreet Shipping
            </span>
            <span className="badge bg-danger bg-opacity-25 text-danger p-2">
              <i className="bi bi-lightning-charge me-1"></i> Fast Delivery
            </span>
            <span className="badge bg-warning bg-opacity-25 text-warning p-2">
              <i className="bi bi-currency-dollar me-1"></i> Fair Pricing
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
