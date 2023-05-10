import {Component} from 'react'
import SideBar from '../SideBar'
import CasesComponent from '../CasesComponent'
import './index.css'

class Charts extends Component {
  state = {chartsList: [], status: false}

  componentDidMount() {
    this.getCasesData()
  }

  getCasesData = async () => {
    const casesUrl = 'https://disease.sh/v3/covid-19/countries'
    const options = {
      method: 'GET',
    }

    const casesFetch = await fetch(casesUrl, options)
    const casesData = await casesFetch.json()
    this.setState({chartsList: casesData, status: true})
  }

  render() {
    const {chartsList, status} = this.state
    return (
      <div className="chart-main-bgm">
        <SideBar />
        <div className="right-chart-side-container">
          {status && <CasesComponent chartsList={chartsList} />}
          <img src="https://disease.sh/assets/img/flags/af.png" />
        </div>
      </div>
    )
  }
}

export default Charts

//  <CasesComponents casesList={casesList} />
