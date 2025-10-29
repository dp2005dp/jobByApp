import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {IoMdHome, IoIosLogOut} from 'react-icons/io'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          className="header-logo"
          alt="website logo"
        />
      </Link>
      <ul className="features-flex-container">
        <Link to="/" className="link">
          <li className="features-list">
            <p className="features">Home</p>
            <IoMdHome className="mobile-view-icons" />
          </li>
        </Link>

        <Link to="/jobs" className="link">
          <li className="features-list">
            <p className="features">Jobs</p>
            <BsBriefcaseFill className="mobile-view-icons" />
          </li>
        </Link>
        <li className="features-list">
          <button type="button" className="logout-button" onClick={onLogout}>
            Logout
          </button>
          <IoIosLogOut className="mobile-view-icons" onClick={onLogout} />
        </li>
      </ul>
    </nav>
  )
}
export default withRouter(Header)
