import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../context/userContext";
import Axios from "axios";
import SearchBanner from "./SearchBanner";

//Query Term = query:
export default function SearchBooks(props) {
    const { userData, setUserData } = useContext(UserContext);
    const [title, setTitle] = useState();
    const [disabled, setDisabled] = useState([]);

    //Books and Search Results:
    const [BookResults, setBookResults] = useState(null);
    const [loading, setLoading] = useState(true);


    const searchBooks = async (term) => {
        try {   
            const data = { title: term };
            const result = await Axios.post("http://localhost:5000/books/search", data);
            setBookResults(result.data);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    const addToLibrary = async (num) => {
        try {
            const data = {
                userID: userData.user.id,
                bookID: BookResults[num].id
            };
            const result = await Axios.post("http://localhost:5000/books/addToLibrary", data, { headers: { "x-auth-token": userData.token } } );
            setDisabled([...disabled, num])
            //Successful; we want to disable the button!
            if (result.status == 200) {
            }
            

        } catch (err) {
            console.log(err);
        }
    }

    //Want this to happen whenever the search changes! Therefore [props.query]
    useEffect(() => {
        setLoading(true);
        searchBooks(props.query);
    }, [props.query]);

    return (
        <SearchBanner />
        <div id="searchBooks">
            {
                loading ? <div className="loading"> <img src={require('../../assets/images/loading.gif')} /> <p>Loading Books ... </p> </div>:
                    <div className="shelf">
                        {BookResults.map((item, i) =>
                            <div className="BookEntry" key={item.id}>

                                {
                                    (item.volumeInfo.imageLinks) ?
                                        <img src={item.volumeInfo.imageLinks.thumbnail} /> : <img src={require('../../assets/images/EmptyCover.png')}/>
                                }

                                <div className="bookDetails">
                                    {(item.volumeInfo.title) ? <h2>{item.volumeInfo.title}</h2> : <h2>Untitled</h2>}
                                    {(item.volumeInfo.authors) ? <h3>{item.volumeInfo.authors[0]}</h3> : <h3>No Author Found</h3>}
                                    {(item.volumeInfo.categories) ? <h4 className="Genre">{item.volumeInfo.categories[0]}</h4> : <h4 className="Genre">No Genres Found</h4>}
                                    <button disabled={disabled.indexOf(i) !== -1} onClick={() => addToLibrary(i)}>Add to Library</button>
                                </div>
                                
                            </div>

                        )}
                    </div>
            }
        </div>
    )

}