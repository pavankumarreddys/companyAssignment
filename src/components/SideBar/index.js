import {Link} from 'react-router-dom'
import './index.css'

const SideBar = () => (
  <div className="side-bar-main-bgm">
    <Link to="/" className="link-text">
      <h1 className="sidebar-heading">Contact</h1>
    </Link>

    <hr className="side-hr-line" />
    <Link to="/charts&maps" className="link-text">
      <h1 className="sidebar-heading">Charts and Maps</h1>
    </Link>

    <hr className="side-hr-line" />
  </div>
)

export default SideBar
