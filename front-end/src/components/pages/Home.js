import React, { useEffect, useContext } from 'react';
import UserContext from "../../context/userContext";
import { useHistory } from "react-router-dom";
import Books from "../layout/Books";
import Banner from "../layout/Banner";
import SearchBanner from "../layout/SearchBanner";

export default function Home(props) {
    const { userData, setUserData } = useContext(UserContext);
    
    return (
        <div className="page">
            {
                userData.user ? 
                    <>
                        <Banner />
                        <Books />
                    </> : <p>Not Logged In</p>
            }
        </div>
    )
}