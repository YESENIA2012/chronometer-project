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
    this.incrementCounterBreak = this.incrementCounterBreak.bind(this);
    this.decrementCounterBreak = this.decrementCounterBreak.bind(this);
    this.changeStateFromZeroToOneInBreak = this.changeStateFromZeroToOneInBreak.bind(this)
    this.incrementCounterSession = this.incrementCounterSession.bind(this);
    this.decrementCounterSession = this.decrementCounterSession.bind(this);
    this.changeStateFromZeroToOneInSession = this.changeStateFromZeroToOneInSession.bind(this)
    this.changeTimeSession = this.changeTimeSession.bind(this)
    this.play = this.play.bind(this)
    this.resetCountersButton = this.resetCountersButton.bind(this)
    this.pause = this.pause.bind(this)
    this.timerSession = null
  }

  incrementCounterBreak(e){

    const {sessionLength, breakLength} = this.state

    let counterBreak = breakLength
    let counterSession = sessionLength

    let attribute = e.target.attributes.class.value
    attribute = attribute.split(' ')
    let elementClicked = attribute[3]

    if(elementClicked === 'break-arrow-up-icon'){
      counterBreak ++
    } else if(elementClicked === 'session-arrow-up-icon'){
      counterSession ++
    }

    this.setState({
      breakLength: counterBreak,
      sessionLength: counterSession,
      time: sessionLength + 1 + ':00'
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
      
    }) 
  }

  decrementCounterSession(){
    const {sessionLength} = this.state

    this.setState({
      sessionLength: sessionLength - 1,
      time: sessionLength - 1 + ':00'
    })

    if(sessionLength <= 1){
      this.changeStateFromZeroToOneInSession()
    }
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
                <div className="break-arrow-down">
                  <FontAwesomeIcon key='icon-1' className="icon break-arrow-down-icon" icon={faArrowDown} onClick={this.decrementCounterBreak}/>
                </div>
                <p className="first-counter">{breakLength}</p>
                <div className="break-arrow-up">
                  <FontAwesomeIcon className="icon break-arrow-up-icon" icon={faArrowUp} onClick={this.incrementCounterBreak}/>
                </div>
              </div>
            </div>
            <div className="timer-two">
              <h3>Session Length</h3>
              <div className="controller">
                <div className="session-arrow-down">
                  <FontAwesomeIcon className="icon session-arrow-down-icon" icon={faArrowDown} onClick={this.decrementCounterSession}/>
                </div>
                <p className="second-counter">{sessionLength}</p>
                <div className="session-arrow-up">
                  <FontAwesomeIcon className="icon session-arrow-up-icon" icon={faArrowUp} onClick={this.incrementCounterBreak}/>
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
        />
      </div>
    )
  }
}

export default PageContainer