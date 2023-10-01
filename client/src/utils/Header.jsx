import {Link} from 'react-router-dom'

const Header = ()=>{
    const menuClass = "text-white hover:font-semibold";

    return <header className="bg-purple-600 py-4">
    <div className="container mx-auto flex justify-between items-center">
      <div className="text-white text-2xl font-semibold">
        Video Chatt app
      </div>
      <nav>
        <ul className="flex space-x-4">
          <li><Link to="/" className={menuClass}>Lobby</Link></li>
          <li><Link to="/login" className={menuClass}>Login</Link></li>
          <li><Link to="/signup" className={menuClass}>Sign up</Link></li>
          <li><Link className={menuClass}>Profile</Link></li>
        </ul>
      </nav>
    </div>
  </header>
}

export default Header