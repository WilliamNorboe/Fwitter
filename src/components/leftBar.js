import './leftBar.css';
import { useState, useEffect, useRef } from "react";


let setFuncs;

function FweetBox(props){

    const [formValue, setFormValue] = useState('');

    return(
      <div className='fweet'>
      <button className='close' onClick={()=>{props.open(false)}}>X</button>
      <p>Fweet</p>
      <form className='fweetForm'>
        <textarea id="fweetText" value={formValue} onChange={(e)=>setFormValue(e.target.value)} />
        <button id = "submitFweet" onClick={(e)=>{e.preventDefault(); props.sendFweet(e, formValue, setFormValue)}}>Fweet</button>
      </form>
    </div>
    )
  }

function homeClick(){
  for(let i = 0; i < setFuncs.length; ++i){
    setFuncs[i](false);
  }
}

function LeftBar(props){

    const [fweetEdit, setFweetEdit] = useState(false);

    setFuncs = props.setFuncs;
    return(
    <div className='leftbar'>
        {fweetEdit ? <FweetBox open = {setFweetEdit} sendFweet = {props.sendFweet} /> : <></>}
        <div className="buttons">
            <button onClick={homeClick}>Home</button>
            <button id = "fweetbtn" onClick={()=>{setFweetEdit(true)}}>Fweet</button>
        </div>

        <div className='profileInfo'>
            <img id = "pfp" src = {props.user.photoURL} alt = "profile_pic"></img>
            <sub>
                <p>{props.user.email}</p>
                <props.logout />
            </sub>
        </div>
    </div>
    )
}

export default LeftBar