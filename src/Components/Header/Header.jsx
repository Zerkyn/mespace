import React from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Header = ({ user, setUser }) => {
    const navigate = useNavigate()
    const { colorScheme } = user

    const logout = () => {
        axios.post('http://localhost:4455/logout')
            .then(() => {
                setUser({})
                navigate('/')
            })

    }

    return (
        <header>
            <button
                onClick={logout}
                style={{
                    backgroundColor: colorScheme.button_color,
                    border: 'none',
                    cursor: 'pointer',
                    borderRadius: '5px',
                    height: '20px',
                    color: colorScheme.dark_button_color ? 'white' : 'black'
                }}>Logout</button>
        </header>
    )
}

export default Header
