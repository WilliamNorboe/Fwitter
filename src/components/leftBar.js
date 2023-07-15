import './leftBar.css';

function leftBar(props){


    return(
    <div className='leftbar'>
        <div className="buttons">
            <button>Home</button>
            <button id = "fweetbtn">Fweet</button>
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

export default leftBar