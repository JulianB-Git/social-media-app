import { Outlet } from "react-router-dom"
import LeftPanel from "../leftPanel/LeftPanel"
import NavBar from "../navbar/NavBar"
import RightPanel from "../rightPanel/RightPanel"
import '../../style.scss'
import { useContext } from "react"
import { DarkModeContext } from "../../context/darkModeContext"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const Layout = () => {

  const { darkMode } = useContext(DarkModeContext)

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  )
}

export default Layout