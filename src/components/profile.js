import './fweets.css';
import { useState, useEffect, useRef } from "react";


import 'firebase/compat/firestore';
import {firebase, auth, firestore} from '../App.js';

let setFuncs;
let profile;

async function deleteFweet(msgID){
    await firestore.collection("Fweets").doc(msgID).delete();
}

function deleteButton(ucode, msgID){
    if(ucode === auth.currentUser.email.split("@")[0]){
        return <button className='delete' onClick={()=>{deleteFweet(msgID)}}>X</button>;
    }
    else{
        return <></>
    }
}

const viewFweet = (id)=>{
    for(let i = 0; i < setFuncs.length; ++i){
        setFuncs[i](false);
    }
    setFuncs[0](id)
}

function Fweet(props){
    const { text, uid, photoURL, msgID} = props.message;
    return (
    <div className='fweetPost'>
        <img src = {photoURL} />
        <div id = "fweetInfo" onClick = {()=>{viewFweet(props.message)}}>
            <p>{uid}</p>
            {/* <p>{createdAt.seconds * 1000 + createdAt.nanoseconds/1000000}</p> */}
            <p className='text'>{text}</p>
        </div>
        {deleteButton(uid, msgID)}
    </div>
    )
}


const filter = (msgs) => {
    let userMsg = [];
    for(let i = 0; i < msgs.length; ++i){
        if(profile.email != msgs[i].uid){
            continue;
        }
        userMsg.push(msgs[i]);
    }
    return userMsg;
}

function ViewProfilePage(props){
    profile = props.profile;
    let messages = filter(props.messages);
    setFuncs = props.setFuncs;

    return(
        <div id = "posts">
            <div id="profileInfo">
                <img src = {profile.pfp}></img>
                <p>Username: {profile.email}</p>
            </div>
            {/* {<Fweet key = {parent.msgID} message ={parent} />} */}
            {/* <div className = "replyBox">
                    <p>Reply</p>
                    <form className='replyForm'>
                        <textarea id="replyText" value={formValue} onChange={(e)=>setFormValue(e.target.value)} />
                        <button id = "submitReply" onClick={(e)=>{e.preventDefault(); props.sendReply(e, formValue, setFormValue, parent)}}>Reply</button>
                    </form>
            </div> */}
            {/* {displayReplies} */}
            {messages && messages.map(msg => <Fweet key = {msg.msgID} message ={msg} />)}
        </div>
    )
}

export default ViewProfilePage