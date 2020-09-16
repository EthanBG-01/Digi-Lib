import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../context/userContext";
import BookListContext from "../../context/bookListContext";
import Axios from "axios";

export default function Books() {
    const { userData, setUserData } = useContext(UserContext);
    const { bookList, setBookList } = useContext(BookListContext);

    const [loading, setLoading] = useState(true);
    const [userBooks, setUserBooks] = useState(null);
    const [sort, setSort] = useState("Recently Added");

    const fetchBooks = async () => {
        try {
            const books = await Axios.get("http://localhost:5000/books/userBooks", { headers: { "x-auth-token": userData.token } });
            setUserBooks(books.data.books );
            setLoading(false);
        } catch (err) {
            console.log("ERROR");
            console.log(err);
            setLoading(false);
        }
    }

    //Attempting to sort the books by authors names alphabetically.
    const handleSelect = (e) => {
        setSort(e.target.value);
        if (sort == "author") {
            setUserBooks(userBooks.sort(function (a, b) {
                var splitA = a.author.split(" ");
                var splitB = b.author.split(" ");
                var lastA = splitA[splitA.length - 1];
                var lastB = splitB[splitB.length - 1];
                console.log(lastA+ " "+ lastB);

                if (lastA < lastB) return -1;
                if (lastA > lastB) return 1;
                return 0;
            }));
        } else {
            setUserBooks(userBooks.sort(function (a, b) {
                return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
            }));
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
                <div id="options">
                    <p>Genre: </p>
                    <select name="genres" id="genres" >
                        <option value="sci-fi">Science Fiction</option>
                        <option value="philosophy">Philosophy</option>
                    </select>
                    <p>Sort By: </p>
                    <select name="sort" id="sortBy" onChange={handleSelect}>
                        <option value="recent">Recently Added</option>
                        <option value="author">Author</option>
                    </select>
                </div>
                
            </div>
            <hr />

            {loading ? <div className="loading"> <img src={require('../../assets/images/loading.gif')} /> <p>Loading Books ... </p> </div> :
                userBooks.length > 0 ? 
                    
                    <div id="bookList">
                        {
                            sort == "author" ?
                                userBooks.map((item, i) =>
                                    <img src={item.thumbnail} />
                                )
                                :
                                userBooks.map((item, i) =>
                                        <img src={item.thumbnail} />
                                    )
                                
                        }
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
