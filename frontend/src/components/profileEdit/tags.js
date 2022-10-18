import React, { useEffect, useState } from "react";
import './tags.css';

const Tags = (props) => {

    return (
        <div className="tagContainer">
            <div className="leftHalf"></div>
            <div className="tagText">{props.name}</div>
            <button className="rightHalf" id={props.id} onClick={props.blabla}></button>
        </div>
    )

}

export default Tags;