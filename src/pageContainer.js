import React from "react";
import TimerContainer from "./timerContainer.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faL } from '@fortawesome/free-solid-svg-icons'

/* let minutesSession = null
let minutesBreak = null */


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
/*     this.displayTimerSession = this.displayTimerSession.bind(this) */
    this.timerSession = null
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

 /*  componentDidMount(){
    this.timerSession = setInterval(() => 
      this.changeTimeSession(),
      1000);
  } */

  changeTimeSession(){
    const {time, moodTimerSession, sessionLength, breakLength} = this.state
    
    /* let moodTimer = null 
    let minutesBreak = breakLength
     if(seconds === 0 || seconds === '00'){

       if(minutesSession > 0){
          moodTimer = true
          minutesSession = minutesSession - 1
          minutesSession = minutesSession < 10 ? `0${minutesSession}` : minutesSession
          seconds = 5
        } else if(minutesSession === '00' && minutesBreak !== '00') {
          moodTimer = false
          minutesBreak = minutesBreak - 1
          minutesBreak = minutesBreak < 10 ? `0${minutesBreak}` : minutesBreak
          seconds = 5
        } else if(minutesBreak === '00'){
          clearInterval(this.timerSession)
          return this.play()
        }
      } else {
        seconds = seconds - 1   
      } 
      this.setState({
        moodTimerSession: moodTimer
      })
      this.displayTimerSession(minutes, seconds)
      */
      let splitedTime = time.split(":")
      let currentMinutes =  Number(splitedTime[0])
      let currentSeconds = Number(splitedTime[1])

      let minutes = currentMinutes
      let seconds = currentSeconds


      this.setState((prevState, state) =>{

        if(seconds === 0){
          if(minutes > 0){
            minutes = minutes - 1
            seconds = 59
          }
        } else {
          seconds = seconds - 1
        }

        let dataToUpdate = {
          time: `${minutes} : ${seconds}`, 
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
        console.log('data to update', dataToUpdate)
        return dataToUpdate
      })
       
  } 

  /* displayTimerSession(minutes, seconds){

    /* let minutes = moodTimerSession ? minutesSession : minutesBreak
    minutesSession = minutesSession > 10
    seconds = seconds < 10 ? `0${seconds}` : seconds

   
  } */

  play(){

    this.timerSession = setInterval(() => 
    this.changeTimeSession(),
    1000);

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