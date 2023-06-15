import React, { useEffect, useState } from "react";
import io from 'socket.io-client'
import './chatRoom.css'


const socket = io.connect(`http://localhost:4455`)


const ChatRoom = ({ user, chatFriend, room }) => {
    const [message, setMessage] = useState('')
    const [allMessages, setAllMessages] = useState([])
    const { colorScheme } = user


    const sendMessage = () => {
        socket.emit('send_message', { message, user: user.userId, room })
    }

    useEffect(() => {

        socket.emit('enter', { room })

        socket.on('joined', (messages) => {
            setAllMessages(messages)
            // console.log(messages)
        })

    }, [room])

    useEffect(() => {
        socket.on('receive_message', (newMessage) => {
            console.log(newMessage)
            setAllMessages([...allMessages, newMessage])
        })
    },[allMessages])

    const handleKey = (e) => {
        if(e.key === 'Enter'){
            setMessage('')
            sendMessage()
        }
    }
    return (
        <div className="chat" style={{ backgroundColor: colorScheme.background_two }}>
            <div className="chat-room" >
                <h5>{chatFriend.username}</h5>
                <div className="message-box">
                    {allMessages.map((el, i) => {
                        return (
                            <div key={el.id}>
                                {el.author_id === user.userId ?
                                    <p className="user-bubbles"
                                        style={{
                                            backgroundColor: colorScheme.bubble,
                                            color: colorScheme.dark_bubble ? 'white' : 'black'
                                        }}
                                    >
                                        {el.message}
                                    </p>
                                    :
                                    <p className="friend-bubbles"
                                        style={{
                                            backgroundColor: colorScheme.friend_bubble,
                                            color: colorScheme.dark_friend_bubble ? 'white' : 'black'
                                        }}
                                    >
                                        {el.message}
                                    </p>}
                            </div>
                        )
                    })}
                </div>
                <input
                    placeholder="Message"
                    onChange={e => setMessage(e.target.value)}
                    onKeyDown={e => handleKey(e)}
                />
                {/* <button onClick={sendMessage}>Send</button> */}
            </div>
        </div>
    )
}

export default ChatRoom