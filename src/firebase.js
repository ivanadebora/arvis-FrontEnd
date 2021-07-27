import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyAnRNSezQ3lWtXtu7vSjj-v1_EP9Vc5TL8",
    authDomain: "arvis-6d7a0.firebaseapp.com",
    projectId: "arvis-6d7a0",
    storageBucket: "arvis-6d7a0.appspot.com",
    messagingSenderId: "198982413884",
    appId: "1:198982413884:web:03f53caf08c520ab50dd39",
    measurementId: "G-7FEHDEJHH7"
};

firebase.initializeApp(config);



export const ref = firebase.database().ref(); 
export const auth = firebase.auth;
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();

