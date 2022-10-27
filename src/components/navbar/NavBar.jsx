import { useContext } from 'react';
import { Link } from 'react-router-dom'
import './navbar.scss'
import { DarkModeContext } from '../../context/darkModeContext';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const NavBar = () => {

  const { toggle, darkMode } = useContext(DarkModeContext)

  return (
    <div className='navbar'>
      <div className="left">
        <Link to='/' style={{textDecoration: 'none'}}>
          <span>getsocial</span>
        </Link>
        <HomeOutlinedIcon/>
        {!darkMode ? <DarkModeOutlinedIcon onClick={toggle}/> : <WbSunnyOutlinedIcon onClick={toggle}/>}
        <GridViewOutlinedIcon/>
        <div className="search">
          <SearchOutlinedIcon/>
          <input type="text" placeholder='Search...' />
        </div>
      </div>
      <div className="right">
        <PersonOutlineOutlinedIcon/>
        <EmailOutlinedIcon/>
        <NotificationsOutlinedIcon/>
        <div className="user">
          <img src="https://images.pexels.com/photos/9746/people-mother-family-father.jpg" alt="user" />
          <span>Julian Benade</span>
        </div>
      </div>
    </div>
  )
}

export default NavBar