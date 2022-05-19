import React from "react";

const Notification = ({ alertMessage, setShowAlert }) => {
    return (
        <div className="notification-container">
            <div>{alertMessage}</div>
            <button onClick={() => setShowAlert(false)}>x</button>
        </div>
    )
}

export default Notification;