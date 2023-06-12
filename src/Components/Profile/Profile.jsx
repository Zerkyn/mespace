// import React, { useState } from "react";
import React from 'react'
const Profile = (props) => {
    // const [toggleEdit, setToggleEdit] = useState(false)


    return(
        <div>
            <button>Change Profile</button>
            <h3>{props.user.username}</h3>
        </div>
    )
}

export default Profile