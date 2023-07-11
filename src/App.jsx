import React, { useEffect } from "react";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  getDocs,
} from "firebase/firestore";

import firebase_app from "./firebase/config";
import { createBooks } from "./pages/createBooks";

function App() {
  const db = getFirestore(firebase_app);
  var book1 = {
    id: "1",
    title: "The Hitchhiker's Guide to the Galaxy",
    author: "Douglas Adams",
    genre: ["Science Fiction", "Comedy"],
    rating: 4.5,
  };

  // Three more example book documents for this
  var book2 = {
    id: "2",
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    genre: ["Fantasy", "Adventure"],
    rating: 4.8,
  };

  var book3 = {
    id: "3",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    genre: ["Fiction", "Coming-of-age"],
    rating: 3.9,
  };

  var book4 = {
    id: "4",
    title: "The Da Vinci Code",
    author: "Dan Brown",
    genre: ["Thriller", "Mystery"],
    rating: 4.1,
  };

  const docSet = async () => {
    try {
      await setDoc(doc(db, "books", "1"), book1);

      await setDoc(doc(db, "books", "2"), book2);

      await setDoc(doc(db, "books", "3"), book3);

      await setDoc(doc(db, "books", "4"), book4);
      console.log("success");
      // const querySnapshot = await getDocs(collection(db, "books"));
      // querySnapshot.forEach((doc) => {
      //   // doc.data() is never undefined for query doc snapshots
      //   console.log(doc.id, " => ", doc.data());
      // });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    // docSet();
  }, []);

  return (
    <>
      <div>Home</div>
      <div>{createBooks()}</div>
    </>
  );
}

export default App;
