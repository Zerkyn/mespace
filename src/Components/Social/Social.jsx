import React,{useState} from 'react';
import Header from '../Header/Header'
import Profile from "../Profile/Profile";
import FindFriends from "../Friends/FindFriends";
import Friends from "../Friends/Friends";
import ChatRoom from '../Messages/ChatRoom'


const Social = ({user, setUser}) => {
    const [chatFriend, setChatFriend] = useState({})



    return (
        <div>
            <Header setUser={setUser} user={user} />
            <div>
                <Profile setUser={setUser} user={user} />
                <Friends user={user} setChatFriend={setChatFriend}/>
                <FindFriends user={user}/>
                <ChatRoom user={user} chatFriend={chatFriend}/>
            </div>
        </div>
    )
}

export default Social
