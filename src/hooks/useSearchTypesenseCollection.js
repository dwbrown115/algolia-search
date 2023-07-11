import axios from "axios";

import { client } from "../typesense/config";

async function useSearchTypesenseCollection(searchParameters) {
  // await client.collections("notes").documents().search(searchParameters)
  try {
    await client.collections("books").documents().search(searchParameters);
    console.log("success");
  } catch (e) {
    console.log(e);
  }
}
// async function useSearchTypesenseCollection(
//   typesenseCollection,
//   query,
//   options
// ) {
//   // A state variable to store the search results
//   const [results, setResults] = useState([]);
//   // A state variable to store the loading status of the search
//   const [loading, setLoading] = useState(false);
//   // A state variable to store the error if any
//   const [error, setError] = useState(null);
//   // A useEffect hook to run the search whenever the query or options change
//   useEffect(() => {
//     // Set the loading status to true
//     setLoading(true);
//     // Build a url for the search request using axios params
//     var url = `/typesense/collections/${typesenseCollection}/documents/search`;
//     var params = { ...query, ...options };
//     // Send a get request to the url with the params
//     axios
//       .get(url, { params })
//       .then(function (response) {
//         // Get the data from the response
//         var data = response.data;
//         // Set the results state with the data
//         setResults(data);
//         // Set the loading status to false
//         setLoading(false);
//       })
//       .catch(function (error) {
//         // Log the error
//         console.error(error);
//         // Set the error state with the error
//         setError(error);
//         // Set the loading status to false
//         setLoading(false);
//       });
//   }, [query, options]); // Run whenever query or options change

//   // Return the results, loading and error state variables
//   return [results, loading, error];
// }

export default useSearchTypesenseCollection;
