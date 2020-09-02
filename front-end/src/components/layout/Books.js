import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../context/userContext";
import Axios from "axios";

export default function Books() {
    const { userData, setUserData } = useContext(UserContext);
    const [Books, setBooks]= useState("{}");

    const getBooks = async () => {
        try {
            const books = await Axios.get("http://localhost:5000/users/userBooks", { headers: { "x-auth-token": userData.token } });
            setBooks(books.data.books);
        } catch (err) {
            console.log(err);
        }
};

    useEffect(() => {

        getBooks();
    }, []);

    return (
        <div id="bookShelf">
            {
                (!{Books}.length>0) ?
                    <div id="emptyShelf">
                        <h2>It's rather empty on your bookshelf... Search a book to get started!</h2>
                    </div> :
                    <p>Book</p>
            }


        </div>
    )

}