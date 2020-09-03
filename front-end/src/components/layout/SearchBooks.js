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
                    <>
                        {BookResults.map((item, i) =>
                            <article>
                                <h2>{item.volumeInfo.title}</h2>
                                <p>{item.volumeInfo.authors[0]}</p>
                                <img src={item.volumeInfo.imageLinks.thumbnail} />
                            </article>

                        )}  
                    </>
                    :

                    <p>Search</p>
            }
        </div>
    )

}