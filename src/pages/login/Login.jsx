import './login.scss'
import { Link } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/authContext'

const Login = () => {

    const { login } = useContext(AuthContext)

    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    })

    const [err, setErr] = useState(null)

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            await login(inputs)

            // Find a SPA solution to auth context does not progagate in time for protected route in App.js
            window.location.replace('/')
        } catch(err) {
            setErr(err.response.data.message)
        }
    }

    const handleChange = e => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value}))
    }

    return (
        <div className="login">
            <div className="card">
                <div className="left">
                    <h1>Hello World</h1>
                    <p>Social media app that allows you and your friends to share posts, comment and like posts.</p>
                    <span>Don't have an account?</span>
                    <Link to='/register'>
                        <button>Register</button>
                    </Link>
                </div>
                <div className="right">
                    <h1>Login</h1>
                    <form>
                        <input type="text" placeholder='Username' name='username' onChange={handleChange}/>
                        <input type="password" placeholder='Password' name='password' onChange={handleChange}/>
                        {err && err}
                        <button onClick={handleLogin}>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login