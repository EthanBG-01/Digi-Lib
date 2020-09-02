import React, { useContext, useEffect, useState } from "react";

export default function Banner() {
    const [search, setSearch] = useState();

    const submit = async (e) => {
        e.preventDefault();
        try {
            const searchTerm = { title: search };



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