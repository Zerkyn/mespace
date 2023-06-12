import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const Friends = ({ user, setChatFriend }) => {
    const [friends, setFriends] = useState([])

    useCallback(() => {
        friends.map((el) => {
            return (
            <div key={el.id}>
                <button onClick={setChatFriend(el)}>{el.username}</button>
            </div>
            )
        })
    },[friends, setChatFriend])

    useEffect(() => {
        axios.get(`http://localhost:4455/friends/${user.userId}`)
            .then(res => {
                const friendLists = res.data
                // console.log(friendLists[1])
                for (let i = 0; i < friendLists[0].length; i++) {
                    if (friendLists[0][i].friend_one === user.userId) {
                        axios.get(`http://localhost:4455/searchUser/${friendLists[0][i].friend_two}`)
                            .then(result => {
                                // console.log(result.data)
                                setFriends(friends => [...friends, result.data])
                            })
                    }
                }
                for (let i = 0; i < friendLists[1].length; i++) {
                    if (friendLists[1][i].friend_two === user.userId) {
                        axios.get(`http://localhost:4455/searchUser/${friendLists[1][i].friend_one}`)
                            .then(result => {
                                // console.log(result.data)
                                setFriends(friends => [...friends, result.data])
                            })
                    }
                }
            })
    }, [user.userId])
    return (
        <div>
            {friends.map((el) => {
                return (
                <div key={el.id}>
                    <button onClick={() => setChatFriend(el)}>{el.username}</button>
                </div>
                )
            })}
        </div>
    )
}

export default Friends