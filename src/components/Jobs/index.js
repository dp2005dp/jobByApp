import {Component} from 'react'
import Header from '../Header'
import {ThreeDots} from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BsSearch, BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {FaStar} from 'react-icons/fa'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const renderStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loader: 'IN_PROSESS',
  intial: 'INTIAL',
}

class Jobs extends Component {
  state = {
    profileDetails: {
      name: '',
      profileImageUrl: '',
      shortBio: '',
    },
    jobDeatails: [],
    stateStatus: renderStatus.intial,
    profileStatus: renderStatus.intial,
    emtype: [],
    salary: '',
    searchJob: '',
    searchJobInput: '',
  }

  componentDidMount() {
    this.profileApi()
    this.jobsApi()
  }

  onSearchjob = () => {
    const {searchJob} = this.state
    this.setState({searchJobInput: searchJob}, this.jobsApi)
  }

  searchInput = event => {
    this.setState({searchJob: event.target.value})
  }

  salaryRange = id => {
    this.setState({salary: id}, this.jobsApi)
  }

  checkbox = id => {
    this.setState(prevState => {
      let updatedTypes = []
      if (prevState.emtype.includes(id)) {
        updatedTypes = prevState.emtype.filter(each => each !== id)
      } else {
        updatedTypes = [...prevState.emtype, id]
      }
      return {emtype: updatedTypes}
    }, this.jobsApi)
  }

  jobsApi = async () => {
    this.setState({stateStatus: renderStatus.loader})
    const {emtype, salary, searchJobInput} = this.state
    const employmentParam = emtype.join(',')
    const jobApi = `https://apis.ccbp.in/jobs?employment_type=${employmentParam}&minimum_package=${salary}&search=${searchJobInput}`
    const getJwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getJwtToken}`,
      },
    }

    const response = await fetch(jobApi, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const updateJobsData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))

      this.setState({
        jobDeatails: updateJobsData,
        stateStatus: renderStatus.success,
      })
    } else {
      this.setState({stateStatus: renderStatus.failure})
    }
  }

  profileApi = async () => {
    const api = 'https://apis.ccbp.in/profile'
    const getJwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${getJwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(api, options)
    const data = await response.json()

    if (response.ok === true) {
      const updateProfile = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }

      this.setState({
        profileDetails: updateProfile,
        profileStatus: renderStatus.success,
      })
    } else {
      this.setState({profileStatus: renderStatus.failure})
    }
  }

  renderProfileView = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails

    return (
      <>
        <div className="profile-container">
          <img src={profileImageUrl} className="user-image" alt="profile" />
          <h1 className="user-name">{name}</h1>
          <p className="user-bio">{shortBio}</p>
        </div>
        <hr className="hr" />
      </>
    )
  }

  renderProfileFailureView = () => (
    <div className="profile-failure-container">
      <button type="button" className="retry-button" onClick={this.profileApi}>
        Retry
      </button>
    </div>
  )

  renderEmploymentSalartView = () => {
    const {emtype, salary} = this.state

    return (
      <>
        <h1 className="employment-salart-heading">Type Of Employment</h1>
        <ul className="unorder-list-margin-container">
          {employmentTypesList.map(eachEmploy => (
            <li
              className="emsa-list-container"
              key={eachEmploy.employmentTypeId}
            >
              <input
                type="checkbox"
                className="input-radio-ckaackbox-container"
                id={eachEmploy.employmentTypeId}
                checked={emtype.includes(eachEmploy.employmentTypeId)}
                value={emtype}
                onChange={() => this.checkbox(eachEmploy.employmentTypeId)}
              />
              <label htmlFor={eachEmploy.employmentTypeId} className="labels">
                {eachEmploy.label}
              </label>
            </li>
          ))}
        </ul>

        <hr className="hr" />

        <h1 className="employment-salart-heading">Salary Range</h1>
        <ul className="unorder-list-margin-container">
          {salaryRangesList.map(eachESalary => (
            <li className="emsa-list-container" key={eachESalary.salaryRangeId}>
              <input
                type="radio"
                className="input-radio-ckaackbox-container"
                id={eachESalary.salaryRangeId}
                checked={salary === eachESalary.salaryRangeId}
                value={salary}
                name="salary"
                onChange={() => this.salaryRange(eachESalary.salaryRangeId)}
              />
              <label htmlFor={eachESalary.salaryRangeId} className="labels">
                {eachESalary.label}
              </label>
            </li>
          ))}
        </ul>

        <hr className="hr" />
      </>
    )
  }

  renderSearchView = () => (
    <div className="serch-flex-container">
      <input
        type="search"
        className="search-input"
        placeholder="Search"
        onChange={this.searchInput}
      />
      <button
        type="button"
        data-testid="searchButton"
        className="searc-icon-container"
        onClick={this.onSearchjob}
      >
        <BsSearch className="search-icon" />
      </button>
    </div>
  )

  renderMobileSearchView = () => (
    <div className="mobile-search-flex-container">
      <input
        type="search"
        className="search-input"
        placeholder="Search"
        onChange={this.searchInput}
      />
      <button
        type="button"
        data-testid="searchButton"
        className="searc-icon-container"
        onClick={this.onSearchjob}
      >
        <BsSearch className="search-icon" />
      </button>
    </div>
  )

  renderJobView = () => {
    const {jobDeatails} = this.state

    return (
      <>
        <ul className="unorder-lost-company-container">
          {jobDeatails.map(eachData => (
            <li className="company-details-container" key={eachData.id}>
              <Link to={`jobs/${eachData.id}`} className="link">
                <div className="flex-container">
                  <img
                    src={eachData.companyLogoUrl}
                    className="company-logo"
                    alt="company logo"
                  />
                  <div className="marign-company-title">
                    <h1 className="company-title">{eachData.title}</h1>
                    <div className="star-rating-container">
                      <FaStar className="star-icon" />
                      <p className="compay-rating">{eachData.rating}</p>
                    </div>
                  </div>
                </div>

                <div className="loc-jobty-package-flex-container">
                  <div className="flex-container">
                    <div className="flex-container">
                      <MdLocationOn className="location-icon" />
                      <p className="location-job-type-content">
                        {eachData.location}
                      </p>
                    </div>
                    <div className="flex-container margin-loc-job-type">
                      <BsBriefcaseFill className="job-type-icon" />
                      <p className="location-job-type-content">
                        {eachData.employmentType}
                      </p>
                    </div>
                  </div>

                  <p className="annum-package">{eachData.packagePerAnnum}</p>
                </div>

                <hr className="herizontal-line" />
                <h1 className="descripition">Description</h1>
                <p className="descripition-content">
                  {eachData.jobDescription}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </>
    )
  }

  renderNoJobsFoundView = () => (
    <div className="no-jobs-found-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        className="no-jobs-image"
        alt="no jobs"
      />
      <h1 className="no-jobs-found-content">No Jobs Found</h1>
      <p className="no-jobs-found-message">
        We could not find any jobs. Try other filters
      </p>
    </div>
  )

  renderJobsDeatailsViwe = () => {
    const {jobDeatails} = this.state

    return (
      <>
        <div className="jon-responsive2-conatiner">
          {jobDeatails.length >= 1
            ? this.renderJobView()
            : this.renderNoJobsFoundView()}
        </div>
      </>
    )
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <ThreeDots type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="jobs-failure-responsive-conatiner-container">
      <div className="jobs-failure-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          className="jobs-failure-image"
          alt="failure view"
        />
        <h1 className="jobs-failure-message ">Oops! Something Went Wrong</h1>
        <p className="jobs-failure-error">
          We cannot seem to find the page you are looking for.
        </p>
        <button type="button" className="retry-button" onClick={this.jobsApi}>
          Retry
        </button>
      </div>
    </div>
  )

  renderUiView = () => {
    const {stateStatus} = this.state

    switch (stateStatus) {
      case renderStatus.success:
        return this.renderJobsDeatailsViwe()
      case renderStatus.failure:
        return this.renderFailureView()
      case renderStatus.loader:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  renderUiProfileView = () => {
    const {profileStatus} = this.state

    switch (profileStatus) {
      case renderStatus.success:
        return this.renderProfileView()
      case renderStatus.failure:
        return this.renderProfileFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-app-container">
          <div className="responsive-container">
            <div className="jon-responsive1-conatiner">
              {this.renderMobileSearchView()}
              {this.renderUiProfileView()}
              {this.renderEmploymentSalartView()}
            </div>
            <div>
              {this.renderSearchView()}
              {this.renderUiView()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
