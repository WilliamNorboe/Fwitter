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
import ViewFweetPage from './components/viewFweet';
import ViewProfilePage from './components/profile';


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

async function users(usersRef){
  console.log(usersRef);
  let email = auth.currentUser.email.split('@')[0];
  let valid = await (usersRef.doc(email)).get();
  if(!valid.exists){
    console.log("yo");
    await usersRef.doc(email).set({
      email: email,
      pfp: auth.currentUser.photoURL,
    });
    return;
  }
  await usersRef.doc(email).update({email: email});
}

function Fwitter(){
  const messagesRef = firestore.collection("Fweets");
  const query = messagesRef.orderBy('createdAt', 'desc').limit(25);
  const [messages] = useCollectionData(query);

  const usersRef = firestore.collection("users");
  users(usersRef);

  const sendFweet = async(e, formValue, setFormValue) =>{
    const { email, photoURL} = auth.currentUser;
    let uid = email.split('@')[0];
    let l = (Date.now().toString(36) + Math.random().toString(36).substr(2));
    let msg = {
      text: formValue,
      createdAt: 0,
      uid,
      msgID: l,
      photoURL,
      replies: []
    };
    msg.createdAt = await firebase.firestore.FieldValue.serverTimestamp();
    await messagesRef.doc(l).set(msg);
    setFormValue('');
    document.querySelector(".close").click();
  }

  const sendReply = async(e, formValue, setFormValue, msg) =>{
    const { email, photoURL} = auth.currentUser;
    let uid = email.split('@')[0];
    let l = (Date.now().toString(36) + Math.random().toString(36).substr(2));
    let replies = msg.replies;
    let reply = {
      text: formValue,
      uid,
      msgID: l,
      photoURL,
      parent: msg.msgID
    };
    replies.unshift(reply);
    await firestore.collection("Fweets").doc(msg.msgID).update({replies: replies});
    setFormValue('');
  }


  let setFuncs = [];
  const [viewFweet, setViewFweet] = useState(false);
  const [profile, setProfile] = useState(false);
  setFuncs.push(setViewFweet);
  setFuncs.push(setProfile);
  
  return(
    <>
      <div className='middle'>
        <LeftBar user = {auth.currentUser} logout = {SignOut} sendFweet = {sendFweet} setFuncs = {setFuncs} />

        {viewFweet ? <ViewFweetPage message = {viewFweet} sendReply = {sendReply} setFuncs = {setFuncs} /> 
        : <>
          {profile ?<ViewProfilePage profile = {profile} messages = {messages} sendReply = {sendReply} setFuncs = {setFuncs} />
          : <Fweets messages = {messages} setFuncs = {setFuncs} />
        }</> }
        <RightBar />
      </div>
    </>
  )
}


const App = ()=> {

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
export{
  firebase,
  auth,
  firestore
}
