import './App.css';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { useState, useEffect, useRef } from "react";
import { signOut } from 'firebase/auth';

import LeftBar from './components/leftBar.js';
import RightBar from './components/rightBar';
import Fweets from './components/fweets';

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


function Fwitter(){
  const messagesRef = firestore.collection("Fweets");
  const query = messagesRef.orderBy('createdAt', 'desc').limit(25);
  const [messages] = useCollectionData(query, {idField: 'id'})

  const sendFweet = async(e, formValue, setFormValue) =>{
    const { uid, photoURL} = auth.currentUser;
    let l = (Date.now().toString(36) + Math.random().toString(36).substr(2));
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      msgID: l,
      photoURL
    });
    setFormValue('');
    document.querySelector(".close").click();
  }

  return(
    <>
      <div className='middle'>
        <LeftBar user = {auth.currentUser} logout = {SignOut} sendFweet = {sendFweet}/>
        <Fweets messages = {messages} />
        <RightBar />
      </div>
    </>
  )
}


function App() {

  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <section>
        {user ? <Fwitter /> : <SignIn />}
      </section>
    </div>
  );
}

export default App;
