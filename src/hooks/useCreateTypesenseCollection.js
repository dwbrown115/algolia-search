import { getFirestore, getDocs } from "firebase/firestore";
// const Typesense = require("typesense");

import firebase_app from "../firebase/config";
import { client } from "../typesense/config";

async function useCreateTypesenseCollection(collection) {
  try {
    await client.collections().create(collection);
    console.log("success");
  } catch (e) {
    console.log(e);
  }
}

// import { collection, query, where, getDocs } from "firebase/firestore";

// const q = query(collection(db, "cities"), where("capital", "==", true));
// const querySnapshot = await getDocs(collection(db, "cities"));

// async function useCreateTypesenseCollection(
//   firebaseCollection,
//   typesenseCollection,
//   schema
// ) {
//   const db = getFirestore(firebase_app);
//   // A state variable to store the status of the operation
//   const [status, setStatus] = useState("pending");
//   // A state variable to store the error if any
//   const [error, setError] = useState(null);
//   // A useEffect hook to run the operation once on mount
//   useEffect(() => {
//     // Get a reference to the firebase collection
//     var fbRef = getDocs(firebaseCollection);
//     // Get a reference to the typesense collection
//     var tsRef = Typesense.collection(typesenseCollection);
//     // Create the typesense collection with the given schema
//     tsRef
//       .create(schema)
//       .then(function (response) {
//         // Log the response
//         console.log(response);
//         // Set the status to success
//         setStatus("success");
//         // Get all the documents from the firebase collection
//         return fbRef.get();
//       })
//       .then(function (querySnapshot) {
//         // Loop through the documents
//         querySnapshot.forEach(function (doc) {
//           // Get the document data
//           var data = doc.data();
//           // Add the document id as a field
//           data.id = doc.id;
//           // Convert the data to JSON string
//           var json = JSON.stringify(data);
//           // Index the document in typesense
//           tsRef
//             .documents()
//             .create(json)
//             .then(function (response) {
//               // Log the response
//               console.log(response);
//             })
//             .catch(function (error) {
//               // Log the error
//               console.error(error);
//             });
//         });
//       })
//       .catch(function (error) {
//         // Log the error
//         console.error(error);
//         // Set the error state
//         setError(error);
//       });
//   }, []); // Run only once on mount

//   // Return the status and error state variables
//   return [status, error];
// }

export default useCreateTypesenseCollection;
