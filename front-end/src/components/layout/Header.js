import React from "react";
import { Link } from "react-router-dom";
import AuthOptions from "../auth/AuthLayer";


export default function Header() {
    return (
        <header id="header">
            
                <div id="headerTitleImage">
                    <img src={require('../../assets/images/Logo.png')} />
                    <Link to="/"><h1 className="title">Digi-Lib</h1></Link>
                </div>

                <AuthOptions />
            
        </header>
    );
}