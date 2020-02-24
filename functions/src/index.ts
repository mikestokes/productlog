import * as functions from 'firebase-functions'

// https://us-central1-productlogdotdev.cloudfunctions.net/helloWorld
export const helloWorld = functions.https.onRequest((req, res) => {
 res.send("Hello from Firebase!")
})
