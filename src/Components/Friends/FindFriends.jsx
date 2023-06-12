import React, { useState } from "react";
import axios from "axios";

const FindFriends = ({ user }) => {
    const [search, setSearch] = useState('')
    const [friendSearched, setFriendSearched] = useState({})
    const [friendship, setFriendship] = useState(null)


    const searchFriend = () => {
        axios.get(`http://localhost:4455/search/${search}`)
            .then(res => {
                setFriendSearched(res.data)
                axios.post('http://localhost:4455/searchFriends', {
                    friend: res.data,
                    user: user
                })
                    .then(res => {
                        if (res.data.status === true || res.data.status === false) {
                            setFriendship(true)
                        } else {
                            setFriendship(false)
                        }
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }

    const addFriend = (friendSearched) => {
        console.log(friendSearched)
        const newFriendship = {
            friendOne: user.userId,
            friendTwo: friendSearched.id,
            status: false
        }
        axios.post('http://localhost:4455/addFriend', newFriendship)
            .then(res => {
                if (res.data === 'Added Friend') {
                    setFriendship(null)
                }
            })
    }


    return (
        <div>
            <input placeholder="Friend's Username" onChange={e => setSearch(e.target.value)} />
            <button onClick={searchFriend}>Search</button>
            <div>
                {friendSearched ? <p>{friendSearched.username}</p> : null}
                {friendship !== null ? !friendship ? <button onClick={() => addFriend(friendSearched)}>Add Friend</button> : null : null}
            </div>
        </div>
    )
}

export default FindFriends