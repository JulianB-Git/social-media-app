import './login.scss'
import { Link } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/authContext'
import { DotLoader } from 'react-spinners'

const Login = () => {

    const { login } = useContext(AuthContext)

    const overrideCSS = {
        display: "flex",
        margin: "0 auto",
        borderColor: "red",
      };

    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    })

    const [err, setErr] = useState(null)
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await login(inputs)
            setLoading(false)
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
                {loading
                ? <div className="loading-container">
                    <DotLoader
                    color='#6260e0'
                    loading={loading}
                    cssOverride={overrideCSS}
                    size={150}
                    />
                </div>
                : <>
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
                    </>
                }
            </div>
                
            {/* </div>
            <DotLoader
                color='#6260e0'
                loading={loading}
                cssOverride={overrideCSS}
                size={150}
            /> */}
        </div>
    )
}

export default Login