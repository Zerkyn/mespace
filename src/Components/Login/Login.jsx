import React, { useState } from "react";
import axios from 'axios'
import background from '../../assets/background.PNG'
import './login.css'
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const signUp = (e) => {
        e.preventDefault()
        axios.post('http://localhost:4455/register', { username, password })
            .then(res => {
                navigate('/social')
                props.setUser(res.data)
                setUsername('')
                setPassword('')
            })
            .catch(err => console.log(err))
    }

    const logIn = (e) => {
        e.preventDefault()
        axios.post('http://localhost:4455/login', { username, password })
            .then(res => {
                navigate('/social')
                props.setUser(res.data)
                setUsername('')
                setPassword('')
            })
            .catch(err => console.log(err))
    }

    return (
        <div
            style={{
                height: '100%',
                // width: '100vw',
                overflow: 'none',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                background: `url(${background})`,
                backgroundPosition: 'center',
                display: "flex",
                alignItems: "center",
            }}>
            <main>
                <h1>Mespace</h1>
                <form>
                    <input
                        placeholder="Username"
                        onChange={e => setUsername(e.target.value)}>

                    </input>
                    <input
                        placeholder="Password"
                        onChange={e => setPassword(e.target.value)}
                        type="password">

                    </input>
                    <div>
                        <button onClick={(e) => logIn(e)}>Login</button>
                        <button onClick={(e) => signUp(e)}>Register</button>
                    </div>
                    
                </form>
            </main>
        </div>
    )
}

export default Login