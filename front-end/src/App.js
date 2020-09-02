import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./style.css";
import UserContext from "./context/userContext";
import Home from "./components/pages/Home";
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Axios from "axios";
import Header from "./components/layout/Header";

export default function App() {

    const [userData, setUserData] = useState({
        token: undefined,
        user: undefined,
    });

    return <>
        <BrowserRouter>
            <UserContext.Provider value={{ userData, setUserData }} >
                <Header />
                <div id="container">
                     <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                    </Switch>
                 </div>
            </UserContext.Provider>
        </BrowserRouter>
    </>;
} 
