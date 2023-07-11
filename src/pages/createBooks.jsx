import React, { useEffect, useState } from "react";
import algoliasearch from "algoliasearch";

import {
  ALGOLIA_APPLICATION_ID,
  ALGOLIA_SEARCH_KEY,
  FIREBASE_PROJECT_ID,
} from "../../config";

export function createBooks() {
  const [searchFor, setSearchFor] = useState("");
  let [hits, setHits] = useState([]);

  const search = (query) => {
    var client = algoliasearch(ALGOLIA_APPLICATION_ID, ALGOLIA_SEARCH_KEY);
    var index = client.initIndex("vite-firebase");
    try {
      index.search(query).then(function (responses) {
        // console.log(responses.hits);
        // hits.push(responses.hits);
        setHits(...hits, responses.hits);
      });
    } catch (e) {
      console.log(e);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(searchFor);
    setSearchFor("");
    search(searchFor);
  };
  useEffect(() => {
    setSearchFor("");
    setHits([]);
    // console.log(hits);
  }, []);
  return (
    <>
      <div>
        <form onSubmit={handleSubmit} id="search-books">
          <label typeof="text">Search Books: </label>
          <input
            type="search"
            id="searchBooks"
            className="search-books-input"
            value={searchFor}
            onChange={(e) => setSearchFor(e.target.value.toString())}
          />
          <input type="submit" />
        </form>
        <div>
          <div>Results: </div>
          {hits.map((item, key) => {
            return (
              <div key={key}>
                <br />
                <div>Title: {item.title}</div>
                <div>Author: {item.author}</div>
                <div>Rating: {item.rating}</div>
                <div>
                  Genres:{" "}
                  {item.genre.map((item, key) => {
                    return <div key={key}>{item}</div>;
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
