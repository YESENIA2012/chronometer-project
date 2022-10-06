import React from "react";
import TimerContainer from "./timerContainer.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faL } from '@fortawesome/free-solid-svg-icons'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'

let minutes = null
let seconds = null

class PageContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      breakLength: 5, 
      sessionLength: 25,
      time: '25:00',
      moodTimerSession: true,
    };
    this.incrementCounterBreak = this.incrementCounterBreak.bind(this);
    this.decrementCounterBreak = this.decrementCounterBreak.bind(this);
    this.changeStateFromZeroToOneInBreak = this.changeStateFromZeroToOneInBreak.bind(this)
    this.incrementCounterSession = this.incrementCounterSession.bind(this);
    this.decrementCounterSession = this.decrementCounterSession.bind(this);
    this.changeStateFromZeroToOneInSession = this.changeStateFromZeroToOneInSession.bind(this)
    this.changeTime = this.changeTime.bind(this)
    this.play = this.play.bind(this)
    this.resetCountersButton = this.resetCountersButton.bind(this)
    this.displayTimer = this.displayTimer.bind(this)
    this.timer = null
  }

  incrementCounterBreak(){
    this.setState({
      breakLength: this.state.breakLength + 1
    })   
  }

  decrementCounterBreak(){
    const {breakLength} = this.state

    this.setState({
      breakLength: breakLength - 1
    })

    if(breakLength <= 1){
      this.changeStateFromZeroToOneInBreak()
    }
  }

  changeStateFromZeroToOneInBreak(){
    this.setState({
      breakLength: 1
    })
  }

  incrementCounterSession(){
    this.setState({
      sessionLength: this.state.sessionLength + 1,
      time: this.state.sessionLength + 1 + ':00'
    }) 
  }

  decrementCounterSession(){
    const {sessionLength} = this.state

    this.setState({
      sessionLength: sessionLength - 1,
      time: this.state.sessionLength - 1 + ':00'
    })

    if(sessionLength <= 1){
      this.changeStateFromZeroToOneInSession()
    }
  }

  changeStateFromZeroToOneInSession(){
    this.setState({
      sessionLength: 1
    })
  }

  changeTime(){

    let moodTimer = null
    minutes =  this.state.sessionLength
    seconds = 0

    this.timer = setInterval(()=>{
      
      if(seconds === 0 || seconds === '00'){
        if(minutes !== 0){
          moodTimer = true
          minutes = minutes - 1
          minutes = minutes < 10 ? `0${minutes}` : minutes
          seconds = 59
        } else {
          moodTimer = false
        }
      } else {
        seconds = seconds - 1
      }

      this.setState({
        moodTimerSession: moodTimer
      })

      this.displayTimer()
      
    }, 1000)
  } 

  displayTimer(){
    seconds = seconds < 10 ? `0${seconds}` : seconds
    console.log('estos son los minutos', minutes)

    this.setState({
      time: `${minutes} : ${seconds}`
    })
  }

  play(){
    this.changeTime()
  }

  resetCountersButton(){
    this.setState({
      breakLength: 5, 
      sessionLength: 25,
      time: '25:00'
    })
    clearInterval(this.timer)
  }

 
  render(){
    const {breakLength, sessionLength, time, moodTimerSession} = this.state;


    return(
      <div className="page-body">
        <div className="counters-container">
          <header>
            <h1>Chronometer</h1>
          </header>
          <section className="modify-timer">
            <div className="timer-one">
              <h3>Break Length</h3>
              <div className="controller">
                <FontAwesomeIcon className="icon" icon={faArrowDown} onClick={this.decrementCounterBreak}/>
                <p className="first-counter">{breakLength}</p>
                <FontAwesomeIcon className="icon" icon={faArrowUp} onClick={this.incrementCounterBreak}/>
              </div>
            </div>
            <div className="timer-two">
              <h3>Session Length</h3>
              <div className="controller">
                <FontAwesomeIcon className="icon" icon={faArrowDown} onClick={this.decrementCounterSession}/>
                <p className="second-counter">{sessionLength}</p>
                <FontAwesomeIcon className="icon" icon={faArrowUp} onClick={this.incrementCounterSession}/>
              </div>
            </div>
          </section>
        </div>
        <TimerContainer 
        time={time}
        breakLength={breakLength}
        sessionLength={sessionLength}
        play={this.play}
        resetCountersButton={this.resetCountersButton}
        moodTimerSession={moodTimerSession}
        />
      </div>
    )
  }
}

export default PageContainer