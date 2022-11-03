import './login.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/authContext'

const Login = () => {

    const { login } = useContext(AuthContext)

    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    })

    const [err, setErr] = useState(null)

    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            await login(inputs)
            navigate('/')
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
                    <p>Intro to the meaning of life or whatever and some of that Lorem ipsum business all over the place and some regular words to make it seem real.</p>
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