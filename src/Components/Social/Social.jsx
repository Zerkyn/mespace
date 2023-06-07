import React from "react";
import Header from '../Header/Header'

const Social = (props) => {

    return(
        <div>
            Social
            <Header setUser={props.setUser} user={props.user}/>
        </div>
    )
}

export default Social
