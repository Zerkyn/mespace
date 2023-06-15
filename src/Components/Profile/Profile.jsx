import React, { useState } from "react";
import './profile.css'
import axios from 'axios'

const Profile = ({ user }) => {
    const [toggleEdit, setToggleEdit] = useState(false)
    const [newImage, setNewImage] = useState('')
    const [backgroundOne, setBackgroundOne] = useState('')
    const [darkBackgroundOne, setDarkBackgroundOne] = useState(false)
    const [backgroundTwo, setBackgroundTwo] = useState('')
    const [darkBackgroundTwo, setDarkBackgroundTwo] = useState(false)
    const [bubble, setBubble] = useState('')
    const [darkBubble, setDarkBubble] = useState(false)
    const [friendBubble, setFriendBubble] = useState('')
    const [darkFriendBubble, setDarkFriendBubble] = useState(false)
    const [buttonColor, setButtonColor] = useState('')
    const [darkButtonColor, setDarkButtonColor] = useState(false)
    const { colorScheme } = user


    const changeColors = (e) => {
        e.preventDefault()
        const newColorScheme = {
            backgroundOne,
            backgroundTwo,
            bubble,
            friendBubble,
            buttonColor,
            darkBackgroundOne,
            darkBackgroundTwo,
            darkBubble,
            darkFriendBubble,
            darkButtonColor,
        }
        console.log(user)
        axios.put(`http://localhost:4455/newColors/${user.userId}`, { newColorScheme, newImage })
            .then(res => {
                console.log(res)
                setToggleEdit(false)
            })
    }

    return (
        <>
            {toggleEdit ?
                <form className='profile_edit'
                    style={{
                        backgroundColor: colorScheme.background_two,
                        color: colorScheme.dark_Background_Two ? 'white' : 'black'
                    }}
                >
                    <h3>{user.username}</h3>
                    <input placeholder='Image url' onChange={e => setNewImage(e.target.value)} />
                    <div className='color_scheme'>
                        <input placeholder='background 1' onChange={e => setBackgroundOne(e.target.value)} />
                        <input type='checkbox' onChange={() => setDarkBackgroundOne(!darkBackgroundOne)} />
                        <label>Bright Text</label>
                        <input placeholder='background 2' onChange={e => setBackgroundTwo(e.target.value)} />
                        <input type='checkbox' onChange={() => setDarkBackgroundTwo(!darkBackgroundTwo)} />
                        <label>Bright Text</label>
                        <input placeholder='your chat bubble' onChange={e => setBubble(e.target.value)} />
                        <input type='checkbox' onChange={() => setDarkBubble(!darkBubble)} />
                        <label>Bright Text</label>
                        <input placeholder="friend's chat bubble" onChange={e => setFriendBubble(e.target.value)} />
                        <input type='checkbox' onChange={() => setDarkFriendBubble(!darkFriendBubble)} />
                        <label>Bright Text</label>
                        <input placeholder='buttons' onChange={e => setButtonColor(e.target.value)} />
                        <input type='checkbox' onChange={() => setDarkButtonColor(!darkButtonColor)} />
                        <label>Bright Text</label>
                    </div>
                    <button
                        onClick={(e) => { changeColors(e) }}
                        style={{
                            backgroundColor: colorScheme.button_color,
                            color: colorScheme.dark_button_color ? 'white' : 'black',
                            border: 'none',
                            cursor: 'pointer',
                            borderRadius: '5px',
                            height: '25px',
                            width: '100px',
                        }}>Enter Change
                    </button>
                </form>
                :
                <div className="profile"
                    style={{
                        backgroundColor: colorScheme.background_two,
                        color: colorScheme.dark_Background_Two ? 'white' : 'black'
                    }}
                >   <div className="profile-image">
                        {user.profileImg === null ? <div className="default-profile"></div>: 
                        <img src={user.profileImg} alt="user" />}
                        
                    </div>
                    <h3>{user.username}</h3>
                    <div className="user_colors">
                        <div className="color_box" style={{ backgroundColor: colorScheme.background_two }}></div>
                        <div className="color_box" style={{ backgroundColor: colorScheme.background_one }}></div>
                        <div className="color_box" style={{ backgroundColor: colorScheme.bubble }}></div>
                        <div className="color_box" style={{ backgroundColor: colorScheme.friend_bubble }}></div>
                        <div className="color_box" style={{ backgroundColor: colorScheme.button_color }}></div>
                    </div>
                    <button
                        onClick={() => { setToggleEdit(true) }}
                        style={{
                            backgroundColor: colorScheme.button_color,
                            border: 'none',
                            cursor: 'pointer',
                            borderRadius: '5px',
                            height: '20px',
                            color: colorScheme.dark_button_color ? 'white' : 'black'
                        }}
                    >
                        Change Colors
                    </button>
                </div>
            }
        </>
    )
}

export default Profile