import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <Link to="/not-found" className="link">
    <div className="notfound-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        className="notfound-image"
        alt="not found"
      />
      <h1 className="not-found-content">Page Not Found</h1>
      <p className="not-found-content">
        We are sorry, the page you requested could not be found
      </p>
    </div>
  </Link>
)

export default NotFound