import React, { useState } from "react";
import axios from 'axios'
import background from '../../assets/background.PNG'
import './login.css'

const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [register, setRegister] = useState(false)

    const signUp = (e) => {
        e.preventDefault()
        axios.post('http://localhost:4455/register', { email, password })
            .then(res => {
                props.setUser(res.data)
                console.log(props.user)
                setEmail('')
                setPassword('')
            })
            .catch(err => console.log(err))
    }

    const logIn = (e) => {
        e.preventDefault()
        axios.post('http://localhost:4455/login', { email, password })
            .then(res => {
                props.setUser(res.data)
                console.log(props.user)
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
                background:`url(${background})`,
                display:"flex",
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