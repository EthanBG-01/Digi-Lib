import React, { useEffect, useContext } from 'react';
import UserContext from "../../context/userContext";
import { useHistory } from "react-router-dom";
import Books from "../layout/Books";
import SearchBooks from "../layout/SearchBooks";
import Banner from "../layout/Banner";

export default function Home(props) {
    const { userData, setUserData } = useContext(UserContext);
    
    return (
        <div className="page">

            {   //Check if user is logged in.
                userData.user ?
                    props.q ? 
                        <SearchBooks query={props.q} /> :
                        <>
                            <Banner />
                            <Books />
                        </>
                    :
                    <p>Not Logged In.</p>
            }
           
        </div>
    )
}