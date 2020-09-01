import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import UserContext from "../../context/userContext";
import Errors from "../misc/Errors";



export default function Login() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();
        try {
            const loginUser = { email, password };
            const loginRes = await Axios.post("http://localhost:5000/users/login", loginUser);
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user,
            });
            localStorage.setItem("auth-token", loginRes.data.token);
            history.push("/");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="page">
            <h2>Login</h2>
            <form onSubmit={submit} className="form">
                <label htmlFor="login-email">Email</label>
                <input type="email" id="login-Email" onChange={e => setEmail(e.target.value)} />

                <label htmlFor="login-password">Password</label>
                <input type="password" id="login-password" onChange={e => setPassword(e.target.value)} />

                <input type="submit" value="Submit" />

            </form>
        </div>


    )
}