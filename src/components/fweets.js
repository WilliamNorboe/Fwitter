import './fweets.css';

let setFuncs;

const viewFweet = (id)=>{
    console.log(id);
    setFuncs[0](id);
}

function Fweet(props){
    const { text, uid, photoURL, createdAt} = props.message;
    // console.log(createdAt);
    return (
    <div className='fweetPost' onClick={()=>{viewFweet(props.message)}}>
        <img src = {photoURL} />
        <div id = "fweetInfo">
            <p>{uid}</p>
            {/* <p>{createdAt.seconds * 1000 + createdAt.nanoseconds/1000000}</p> */}
            <p className='text'>{text}</p>
        </div>
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