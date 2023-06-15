import React, { useState, useEffect } from 'react';
import Header from '../Header/Header'
import Profile from "../Profile/Profile";

import Friends from "../Friends/Friends";
import ChatRoom from '../Messages/ChatRoom'
import './social.css'


const Social = ({ user, setUser }) => {
    const [chatFriend, setChatFriend] = useState({})
    const [room, setRoom] = useState(0)
    const { colorScheme } = user

    useEffect(() => {

    })

    return (
        <div className='page' style={{ backgroundColor: colorScheme.background_one }}>
            <Header setUser={setUser} user={user} />
            <div className='social'>
                <Friends user={user} setChatFriend={setChatFriend} setRoom={setRoom} />
                <ChatRoom user={user} chatFriend={chatFriend} room={room} />
                <Profile setUser={setUser} user={user} />
            </div>
        </div>
    )
}

export default Social
