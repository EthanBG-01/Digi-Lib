import React, { useContext, useEffect } from "react";
import UserContext from "../../context/userContext";

export default function Books() {
    const { userData, setUserData } = useContext(UserContext);

    useEffect(() => {
        //New route to check if the user has any books!
    });

    return (
        <div id="bookShelt"></div>
    )

}