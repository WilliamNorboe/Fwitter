import './fweets.css';
import { useState, useEffect, useRef } from "react";


import 'firebase/compat/firestore';
import {firebase, auth, firestore} from '../App.js';

let setFuncs;
let parent;

async function deleteFweet(msg){
    let replies = parent.replies;
    const test = replies.map(item => {
        return item.msgID;
    });
    let index = test.indexOf(msg.msgID);
    if(index == -1){
        return;
    }
    parent.replies.splice(index, 1);
    await firestore.collection("Fweets").doc(msg.parent).update({replies: parent.replies});
    setFuncs[0](parent);
}

function deleteButton(msg){
    if(msg.uid === auth.currentUser.email.split("@")[0] && msg != parent){
        return <button className='delete' onClick={()=>{deleteFweet(msg)}}>X</button>;
    }
    else{
        return <></>
    }
}

function Fweet(props){
    const { text, uid, photoURL, msgID} = props.message;
    // console.log(createdAt);
    return (
    <div className='fweetPost'>
        <img src = {photoURL} />
        <div id = "fweetInfo">
            <p>{uid}</p>
            {/* <p>{createdAt.seconds * 1000 + createdAt.nanoseconds/1000000}</p> */}
            <p className='text'>{text}</p>
        </div>
        {deleteButton(props.message)}
    </div>
    )
}



function ViewFweetPage(props){
    parent = props.message;
    // parent = msg;
    // console.log(msg.replies[0]);
    setFuncs = props.setFuncs;
    // let displayReplies = getReplies(msg.replies);
    // setFuncs = props.setFuncs;
    const [formValue, setFormValue] = useState('');
    return(
        <div id = "posts">
            {<Fweet key = {parent.msgID} message ={parent} />}
            <div className = "replyBox">
                    <p>Reply</p>
                    <form className='replyForm'>
                        <textarea id="replyText" value={formValue} onChange={(e)=>setFormValue(e.target.value)} />
                        <button id = "submitReply" onClick={(e)=>{e.preventDefault(); props.sendReply(e, formValue, setFormValue, parent)}}>Reply</button>
                    </form>
            </div>
            {/* {displayReplies} */}
            {parent.replies && parent.replies.map(msg => <Fweet key = {msg.msgID} message ={msg} />)}
        </div>
    )
}

export default ViewFweetPage