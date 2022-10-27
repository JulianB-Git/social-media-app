import { Outlet } from "react-router-dom"
import LeftPanel from "../leftPanel/LeftPanel"
import NavBar from "../navbar/NavBar"
import RightPanel from "../rightPanel/RightPanel"
import '../../style.scss'
import { useContext } from "react"
import { DarkModeContext } from "../../context/darkModeContext"

const Layout = () => {

  const { darkMode } = useContext(DarkModeContext)

  return (
    <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <NavBar/>
        <div style={{display: 'flex'}}>
            <LeftPanel/>
            <div style={{flex: 6}}>
              <Outlet/>
            </div>
            <RightPanel/>
        </div>
    </div>
  )
}

export default Layout