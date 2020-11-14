import firebase from 'firebase';

const  firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyC6_vKg6VPQ8jNjgK07paTYCGtW_dy76gs",
    authDomain: "shopping-app-36c61.firebaseapp.com",
    databaseURL: "https://shopping-app-36c61.firebaseio.com",
    projectId: "shopping-app-36c61",
    storageBucket: "shopping-app-36c61.appspot.com",
    messagingSenderId: "608807299030",
    appId: "1:608807299030:web:20607c3eb8a3b150162677",
    measurementId: "G-CRTFP5KR23"
  });

const auth = firebase.auth();

export { auth };