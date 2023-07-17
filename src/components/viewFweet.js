import './fweets.css';
import { useState, useEffect, useRef } from "react";

let setFuncs;


function Fweet(props){
    const { text, uid, photoURL} = props.message;
    // console.log(createdAt);
    return (
    <div className='fweetPost'>
        <img src = {photoURL} />
        <div id = "fweetInfo">
            <p>{uid}</p>
            {/* <p>{createdAt.seconds * 1000 + createdAt.nanoseconds/1000000}</p> */}
            <p className='text'>{text}</p>
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
    console.log(msg.replies[0])
    let displayReplies = getReplies(msg.replies);
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
            {msg.replies && msg.replies.map(msg => <Fweet key = {msg.msgID} message ={msg}/>)}
        </div>
    )
}

export default ViewFweetPage