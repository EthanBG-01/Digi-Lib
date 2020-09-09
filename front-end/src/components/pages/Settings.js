import React, { useEffect, useContext } from 'react';
import UserContext from "../../context/userContext";
import { useHistory } from "react-router-dom";

export default function Settings(props) {
    const { userData, setUserData } = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        if (!userData.user) {
            setUserData({
                token: undefined,
                user: undefined
            });
            localStorage.setItem("auth-token", "");
            history.push("/landing");
        }
    }, []);

    return (
        <div className="page">
            <h1>Settings</h1>
        </div>
    )
}