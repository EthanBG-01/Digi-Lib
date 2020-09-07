import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../context/userContext";
import Axios from "axios";

export default function Books() {
    const { userData, setUserData } = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const [books, setBooks] = useState(null);

    const fetchBooks = async () => {
        try {
            const books = await Axios.get("http://localhost:5000/users/userBooks", { headers: { "x-auth-token": userData.token } });
            setBooks(books.data.books);
            setLoading(false);
        } catch (err) {
            console.log("ERROR");
            console.log(err);
            setLoading(false);
        }
    }

    useEffect(() => {
        setLoading(true);
        fetchBooks();
    }, [])


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

            {loading ? <p>Loading</p> :
                books.length > 0 ? <p>Books</p> : 

                    <div id="emptyShelf">
                        <img src={require('../../assets/images/empty.jpg')} />
                        <h2>Hi {userData.user.name.split(' ')[0]}!</h2>
                        <p>You don't have anything in your Library yet,<br />
                            Search for a book to get started!</p>
                    </div> 
            }  
            
        </div>
    )
}
