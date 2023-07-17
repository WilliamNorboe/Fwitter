import './fweets.css';
import 'firebase/compat/firestore';
import {firebase, auth, firestore} from '../App.js';
let setFuncs;


async function deleteFweet(msgID){
    console.log(msgID);
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
    console.log(id);
    setFuncs[0](id);
}

function Fweet(props){
    const { text, uid, photoURL, createdAt, msgID} = props.message;
    // console.log(createdAt);
    return (
    <div className='fweetPost'>
        <img src = {photoURL} />
        <div id = "fweetInfo" onClick={()=>{viewFweet(props.message)}}>
            <p>{uid}</p>
            {/* <p>{createdAt.seconds * 1000 + createdAt.nanoseconds/1000000}</p> */}
            <p className='text'>{text}</p>
        </div>
        {deleteButton(uid, msgID)}
    </div>
    )
}


function Fweets(props){
    let messages = props.messages;
    setFuncs = props.setFuncs;
    return(
        <div id = "posts">
            {messages && messages.map(msg => <Fweet key = {msg.msgID} message ={msg}/>)}
        </div>
    )
}

export default Fweets