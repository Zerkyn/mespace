import React from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Header = (props) => {
    const navigate = useNavigate()

    const logout = () => {
        axios.post('http://localhost:4455/logout')
            .then(() => {
                props.setUser({})
                navigate('/')
            })

    }

    return(
        <div>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default Header
