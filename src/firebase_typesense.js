// firebase_typesense.js

// Import firebase and typesense
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import Typesense from "typesense";

// Paste your firebase config object here
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize firebase app
// const firebaseApp = firebase.initializeApp(firebaseConfig);

// Initialize firestore database
const db = firebaseApp.firestore();

// Paste your typesense API key here
const typesenseApiKey = "YOUR_API_KEY";

// Initialize typesense client
const client = new Typesense.Client({
  nodes: [
    {
      host: "xxx.a1.typesense.net", // where xxx is the ClusterID of your Typesense Cloud cluster
      port: "443",
      protocol: "https",
    },
  ],
  apiKey: typesenseApiKey,
  connectionTimeoutSeconds: 2,
});

// Export firebase app, firestore database and typesense client
export { firebaseApp, db, client };
