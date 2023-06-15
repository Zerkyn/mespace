import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import './friends.css'
import FindFriends from "../Friends/FindFriends";

const Friends = ({ user, setChatFriend, setRoom }) => {
    const [friends, setFriends] = useState([])
    let friendPairs = useRef([])
    const { colorScheme } = user

    useCallback(() => {
        friends.map((el) => {
            return (
                <div key={el.id}>
                    <button onClick={setChatFriend(el)}>{el.username}</button>
                </div>
            )
        })
    }, [friends, setChatFriend])

    const selectToChat = (friend) => {
        friendPairs.current.forEach(el => {
            for (let i = 0; i < el.length; i++) {
                if (el[i].friend_one === friend.id || el[i].friend_two === friend.id) {
                    setRoom(el[i].id)
                    setChatFriend(friend)
                }
            }
        })
    }


    //----- this useEffect is terrible, will changed later. -----//
    useEffect(() => {
        axios.get(`http://localhost:4455/friends/${user.userId}`)
            .then(res => {
                const friendLists = res.data
                friendPairs.current = friendLists
                for (let i = 0; i < friendLists[0].length; i++) {
                    if (friendLists[0][i].friend_one === user.userId) {
                        axios.get(`http://localhost:4455/searchUser/${friendLists[0][i].friend_two}`)
                            .then(result => {
                                setFriends(friends => [...friends, result.data])
                            })
                    }
                }
                for (let i = 0; i < friendLists[1].length; i++) {
                    if (friendLists[1][i].friend_two === user.userId) {
                        axios.get(`http://localhost:4455/searchUser/${friendLists[1][i].friend_one}`)
                            .then(result => {
                                setFriends(friends => [...friends, result.data])
                            })
                    }
                }
            })
    }, [user.userId])
    //------------------------------------------------------------//


    return (
        <div className="all-friends" style={{
            backgroundColor: colorScheme.background_two,
            color: colorScheme.dark_Background_Two ? 'white' : 'black'
        }}>
            <div>
                {friends.map((el) => {
                    return (
                        <div key={el.id} className="friend">
                            <div className="friend-img">
                                {el.profileImg === null ? <div className="default-friend"></div> :
                                <img src={el.profileImg} alt={el.username} />
                                }
                            </div>
                            <h4>{el.username}</h4>
                            <button
                                onClick={() => selectToChat(el)}
                                style={{
                                    backgroundColor: colorScheme.button_color,
                                    border: 'none',
                                    cursor: 'pointer',
                                    borderRadius: '5px',
                                    height: '25px',
                                    width: '70px',
                                    color: colorScheme.dark_button_color ? 'white' : 'black'
                                }}>
                                Message
                            </button>
                        </div>
                    )
                })}
            </div>
            <div>
                <FindFriends user={user} />
            </div>
        </div>
    )
}

export default Friends