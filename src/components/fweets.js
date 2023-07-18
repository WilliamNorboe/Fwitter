import './fweets.css';
import 'firebase/compat/firestore';
import {firebase, auth, firestore} from '../App.js';
let setFuncs;


async function profileClicked(uid){
    // let profile = (await firestore.collection("users").doc(uid).get()).data();
    let profile = (await firestore.collection("users").doc(uid).get()).data();

    for(let i = 0; i < setFuncs.length; ++i){
        if(i === 1){
            continue;
        }
        setFuncs[i](false);
    }
    setFuncs[1](profile);
}


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
    setFuncs[0](id);
}

function Fweet(props){
    const { text, uid, photoURL, createdAt, msgID} = props.message;
    // console.log(createdAt);
    return (
    <div className='fweetPost'>
        <img src = {photoURL} onClick={()=>{profileClicked(uid)}}/>
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