import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDVUHMWTT38gaFJ66F7fAntIA3bxrO4zrw",
    authDomain: "catch-of-the-day-coolwalker.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-coolwalker.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;

