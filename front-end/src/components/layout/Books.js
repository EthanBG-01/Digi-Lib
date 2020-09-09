import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../context/userContext";
import BookListContext from "../../context/bookListContext";
import Axios from "axios";

export default function Books() {
    const { userData, setUserData } = useContext(UserContext);
    const { bookList, setBookList } = useContext(BookListContext);

    const [loading, setLoading] = useState(true);
    const [books, setBooks] = useState(null);
    const [sort, setSort] = useState("Recent");

    const fetchBooks = async () => {
        try {
            const books = await Axios.get("http://localhost:5000/books/userBooks", { headers: { "x-auth-token": userData.token } });
            setBooks(books.data.books);


            setLoading(false);
        } catch (err) {
            console.log("ERROR");
            console.log(err);
            setLoading(false);
        }
    }

    const handleSelect = (e) => {
        setSort(e.target.value);
    }

    useEffect(() => {
        setLoading(true);
        fetchBooks();
    }, [])


    return (
        <div id="bookShelf">


            <div id="bookshelfTitle">
                <h2>Your Bookshelf</h2>
                <div id="options">
                    <p>Genre: </p>
                    <select name="genres" id="genres">
                        <option value="sci-fi">Science Fiction</option>
                        <option value="philosophy">Philosophy</option>
                    </select>
                    <p>Sort By: </p>
                    <select name="sort" id="sortBy">
                        <option value="recent">Recently Added</option>
                        <option value="philosophy">Author</option>
                    </select>
                </div>
                
            </div>
            <hr />

            {loading ? <div className="loading"> <img src={require('../../assets/images/loading.gif')} /> <p>Loading Books ... </p> </div> :
                books.length > 0 ? 
                    
                    <div id="bookList">
                        {books.map((item, i) =>
                            <img src={item.thumbnail} />
                        )}
                       
                    </div>
                    
                    : 

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
