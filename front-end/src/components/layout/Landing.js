import React from "react";

export default function Landing() {
    return (
        <div id="landingPage">
            <div id="landingContainer">
                <div id="logoTitle">
                    <img src={require('../../assets/images/Logo.png')} />
                    <h1>Digi Lib</h1>
                </div>
                <h2>Your Online Library</h2>
                <p>Create an online record of all your books, <br/>thoughts, insights and more.</p>
            </div>
        </div>
    );
}