import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import UserContext from "../../context/userContext";
import ErrorNotice from "../misc/Errors";


export default function Register() {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();

        try {
            const newUser = { name, email, password, confirmPassword };
            await Axios.post("http://localhost:5000/users/register", newUser);

            //Now, Login the user!
            const loginRes = await Axios.post("http://localhost:5000/users/login", {
                email,
                password,
            });
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
            <h2>Register</h2>
            <form onSubmit={submit} className="form">
                <label htmlFor="register-name">Name</label>
                <input type="text" id="register-name" onChange={e => setName(e.target.value)} /> 
                <label htmlFor="register-email">Email</label>
                <input type="email" id="register-email" onChange={e => setEmail(e.target.value)} />
                <label htmlFor="register-password">Password</label>
                <input type="password" id="register-password" onChange={e => setPassword(e.target.value)} />
                <input type="password" placeholder="Verify Password" onChange={e => setConfirmPassword(e.target.value)} />
                
                <input type="submit" value="Register"/>
            </form>
        </div>
    );
}