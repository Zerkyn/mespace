import React, { useState } from "react";
import axios from 'axios'
import background from '../../assets/background.PNG'
import './login.css'
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const signUp = (e) => {
        e.preventDefault()
        axios.post('http://localhost:4455/register', { email, password })
            .then(res => {
                navigate('/social')
                props.setUser(res.data)
                setEmail('')
                setPassword('')
            })
            .catch(err => console.log(err))
    }

    const logIn = (e) => {
        e.preventDefault()
        axios.post('http://localhost:4455/login', { email, password })
            .then(res => {
                navigate('/social')
                props.setUser(res.data)
                setEmail('')
                setPassword('')
            })
            .catch(err => console.log(err))
    }

    return (
        <div
            style={{
                height: '100vh',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                background: `url(${background})`,
                display: "flex",
                alignItems: "center",
            }}>
            <main>
                <h1>Mespace</h1>
                <form>
                    <input
                        placeholder="email"
                        onChange={e => setEmail(e.target.value)}>

                    </input>
                    <input
                        placeholder="password"
                        onChange={e => setPassword(e.target.value)}>

                    </input>
                    <button onClick={(e) => logIn(e)}>Login</button>
                    <button onClick={(e) => signUp(e)}>Register</button>
                </form>
            </main>
        </div>
    )
}

export default Login