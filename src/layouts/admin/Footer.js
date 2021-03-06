
import {BrowserRouter as Link} from 'react-router-dom'
function Footer(){
  return (
    <footer className="py-4 bg-light mt-auto">
      <div className="container-fluid px-4">
        <div className="d-flex align-items-center justify-content-between small">
          <div className="text-muted">Copyright &copy; Your Website 2021</div>
          <div>
            <p to="/">Privacy Policy</p>
            &middot;
            <p to="/">Terms &amp; Conditions</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
