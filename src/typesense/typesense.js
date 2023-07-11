const functions = require("firebase-functions/v1");
const Typesense = require("typesense");

import {
  TYPESENSE_API_KEY,
  TYPESENSE_SEARCH_API_KEY,
  TYPESENSE_HOST,
} from "../../config";

const TYPESENSE_ADMIN_API_KEY = TYPESENSE_API_KEY;
const TYPESENSE_SEARCH_API_KEY = TYPESENSE_SEARCH_API_KEY;

const client = new Typesense.Client({
  nodes: [
    {
      host: TYPESENSE_HOST, // where xxx is the ClusterID of your Typesense Cloud cluster
      port: "443",
      protocol: "https",
    },
  ],
  apiKey: TYPESENSE_ADMIN_API_KEY,
  connectionTimeoutSeconds: 2,
});

// Search for notes with matching text
const searchParameters = {
  'q': query,
  'query_by': 'text'
}; 

const searchResults = await client.collections('notes')
  .documents()
  .search(searchParameters);

async function createTypesenseCollections() {
  // Every 'collection' in Typesense needs a schema. A collection only
  // needs to be created one time before you index your first document.
  //
  // Alternatively, use auto schema detection:
  // https://typesense.org/docs/latest/api/collections.html#with-auto-schema-detection
  const notesCollection = {
    name: "notes",
    fields: [
      { name: "id", type: "string" },
      { name: "owner", type: "string" },
      { name: "text", type: "string" },
    ],
  };

  await client.collections().create(notesCollection);
}

// Update the search index every time a blog post is written.
exports.onNoteWritten = functions.firestore.document('notes/{noteId}').onWrite(async (snap, context) => {
  // Use the 'nodeId' path segment as the identifier for Typesense
  const id = context.params.noteId;

  // If the note is deleted, delete the note from the Typesense index
  if (!snap.after.exists) {
    await client.collections('notes').documents(id).delete();
    return;
  }

  // Otherwise, create/update the note in the the Typesense index
  const note = snap.after.data();
  await client.collections('notes').documents().upsert({
    id,
    owner: note.owner,
    text: note.text
  });
});

exports.getScopedApiKey = functions.https.onCall(async (data, context) => {
  // Ensure that the user is authenticated with Firebase Auth
  if (!(context.auth && context.auth.uid)) {
    throw new functions.https.HttpsError('permission-denied', 'Must be signed in!');
  }

  // Generate a scoped API key which allows the user to search ONLY
  // documents which belong to them (based on the 'owner' field).
  const scopedApiKey = client.keys().generateScopedSearchKey(
    TYPESENSE_SEARCH_API_KEY, 
    { 
      'filter_by': `owner:${context.auth.uid}`
    }
  );

  return {
    key: scopedApiKey
  };
});
// [END api_key_function_typesense]