import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const config = {
    apiKey: "AIzaSyDzrz0qT__UvhV_H3PG2Kjv11A5zaRcbng",
    authDomain: "codigo-test-d4844.firebaseapp.com",
    databaseURL: "https://codigo-test-d4844.firebaseio.com",
    projectId: "codigo-test-d4844",
    storageBucket: "codigo-test-d4844.appspot.com",
    messagingSenderId: "138286716600",
    appId: "1:138286716600:web:05dbcc2393e53da3a9064d"
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const db = firebase.database()