import React, {useEffect, useState} from "react";
import io from 'socket.io-client'


const socket = io.connect(`http://localhost:4455`)


const ChatRoom = ({user, chatFriend}) => {
    console.log(chatFriend)
    
    useEffect(() => {
        socket.emit('enter', {user, chatFriend})
    })

    const sendMessage = () => {

    }

    return (
        <div>
            <input placeholder="Message"/>
            <button onClick={sendMessage}>Send</button>
        </div>
    )
}

export default ChatRoom