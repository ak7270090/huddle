import { useEffect, useState } from "react";
import "./huddle.css";

import { HuddleIframe } from "@huddle01/huddle01-iframe";
import React from 'react';

import axios from 'axios';

function Huddle() {

  // start 
  const [transcript, setTranscript] = useState("");
  const [isRecording, setisRecording] = useState(false);

  try {
    var speechRecognition = new window.webkitSpeechRecognition();
  } catch (e) {
    var speechRecognition = Object;
  }

  //check if connected or not
  //console.log(speechRecognition)

  // String for the Final Transcript
  let final_transcript = "";

  // Set the properties for the Speech Recognition object
  speechRecognition.continuous = true;
  speechRecognition.interimResults = true;
  speechRecognition.language= 'en-IN'

  // Set the onClick property of the start button
  const start = () => {
   
    speechRecognition.start();
  };

  // Set the onClick property of the stop button
  const stop = () => {
    
    speechRecognition.stop();
    console.log('final transcript', transcript);
    senddata();

  };

  speechRecognition.onresult = (event) => {

    //console the whole event
    // console.log("event",event)

    // Create the interim transcript
    let interim_transcript = "";

    // Loop through the results from the speech recognition object.
    for (let i = event.resultIndex; i < event.results.length; ++i) {

      console.log("event result", event.results[i][0])
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
        setTranscript(final_transcript);
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
      // Set the Final franscript and Interim transcript.
    document.querySelector("#final").innerHTML = final_transcript;
    document.querySelector("#interim").innerHTML = interim_transcript;

    }


  };

  const senddata = async () => {
    const res = await axios.post(`http://localhost:8080/rec/getrec`,
      { data: transcript }, { validateStatus: false, withCredentials: true });
    console.log('res', res);
  }

  const startRecordController = () => {
    if (isRecording) {
      speechRecognition.start();
      speechRecognition.onend = () => {
        console.log("continue..");
        speechRecognition.start();
      };
    } else {
      speechRecognition.stop();
      speechRecognition.onend = () => {
        console.log("Stopped microphone on Click");
      };
    }
  }
  speechRecognition.onstart = () => {
    console.log("microphones on");
  };
  // useEffect(() => {
  //   startRecordController();
  // },[]);


  const iframeConfig = {
    roomUrl: "https://iframe.huddle01.com/test-room",
    height: "500px",
    width: "60%",
  };

  return (
    <>
    <div className="App">
      <div className="container">
      
        
          
         
        <div className="container2">
        <HuddleIframe config={iframeConfig} />
             <div className="main-content">
             <div id="final" ></div>
            <div id="interim"></div>
              </div>
            

          </div> 
          <div className="btn-style">

                 
          <button onClick={() => {
                setisRecording(true)
                start()
                console.log("bhagwa started")
                }}>Start Listening</button>
          <button onClick={() => {
                stop()
                setisRecording(false)
                console.log("bhagwa stoped")
              }}>Stop Listening</button>

      </div>
      </div>
      
      </div>
    
  </>

    // <>
    //   <div className="App">
    //     <div className="container">
    //       <div>
            

    //         <button onClick={() => {
    //             start()
    //             console.log("bhagwa started")
    //           }
    //           }
    //         >
    //           Start Analysis
    //         </button>

    //         <button
    //           onClick={() => {
    //             stop()
    //             console.log("bhagwa stoped")
    //           }
    //           }
    //         >
    //           Stop Analysis
    //         </button>

    //         {/* start */}

    //       </div>
    //       <div>
    //         <HuddleIframe config={iframeConfig} />
    //         <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem quis dolorum officia reiciendis quidem quisquam assumenda possimus veritatis laudantium vel molestias modi distinctio asperiores commodi, consectetur iusto omnis esse neque! </div> */}
    //          <div class="p-3" style={{border: "1px solid gray", height: "300px", borderradius: "8px"}}>
    //         <span id="final" class="text-light"></span>
    //         <span id="interim" class="text-secondary"></span>
    //         </div>
            
    //       </div>  
    //     </div>
    //   </div>
    // </>
  );
}

export default Huddle;
