import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    failedLoginMessage: '',
    failMessage: false,
  }

  successLogin = jobToken => {
    Cookies.set('jwt_token', jobToken.jwt_token, {expires: 7})
    const {history} = this.props
    history.replace('/')
  }

  userLogin = async event => {
    event.preventDefault()

    const {username, password} = this.state

    const userDeatails = {username, password}
    const loginApi = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDeatails),
    }

    const response = await fetch(loginApi, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.successLogin(data)
    } else {
      this.setState({failedLoginMessage: data.error_msg, failMessage: true})
    }
  }

  onUsername = event => {
    this.setState({username: event.target.value})
  }

  onPassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {failedLoginMessage, failMessage} = this.state
    const getJwtToken = Cookies.get('jwt_token')
    if (getJwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div className="login-card-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="login-logo"
            alt="website logo"
          />
          <form onSubmit={this.userLogin}>
            <div className="margin">
              <label htmlFor="username" className="label">
                USERNAME
              </label>
              <br />
              <input
                type="text"
                className="input-container"
                id="username"
                placeholder="Username"
                onChange={this.onUsername}
              />
            </div>

            <div className="margin">
              <label htmlFor="password" className="label">
                PASSWORD
              </label>
              <br />
              <input
                type="password"
                className="input-container"
                id="password"
                placeholder="Password"
                onChange={this.onPassword}
              />
            </div>

            <button className="login-button" type="submit">
              Login
            </button>
            {failMessage && (
              <p className="failed-login-message">{`* ${failedLoginMessage}`}</p>
            )}
          </form>
        </div>
      </div>
    )
  }
}

export default Login