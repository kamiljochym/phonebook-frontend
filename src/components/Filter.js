import React from "react";

const Filter = ({handleNewSearch}) => {
    return (
        <div className="search"><input placeholder="Search..." onChange={handleNewSearch}/></div>
    )
}

export default Filter;

