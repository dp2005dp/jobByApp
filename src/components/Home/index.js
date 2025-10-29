import Header from '../Header'
import {Link} from 'react-router-dom'
import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="home-bg-container">
      <div className="responsive-home-container">
        <h1 className="home-main-heading">Find The Job That Fits Your Life</h1>
        <p className="home-descripition">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>

        <Link to="/jobs">
          <button type="button" className="find-jobs-button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </>
)

export default Home
