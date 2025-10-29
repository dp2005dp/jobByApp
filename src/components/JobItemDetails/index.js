import {Component} from 'react'
import Header from '../Header'
import Cookies from 'js-cookie'
import {ThreeDots} from 'react-loader-spinner'
import {BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {FaStar, FaExternalLinkAlt} from 'react-icons/fa'
import './index.css'

const renderStatus = {
  success: 'SUCESS',
  failure: 'FAILURE',
  loader: 'IN_PROCESS',
  intial: 'INTIAL',
}

class JobItemDetails extends Component {
  state = {
    jobItemData: {
      jobDetails: {},
      lifeAtCompany: {},
      skill: [],
      similarJobs: [],
      statStatus: renderStatus.intial,
    },
  }
  componentDidMount() {
    this.jobItemDatailsApi()
  }

  jobItemDatailsApi = async () => {
    this.setState({statStatus: renderStatus.loader})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jobItemApi = `https://apis.ccbp.in/jobs/${id}`
    const getJwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getJwtToken}`,
      },
    }

    const response = await fetch(jobItemApi, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const updateJobItemData = {
        jobDetails: {
          companyLogoUrl: data.job_details.company_logo_url,
          companyWebsiteUrl: data.job_details.company_website_url,
          employmentType: data.job_details.employment_type,
          id: data.job_details.id,
          jobDescription: data.job_details.job_description,
          location: data.job_details.location,
          packagePerAnnum: data.job_details.package_per_annum,
          rating: data.job_details.rating,
          title: data.job_details.title,
        },
        lifeAtCompany: {
          description: data.job_details.life_at_company.description,
          imageUrl: data.job_details.life_at_company.image_url,
        },
        skill: data.job_details.skills.map(eachSkill => ({
          imageUrl: eachSkill.image_url,
          name: eachSkill.name,
        })),
        similarJobs: data.similar_jobs.map(eachJobs => ({
          companyLogoUrl: eachJobs.company_logo_url,
          employmentType: eachJobs.employment_type,
          id: eachJobs.id,
          jobDescription: eachJobs.job_description,
          location: eachJobs.location,
          rating: eachJobs.rating,
          title: eachJobs.title,
        })),
      }

      this.setState({
        jobItemData: updateJobItemData,
        statStatus: renderStatus.success,
      })
    } else {
      this.setState({statStatus: renderStatus.failure})
    }
  }

  renderJobItemView = () => {
    const {jobItemData} = this.state

    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobItemData.jobDetails

    const {description, imageUrl} = jobItemData.lifeAtCompany
    return (
      <div className="job-item-company-details-container">
        <div className="job-item-flex-container">
          <img
            src={companyLogoUrl}
            className="job-item-company-logo"
            alt="job details company logo"
          />
          <div className="job-item-marign-company-title">
            <h1 className="job-item-company-title">{title}</h1>
            <div className="job-item-star-rating-container">
              <FaStar className="job-item-star-icon" />
              <p className="job-item-compay-rating">{rating}</p>
            </div>
          </div>
        </div>

        <div className="job-item-loc-jobty-package-flex-container">
          <div className="job-item-flex-container">
            <div className="job-item-flex-container">
              <MdLocationOn className="job-item-location-icon" />
              <p className="job-item-location-job-type-content">{location}</p>
            </div>
            <div className="job-item-flex-container job-item-margin-loc-job-type">
              <BsBriefcaseFill className="job-item-job-type-icon" />
              <p className="job-item-location-job-type-content">
                {employmentType}
              </p>
            </div>
          </div>

          <p className="job-item-annum-package">{packagePerAnnum}</p>
        </div>

        <hr className="job-item-herizontal-line" />
        <div className="job-item-descripition-webSite-flex-contaiber">
          <h1 className="job-item-descripition">Description</h1>

          <a
            target="_blank"
            rel="noreferrer"
            href={companyWebsiteUrl}
            className="job-item-flex-container job-item-website-link"
          >
            <p className="job-item-visit"> Visit </p>
            <FaExternalLinkAlt className="job-item-link-icon" />
          </a>
        </div>
        <p className="job-item-descripition-content">{jobDescription}</p>

        <h1 className="skills">Skills</h1>
        <ul className="unorder-skill-list-conatiner">
          {jobItemData.skill.map(eachSkills => (
            <li className="skills-list-container" key={eachSkills.name}>
              <img
                src={eachSkills.imageUrl}
                className="skills-tools"
                alt={eachSkills.name}
              />
              <p className="skills-name">{eachSkills.name}</p>
            </li>
          ))}
        </ul>

        <h1 className="life-at-company">Life at Company</h1>
        <div className="life-at-company-flex-container">
          <p className="life-at-company-descripition">{description}</p>
          <img
            src={imageUrl}
            className="life-at-company-image"
            alt="life at company"
          />
        </div>
      </div>
    )
  }

  similarJobsView = () => {
    const {jobItemData} = this.state

    return (
      <>
        <h1 className="similar-job">Similar Jobs</h1>
        <ul className="unorer-similar-job-list-container">
          {jobItemData.similarJobs.map(eachJob => (
            <li className="similar-job-list-container" key={eachJob.id}>
              <div className="job-item-flex-container">
                <img
                  src={eachJob.companyLogoUrl}
                  className="job-item-company-logo"
                  alt="similar job company logo"
                />
                <div className="job-item-marign-company-title">
                  <h1 className="job-item-company-title">{eachJob.title}</h1>
                  <div className="job-item-star-rating-container">
                    <FaStar className="job-item-star-icon" />
                    <p className="job-item-compay-rating">{eachJob.rating}</p>
                  </div>
                </div>
              </div>
              <h1 className="job-item-descripition">Description</h1>
              <p className="job-item-descripition-content">
                {eachJob.jobDescription}
              </p>
              <div className="job-item-flex-container">
                <div className="job-item-flex-container">
                  <MdLocationOn className="job-item-location-icon" />
                  <p className="job-item-location-job-type-content">
                    {eachJob.location}
                  </p>
                </div>
                <div className="job-item-flex-container job-item-margin-loc-job-type">
                  <BsBriefcaseFill className="job-item-job-type-icon" />
                  <p className="job-item-location-job-type-content">
                    {eachJob.employmentType}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </>
    )
  }

  renderJobItemDetailsView = () => (
    <>
      {this.renderJobItemView()}
      {this.similarJobsView()}
    </>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="failure-image"
        alt="failure view"
      />
      <h1 className="failure-message ">Oops! Something Went Wrong</h1>
      <p className="failure-error">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.jobItemDatailsApi}
      >
        Retry
      </button>
    </div>
  )

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <ThreeDots type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobUi = () => {
    const {statStatus} = this.state

    switch (statStatus) {
      case renderStatus.success:
        return this.renderJobItemDetailsView()
      case renderStatus.failure:
        return this.renderFailureView()
      case renderStatus.loader:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-item-app-conatiner">
          <div className="job-item-responsive-conatiner">
            {this.renderJobUi()}
          </div>
        </div>
      </>
    )
  }
}

export default JobItemDetails
