var firebaseConfig = {
	apiKey: "AIzaSyAnr1QKWXAc6SRu0SHWNaQ5MAQ-6HILoRE",
	authDomain: "clone-2-9cbf3.firebaseapp.com",
	projectId: "clone-2-9cbf3",
	storageBucket: "clone-2-9cbf3.appspot.com",
	messagingSenderId: "372061462867",
	appId: "1:372061462867:web:259444b7f273c9686bc1a6",
	measurementId: "G-NZRXT1V7VV"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var db = firebase.firestore();