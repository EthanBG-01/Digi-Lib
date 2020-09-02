import React, { useEffect, useContext } from 'react';
import UserContext from "../../context/userContext";
import { useHistory } from "react-router-dom";
import Books from "../layout/Books";
import Banner from "../layout/Banner";

export default function Home() {
    const { userData, setUserData } = useContext(UserContext);
    
    return (
        <div className="page">
            <Banner />
            {
                userData.user ?
                    <Books /> :
                    <p>Not Logged In.</p>
            }

           
        </div>
    )
}