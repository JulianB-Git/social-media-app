import './register.scss'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { config } from "../../config/config";
import useWindowDimensions from '../../hooks/useWindowDimensions'

const Register = () => {

    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: "",
        name: ""
    })

    const { width } = useWindowDimensions()
    const [err, setErr] = useState(null)

    const handleChange = e => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await axios.post(config.base_url + "/auth/register", inputs)
        } catch(err){
            setErr(err.response.data.message)
        }
    }

  return (
    <div className="register">
        <div className="card">
            <div className="left">
                <h1>Get Social</h1>
                <p>Join our amazing social media app.</p>
                <span>Do you have an account?</span>
                <Link to='/login'>
                    <button>Login</button>
                </Link>
            </div>
            <div className="right">
                <h1>Register</h1>
                <form>
                    <input type="text" placeholder='Username' name='username' onChange={handleChange} />
                    <input type="email" placeholder='Email' name='email' onChange={handleChange}/>
                    <input type="password" placeholder='Password' name='password' onChange={handleChange}/>
                    <input type="text" placeholder='Name' name='name' onChange={handleChange}/>
                    { width <= 480
                        ? <div className='have-account'>
                            <span>Already have an account ?</span>
                            <Link to='/login'>
                                <button className='login'>Login</button>
                            </Link>
                            </div>
                        : null }
                    {err && err}
                    <button onClick={handleSubmit}>Register</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Register