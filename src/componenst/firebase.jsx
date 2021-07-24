  import  firebase from "firebase/app"
  import "firebase/firestore"
  

  // Your web app's Firebase configuration

  var firebaseConfig = {
    apiKey: "AIzaSyAxmgR9CLrs26gbgPNSiVtzr3WVSrsPXiA",
    authDomain: "fb-crud-react-37724.firebaseapp.com",
    projectId: "fb-crud-react-37724",
    storageBucket: "fb-crud-react-37724.appspot.com",
    messagingSenderId: "1057516487396",
    appId: "1:1057516487396:web:19b052d483a887f31d62f1"
  };

  // Initialize Firebase
   const fb = firebase.initializeApp(firebaseConfig);

  export const db = fb.firestore();
  
