import React from "react";
import TimerContainer from "./timerContainer.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'

class PageContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      breakLength: 1, 
      sessionLength: 1,
      time: '01:00',
      moodTimerSession: true,
    };
    this.increaseOrDecreaseBreakAndSessionLength = this.increaseOrDecreaseBreakAndSessionLength.bind(this);
    this.changeStateFromZeroToOneInBreak = this.changeStateFromZeroToOneInBreak.bind(this)
    this.changeStateFromZeroToOneInSession = this.changeStateFromZeroToOneInSession.bind(this)
    this.changeTimeSession = this.changeTimeSession.bind(this)
    this.play = this.play.bind(this)
    this.resetCountersButton = this.resetCountersButton.bind(this)
    this.pause = this.pause.bind(this)
    this.timerSession = null
  }

  increaseOrDecreaseBreakAndSessionLength(arrowType){

    const {sessionLength, breakLength} = this.state
    let counterBreak = breakLength
    let counterSession = sessionLength
  
    if(arrowType === 'break-arrow-up'){
      counterBreak ++
      counterBreak = counterBreak < 10 ? `0${counterBreak}` : counterBreak
    } else if(arrowType === 'break-arrow-down'){
      counterBreak --
      counterBreak = counterBreak < 10 ? `0${counterBreak}` : counterBreak
    } else if(arrowType === 'session-arrow-up'){
      counterSession ++
      counterSession = counterSession < 10 ? `0${counterSession}` : counterSession
    } else if(arrowType === 'session-arrow-down'){
      counterSession --
      counterSession = counterSession < 10 ? `0${counterSession}` : counterSession
    }

    this.setState({
      breakLength: counterBreak,
      sessionLength: counterSession,
      time: counterSession + ':00'
    })

    if(counterBreak <= 1){
      this.changeStateFromZeroToOneInBreak()
    }

    if(counterSession <= 1){
      this.changeStateFromZeroToOneInSession()
    }
  }

  changeStateFromZeroToOneInBreak(){
    this.setState({
      breakLength: 1
    })
  }

  changeStateFromZeroToOneInSession(){
    this.setState({
      sessionLength: 1,
      time: '01:00'
    })
  }

  changeTimeSession(){
      
    this.setState((prevState) =>{
      const {time, moodTimerSession, sessionLength, breakLength} = prevState
      
      let audio = "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      const sound = new Audio(audio)

      let splitedTime = time.split(":")
      let currentMinutes =  Number(splitedTime[0])
      let currentSeconds = Number(splitedTime[1])

      let minutes = currentMinutes
      let seconds = currentSeconds
      minutes = minutes < 10 ? `0${minutes}` : minutes

      if(seconds === 0){
        if(minutes > 0){
          minutes = minutes - 1
          seconds = 59
        }
      } else {
        seconds = seconds - 1
        seconds = seconds < 10 ? `0${seconds}` : seconds
      }

      let dataToUpdate = {
        time: `${minutes} : ${seconds}`
      }

      if(currentMinutes === 0 && currentSeconds === 0){
        sound.play()
        if(moodTimerSession){
          dataToUpdate.moodTimerSession = false
          dataToUpdate.time = `${breakLength} : 00`
        } else {
          dataToUpdate.moodTimerSession = true
          dataToUpdate.time = `${sessionLength} : 00`
        }
      }

      return dataToUpdate
    }) 
  } 

  play(){
    this.timerSession = setInterval(() => 
    this.changeTimeSession(),
    1000);
  }

  pause(){
    clearInterval(this.timerSession)
  }

  resetCountersButton(){
    this.setState({
      breakLength: 1, 
      sessionLength: 1,
      time: '01:00',
      moodTimerSession: true
    })
    clearInterval(this.timerSession)
  }
 
  render(){
    const {breakLength, sessionLength, time, moodTimerSession, styleBorder, styleColorFont} = this.state;

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
                <div className="break-arrow-down" onClick={()=> this.increaseOrDecreaseBreakAndSessionLength('break-arrow-down')}>
                  <FontAwesomeIcon key='icon-1' className="icon break-arrow-down-icon" icon={faArrowDown}/>
                </div>
                <p className="first-counter">{breakLength}</p>
                <div className="break-arrow-up" onClick={()=> this.increaseOrDecreaseBreakAndSessionLength('break-arrow-up')}>
                  <FontAwesomeIcon className="icon break-arrow-up-icon" icon={faArrowUp}/>
                </div>
              </div>
            </div>
            <div className="timer-two">
              <h3>Session Length</h3>
              <div className="controller">
                <div className="session-arrow-down" onClick={()=> this.increaseOrDecreaseBreakAndSessionLength('session-arrow-down')}>
                  <FontAwesomeIcon className="icon session-arrow-down-icon" icon={faArrowDown}/>
                </div>
                <p className="second-counter">{sessionLength}</p>
                <div className="session-arrow-up" onClick={()=> this.increaseOrDecreaseBreakAndSessionLength('session-arrow-up')}>
                  <FontAwesomeIcon className="icon session-arrow-up-icon" icon={faArrowUp}/>
                </div>
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
        pause={this.pause}
        styleBorder={styleBorder}
        styleColorFont={styleColorFont}
        />
      </div>
    )
  }
}

export default PageContainer