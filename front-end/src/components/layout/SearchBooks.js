import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../context/userContext";
import Axios from "axios";

//Query Term = query:
export default function SearchBooks(props) {
    const { userData, setUserData } = useContext(UserContext);
    const [ BookResults, setBookResults ] = useState();
    const [title, setTitle] = useState();


    const search = async (term) => {
        try {   
            const data = { title: term };
            console.log(data);
            const result = await Axios.post("http://localhost:5000/books/search", data);

            setBookResults(result.data);

        } catch (err) {
            console.log(err);
        }
    };


    
    useEffect(() => {

        if (props.query) {
            search(props.query);
        }

        
    }, [props.query]);

    return (
        <div id="searchBooks">
            {
                (BookResults) ? 
                    <div className="shelf">
                        {BookResults.map((item, i) =>
                            <div className="BookEntry">
                               
                                {
                                    (item.volumeInfo.imageLinks) ?
                                        <img src={item.volumeInfo.imageLinks.thumbnail} /> : <img src={"../../assets/empty.jpg"} />
                                }
                                                     
                                <div className="bookDetails">
                                    {(item.volumeInfo.title) ? <h2>{item.volumeInfo.title}</h2> : <h2>Untitled</h2>}
                                    {(item.volumeInfo.authors) ? <h3>{item.volumeInfo.authors[0]}</h3> : <h3>No Author Found</h3>}
                                    {(item.volumeInfo.categories) ? <h4 className="Genre">{item.volumeInfo.categories[0]}</h4> : <h4 className="Genre">No Genres Found</h4>}

                                    <button>Add to Library</button>
                                </div>

                                  



                            </div>

                        )}  
                    </div>
                    :

                    <p>Search</p>
            }
        </div>
    )

}