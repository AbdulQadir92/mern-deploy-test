import {Link} from 'react-router-dom'


const Header = () => {
  return (
    <nav id="header">
      <ul>
        <li>
            <h2><Link to="/">Products</Link></h2>
        </li>
        <li>
          <Link to="/addProduct">Add New</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Header
