import './notfound.scss'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='not-found'>
        <h1>Error 404</h1>
        <span>Page not found</span>
        <div>Return to home page.
            <Link to={'/'}>Home</Link>
        </div>
    </div>
  )
}

export default NotFound