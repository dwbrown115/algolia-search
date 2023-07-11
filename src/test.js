// A basic typesense firebase integration for react js
// Assuming you have initialized firebase and typesense in your project
// Using react hooks and axios for simplicity

import React, { useState, useEffect } from "react";
import axios from "axios";

// A basic typesense firebase integration for react js
// Assuming you have initialized firebase and typesense in your project
// Using react hooks and axios for simplicity
// A custom hook to create a typesense collection from a firebase collection
function useCreateTypesenseCollection(
  firebaseCollection,
  typesenseCollection,
  schema
) {
  // A state variable to store the status of the operation
  const [status, setStatus] = useState("pending");
  // A state variable to store the error if any
  const [error, setError] = useState(null);
  // A useEffect hook to run the operation once on mount
  useEffect(() => {
    // Get a reference to the firebase collection
    var fbRef = firebase.firestore().collection(firebaseCollection);
    // Get a reference to the typesense collection
    var tsRef = typesense.collections(typesenseCollection);
    // Create the typesense collection with the given schema
    tsRef
      .create(schema)
      .then(function (response) {
        // Log the response
        console.log(response);
        // Set the status to success
        setStatus("success");
        // Get all the documents from the firebase collection
        return fbRef.get();
      })
      .then(function (querySnapshot) {
        // Loop through the documents
        querySnapshot.forEach(function (doc) {
          // Get the document data
          var data = doc.data();
          // Add the document id as a field
          data.id = doc.id;
          // Convert the data to JSON string
          var json = JSON.stringify(data);
          // Index the document in typesense
          tsRef
            .documents()
            .create(json)
            .then(function (response) {
              // Log the response
              console.log(response);
            })
            .catch(function (error) {
              // Log the error
              console.error(error);
            });
        });
      })
      .catch(function (error) {
        // Log the error
        console.error(error);
        // Set the error state
        setError(error);
      });
  }, []); // Run only once on mount

  // Return the status and error state variables
  return [status, error];
}

// A custom hook to search a typesense collection from a react component
function useSearchTypesenseCollection(typesenseCollection, query, options) {
  // A state variable to store the search results
  const [results, setResults] = useState([]);
  // A state variable to store the loading status of the search
  const [loading, setLoading] = useState(false);
  // A state variable to store the error if any
  const [error, setError] = useState(null);
  // A useEffect hook to run the search whenever the query or options change
  useEffect(() => {
    // Set the loading status to true
    setLoading(true);
    // Build a url for the search request using axios params
    var url = `/typesense/collections/${typesenseCollection}/documents/search`;
    var params = { ...query, ...options };
    // Send a get request to the url with the params
    axios
      .get(url, { params })
      .then(function (response) {
        // Get the data from the response
        var data = response.data;
        // Set the results state with the data
        setResults(data);
        // Set the loading status to false
        setLoading(false);
      })
      .catch(function (error) {
        // Log the error
        console.error(error);
        // Set the error state with the error
        setError(error);
        // Set the loading status to false
        setLoading(false);
      });
  }, [query, options]); // Run whenever query or options change

  // Return the results, loading and error state variables
  return [results, loading, error];
}

// Example usage

// Define a schema for a books collection
var booksSchema = {
  name: "books",
  fields: [
    { name: "id", type: "string" },
    { name: "title", type: "string" },
    { name: "author", type: "string" },
    { name: "genre", type: "string" },
    { name: "rating", type: "float" },
  ],
  default_sorting_field: "rating",
};

// A react component to create a typesense collection from a firebase collection called books
export function CreateBooks() {
  // Use the custom hook to create the typesense collection books from firebase collection books
  const [status, error] = useCreateTypesenseCollection(
    "books",
    "books",
    booksSchema
  );
  // Render the component based on the status and error
  return (
    <div>
      {status === "pending" && <p>Creating typesense collection...</p>}
      {status === "success" && (
        <p>Typesense collection created successfully.</p>
      )}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}

// A react component to search books by title and genre
export function SearchBooks() {
  // A state variable to store the title input value
  const [title, setTitle] = useState("");
  // A state variable to store the genre input value
  const [genre, setGenre] = useState("");
  // Use the custom hook to search the typesense collection books with the title and genre values
  const [results, loading, error] = useSearchTypesenseCollection("books", {
    q: title,
    query_by: "title",
    filter_by: `genre:=[${genre}]`,
    sort_by: "_text_match:desc,rating:desc",
  });
  // A handler function to update the title state on input change
  function handleTitleChange(event) {
    setTitle(event.target.value);
  }
  // A handler function to update the genre state on input change
  function handleGenreChange(event) {
    setGenre(event.target.value);
  }
  // Render the component with the inputs and the results
  return (
    <div>
      <h1>Search Books</h1>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={handleTitleChange}
      />
      <label htmlFor="genre">Genre:</label>
      <input
        type="text"
        id="genre"
        value={genre}
        onChange={handleGenreChange}
      />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {results.length > 0 && (
        <ul>
          {results.map((book) => (
            <li key={book.id}>
              <h2>{book.title}</h2>
              <p>Author: {book.author}</p>
              <p>Genre: {book.genre.join(", ")}</p>
              <p>Rating: {book.rating}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
