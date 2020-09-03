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

    //Need to pass search term in header to HOME:
    const [searchTerm, setSearchTerm] = useState();

    const changeSearchTerm = (term) => {
        setSearchTerm(term);
        console.log("Search term from app" + term);
    }

    const [userData, setUserData] = useState({
        token: undefined,
        user: undefined,
    });

    
    return <>
        <BrowserRouter>
            <UserContext.Provider value={{ userData, setUserData }} >
                <Header changeSearch={changeSearchTerm}/>
                <div id="container">
                     <Switch>
                        <Route exact path="/"
                            render={(props) => (
                                <Home {...props} q={searchTerm} />
                            )}
                        />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                    </Switch>
                 </div>
            </UserContext.Provider>
        </BrowserRouter>
    </>;
} 
