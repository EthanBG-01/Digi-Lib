import React, { useContext, useEffect, useState } from "react";
import Axios from "axios";

export default function SearchBar() {
    const [search, setSearch] = useState();
    const [result, setResult] = useState();

    const submit = async (e) => {
        e.preventDefault();
        try {
            const searchTerm = { title: search };
            
            const searchResult = await Axios.get("http://localhost:5000/books/search", {
                searchTerm,
            });

            console.log(searchResult);
            setResult(searchResult.data.items);

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div id="search">
            <form onSubmit={submit}>
                <input type="text" placeholder="Search for Books..." onChange={e => setSearch(e.target.value)} />
                <button type="submit">Search</button>
            </form>
        </div>
    )

}