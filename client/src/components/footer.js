import React from 'react'
import "../stylesheets/footer.css"; // import your footer styles


function Footer() {
    return (
      <footer className="footer">
        <div>
        <div className="footer-t">CONTÁCTANOS 
        </div>  
        <div className="footer-t">WEB: Bogotá: (601)348 9898 | Resto del país: 01 8000 120320 | sac@mojaraprice.co
        </div>
        <div className="footer-t">servicio .al. cliente@mojarraprice. com.co                                                         
        </div>
        <div className="footer-t">Whatsapp: 3290188291  
        </div>
        <div className='footer-t'>Siguenos en:
        </div>
          <div className=' redes'>
          <div className='facebook'></div>
          <div className='youtube'></div>
          <div className='instagram'></div>
          <div className='twitter'></div>
          </div>
        </div>
        <div className='mojarralogo'></div>
      </footer>
    );
  }
  
  export default Footer;