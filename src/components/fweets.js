import './fweets.css';


const test = (uid)=>{
    console.log(uid);
}

function Fweet(props){
    const { text, uid, photoURL} = props.message;

    return (
    <div className='fweetPost' onClick={()=>{test(props.message.msgID)}}>
        <img src = {photoURL} />
        <p className='text'>{text}</p>
    </div>
    )
}


function Fweets(props){
    let messages = props.messages;

    return(
        <div id = "posts">
            {messages && messages.map(msg => <Fweet key = {msg.msgID} message ={msg}/>)}
        </div>
    )
}

export default Fweets