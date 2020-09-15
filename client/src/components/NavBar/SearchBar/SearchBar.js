import React from 'react'
import './SearchBar.css';
import searchIcon from '../../../Images/search.png'

const SearchBar = () => {
    return (
        <div className='searchBox-container'>
            <input className="searchBox" type='text'></input>
            <img className="searchIcon" src={searchIcon}/>
        </div>
    )
}

export default SearchBar;
