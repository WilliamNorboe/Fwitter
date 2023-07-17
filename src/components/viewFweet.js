import './fweets.css';
import { useState, useEffect, useRef } from "react";


import 'firebase/compat/firestore';
import {firebase, auth, firestore} from '../App.js';

let setFuncs;
let cpy;

async function deleteFweet(msg){
    console.log(msg);
    let replies = cpy.replies;
    const test = replies.map(item => {
        return item.msgID;
    });
    let index = test.indexOf(msg.msgID);
    if(index == -1){
        return;
    }
    cpy.replies.splice(index, 1);
    await firestore.collection("Fweets").doc(msg.parent).update({replies: cpy.replies});
    setFuncs[0](cpy);
}

function deleteButton(msg){
    if(msg.uid === auth.currentUser.email.split("@")[0]){
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
            {deleteButton(props.message)}
        </div>
    </div>
    )
}

const getReplies = (replies) =>{
    let disreplies = [];
    for(let i = replies.length-1; i >= 0; i--){
        disreplies.push(<Fweet key = {replies[i].msgID} message ={replies[i].msg} />)
    }
    return disreplies
}


function ViewFweetPage(props){
    let msg = props.message;
    cpy = msg;
    // console.log(msg.replies[0]);
    setFuncs = props.setFuncs;
    // let displayReplies = getReplies(msg.replies);
    // setFuncs = props.setFuncs;
    const [formValue, setFormValue] = useState('');
    return(
        <div id = "posts">
            {<Fweet key = {msg.msgID} message ={msg} />}
            <div className = "replyBox">
                    <p>Reply</p>
                    <form className='replyForm'>
                        <textarea id="replyText" value={formValue} onChange={(e)=>setFormValue(e.target.value)} />
                        <button id = "submitReply" onClick={(e)=>{e.preventDefault(); props.sendReply(e, formValue, setFormValue, msg)}}>Reply</button>
                    </form>
            </div>
            {/* {displayReplies} */}
            {msg.replies && msg.replies.map(msg2 => <Fweet key = {msg2.msgID} message ={msg2} />)}
        </div>
    )
}

export default ViewFweetPage