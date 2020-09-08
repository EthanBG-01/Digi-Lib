import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthOptions from "../auth/AuthLayer";
import UserContext from "../../context/userContext";


export default function Header(props) {

    const [query, setQuery] = useState();
    const { userData, setUserData } = useContext(UserContext);

    return (
        <header id="header">
            
                <div id="headerTitleImage">
                    <img src={require('../../assets/images/Logo.png')} />
                    <Link to="/"><h1 className="title">Digi-Lib</h1></Link>
               

            {
                userData.user ?
                    //user is logged in, show search:
                    //<SearchBar />
                    <div id="search">
                        <input type="text" placeholder="Search for Books..." onChange={e => setQuery(e.target.value)} />
                        <button type="submit" onClick={() => props.changeSearch(query)}>Search</button>
                    </div>
                        
                    :<></>
            }
            </div>
                <AuthOptions />
            
        </header>
    );
}

