import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./style.css";
import UserContext from "./context/userContext";
import BookListContext from "./context/bookListContext";

import Home from "./components/pages/Home";
import Settings from "./components/pages/Settings";
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Axios from "axios";
import Header from "./components/layout/Header";
import Search from "./components/pages/Search";
import Landing from "./components/pages/Landing";

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

    const [bookList, setBookList] = useState({
        list: [],
    })

    
    return <>
        <BrowserRouter>
            <UserContext.Provider value={{ userData, setUserData }} >
                <BookListContext.Provider value={{bookList, setBookList}}>
                    <Header changeSearch={changeSearchTerm}/>
                    <div id="container">
                         <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/search"
                                render={(props) => (
                                    <Search {...props} q={searchTerm} />
                                )}
                            />
                            <Route path="/login" component={Login} />
                            <Route path="/register" component={Register} />
                            <Route path="/settings" component={Settings} />
                            <Route path="/landing" component={Landing} />
                        </Switch>
                        </div>
                </BookListContext.Provider>
            </UserContext.Provider>
        </BrowserRouter>
    </>;
} 
