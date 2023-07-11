import functions from 'firebase-functions'

import { client } from '../typesense/config'
async function useOnBooksWritten(data) {
    try {
        functions.firestore.document('/books/{bookId}').onWrite
    } catch(e) {
        console.log(e)
    }
}

export default useOnBooksWritten