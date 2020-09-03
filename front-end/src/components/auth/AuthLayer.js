import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/userContext";

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
        history.push("/login");
    };


    return (
        
        <nav className="auth-level">
            {
                userData.user ? 
                    <div id="welcome">
                        <h1>Welcome, {userData.user.name.split(' ')[0]}</h1>
                        <button onClick={logout}>V</button> </div> : 
                    <>
                        <button onClick={register}>Register</button>
                        <button onClick={login}>Login</button></>
            }

        </nav>
        )

}