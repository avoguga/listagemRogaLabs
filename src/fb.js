import firebase from 'firebase'

import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyAtJNlSFDOiAI1obyw6Eu_lGrcxoRcmJ_U",
    authDomain: "listagem-rogalabs.firebaseapp.com",
    projectId: "listagem-rogalabs",
    storageBucket: "listagem-rogalabs.appspot.com",
    messagingSenderId: "341148374703",
    appId: "1:341148374703:web:9c280dc7fb54185912e65a",
    measurementId: "G-9476VNNDGX"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  const db = firebase.firestore();


  export default db;