import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthOptions from "../auth/AuthLayer";
import UserContext from "../../context/userContext";
import SearchBar from "../misc/SearchBar";


export default function Header() {

    const { userData, setUserData } = useContext(UserContext);

    return (
        <header id="header">
            
                <div id="headerTitleImage">
                    <img src={require('../../assets/images/Logo.png')} />
                    <Link to="/"><h1 className="title">Digi-Lib</h1></Link>
            </div>

            {
                userData.user ?
                    //user is logged in, show search:
                   <SearchBar />
                    
                    :<></>
            }

                <AuthOptions />
            
        </header>
    );
}