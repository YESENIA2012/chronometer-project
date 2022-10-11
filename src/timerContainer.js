import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlay, faPause, faArrowsRotate} from '@fortawesome/free-solid-svg-icons'



const TimerContainer = (props) => {

  const { time, play, resetCountersButton, moodTimerSession, pause } = props
  let title = moodTimerSession ? 'Session' : 'Break'

  return(
    <div className="chronometer-container">
      <div className="chronometer">
        <h1 className="title">{title}</h1>
        <h2 className="time">{time}</h2>
      </div>
      <div className="icons-container">
        <FontAwesomeIcon icon={faPlay} onClick={play}/>
        <FontAwesomeIcon icon={faPause} onClick={pause}/>
        <FontAwesomeIcon icon={faArrowsRotate} onClick={resetCountersButton}/>
      </div>   
    </div>
  )
}

export default TimerContainer