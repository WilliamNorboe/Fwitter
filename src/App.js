import './App.css';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { useState, useEffect, useRef } from "react";

import LeftBar from './components/leftBar.js';
import RightBar from './components/rightBar';
import { signOut } from 'firebase/auth';

firebase.initializeApp({
  apiKey: "AIzaSyCwclLuSoHn-hy1eQF9_KEDuVuJAmLobkM",
  authDomain: "fwitter-a80b0.firebaseapp.com",
  projectId: "fwitter-a80b0",
  storageBucket: "fwitter-a80b0.appspot.com",
  messagingSenderId: "294306100495",
  appId: "1:294306100495:web:1d9a7decbb0431aa6d3a7a",
  measurementId: "G-G0CLMYM236"
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function SignIn(){
  const signInWithGoogle = () =>{
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  return(
    <button onClick = {signInWithGoogle}> Sign in with Google</button>
  )
}

function SignOut(){
  return auth.currentUser && (
    <button onClick = {()=>auth.signOut()}>Sign Out</button>
  )
}

function Fweet(props){
  const { text, uid } = props.message;
  return <p>{text}</p>
}


function Fwitter(){
  const messagesRef = firestore.collection("Fweets");
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, {idField: 'id'})

  return(
    <>
      <div className='middle'>
        <LeftBar user = {auth.currentUser} logout = {SignOut} />
        {messages && messages.map(msg => <Fweet key = {msg.id} message ={msg}/>)}
        <RightBar />
      </div>
    </>
  )
}
function App() {

  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header className="App-header">
        <SignOut />
      </header>
      <section>
        {user ? <Fwitter /> : <SignIn />}
      </section>
    </div>
  );
}

export default App;
