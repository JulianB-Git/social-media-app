import './login.scss'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className="login">
        <div className="card">
            <div className="left">
                <h1>Hello World</h1>
                <p>Intro to the meaning of life or whatever and some of that Lorem ipsum business all over the place and some regular words to make it seem real.</p>
                <span>Don't have an account?</span>
                <Link to='/register'>
                    <button>Register</button>
                </Link>
            </div>
            <div className="right">
                <h1>Login</h1>
                <form>
                    <input type="text" placeholder='Username' />
                    <input type="password" placeholder='Password' />
                    <button>Login</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login