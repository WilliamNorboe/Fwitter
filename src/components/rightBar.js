import './rightBar.css';
import { useState, useEffect, useRef } from "react";

async function sendGetRequest(url, params) {
    // Construct the query string from the 'params' object
    const queryString = Object.keys(params)
      .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
      .join('&');
  
    // Append the query string to the URL
    const urlWithParams = url + (queryString ? '?' + queryString : '');
  
    return fetch(urlWithParams)
      .then((response) => {
        if (!response.ok) {
        //   throw new Error('Request failed');
        }
        return response.json();
      })
      .catch((error) => {
        throw error;
      });
  }

function RightBar(){

    let mainUrl = " https://newsapi.org/v1/articles";
    let queryParams = {
        "source": "bbc-news",
        "sortBy": "top",
        "apiKey": "c78e0e77fee9497e895968986b3afaee"
      };
    const [rightbar, setRightbar] = useState(<></>);

    sendGetRequest(mainUrl, queryParams).then((data)=>{
        console.log(data);
        // setRightbar(
        //     <div className='rightbar'>
        //     News
        //     {/* <button>Home</button>
        //     <button>Fweet</button> */}
        // </div>
        // );
    });
    return(
        rightbar
    )
}

export default RightBar