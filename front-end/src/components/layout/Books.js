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
            <div id="bookshelfTitle">
                <h2>Your Bookshelf</h2>
                <select name="genres" id="genres">
                    <option value="sci-fi">Science Fiction</option>
                    <option value="philosophy">Philosophy</option>
                </select>
            </div>
            
            <hr />

            {
                (!{Books}.length>0) ?
                    <div id="emptyShelf">
                        <img src={require('../../assets/images/empty.jpg')} />
                        <h2>Hi {userData.user.name.split(' ')[0]}!</h2>
                        <p>You don't have anything in your Library yet,<br />
                           Search for a book to get started!</p>
                    </div> :
                    <p>Book</p>
            }


        </div>
    )

}