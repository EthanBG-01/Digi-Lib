import React, { useEffect, useContext } from 'react';
import UserContext from "../../context/userContext";
import { useHistory } from "react-router-dom";

export default function Home(props) {
    const { userData, setUserData } = useContext(UserContext);

    return (
        <div className="page">
            <h1>Settings</h1>
        </div>
    )
}