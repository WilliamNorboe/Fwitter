import './fweets.css';
import { useState, useEffect, useRef } from "react";


import 'firebase/compat/firestore';
import {firebase, auth, firestore} from '../App.js';

let setFuncs;
let profile;

async function unfollow(unfollowing){
    let index = profile.followed.indexOf(unfollowing.email);
    if (index !== -1) {
        profile.followed.splice(index, 1);
        await firestore.collection("users").doc(profile.email).update({followed: profile.followed});
    }
    unfollowing.numFollowers--;
   
    await firestore.collection("users").doc(unfollowing.email).update({numFollowers: unfollowing.numFollowers});
    const clone = structuredClone(profile);
    setFuncs[2](clone);
}


const viewProfile = (user)=>{
    for(let i = 0; i < setFuncs.length; ++i){
        setFuncs[i](false);
    }
    setFuncs[1](user);
}

function Profile(props){
    const curPro = props.message;
    const [collected, setCollected] = useState(false);
    firestore.collection("users").doc(curPro).get().then((result)=>{
        result = result.data();
        const pfp = result.pfp;
        const email = result.email;
        setCollected(
        <div className='profile'>
            <img src = {pfp} onClick = {()=>{viewProfile(result)}}/>
            <div>
                <span>{email}</span>
                <button className='follow' onClick={()=>{unfollow(result)}}>Unfollow</button>
            </div>
        </div>
        )
    })
    return collected;
}


function ViewFollowingPage(props){
    profile = props.profile;
    let followed = profile.followed;
    setFuncs = props.setFuncs;

    return(
        <div id = "followed">
            <div className="profile">
                <img src = {profile.pfp}></img>
                <p>Username: {profile.email}</p>
            </div>
            Following
            {followed && followed.map(msg => <Profile key = {msg} message ={msg} />)}
        </div>
    )
}

export default ViewFollowingPage;