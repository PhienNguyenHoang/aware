import React from 'react'
import './Loader.css'
const Loader = ({size = 24}) => {
    return (
        <div className="loader" style={{width: `${size}px`, height: `${size}px`}}>

        </div>
    )
}

export default Loader;
