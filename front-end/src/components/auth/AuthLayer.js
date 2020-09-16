import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/userContext";
import "./AuthLayer.css";

export default function AuthOptions() {
    const { userData, setUserData } = useContext(UserContext);

    const history = useHistory();

    const register = () => history.push("/register");

    const login = () => history.push("/login");

    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        });
        localStorage.setItem("auth-token", "");
        history.push("/landing");
    };

    const settings = () => {
        history.push("/settings");
    }


    return (
        
        <nav className="auth-level">
            {
                userData.user ? 
                    <div id="welcome"> 
                        <h1>Welcome, {userData.user.name.split(' ')[0]}</h1>
                        <div className="dropdown" >
                            <button id="expand"><img src={require("../../assets/images/Expand.png")}/></button>
                            <div style={{
                                "transform": "translate(-4.9rem, 0rem)"
                            }} className="dropdown-content">
                                <button onClick={settings}>Settings</button>
                                <button onClick={logout}>Log Out</button>
                            </div>
                        </div>
                    </div>
                        : 
                    <>
                        <button className="auth-button" onClick={register}>Register</button>
                        <button className="auth-button" onClick={login}>Login</button></>
            }

        </nav>
        )

}