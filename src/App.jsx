import { useState } from 'react';
import './App.css'
import { useEffect } from 'react';

const App = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, seTtimeLeft] = useState(1500);
  const [timingType, setTimingtype] = useState("SESSION");
  
  const [play, setPlay] = useState(false);
  
  const timer = setTimeout(() => {
    if(timeLeft && play){
      seTtimeLeft(timeLeft - 1)
    }
  }, 1000);
  
  const incBreakLength = () => {
    if(breakLength < 60){
      setBreakLength(breakLength + 1)
    }
  }
  
  const decBreakLength = () => {
    if(breakLength > 1){
      setBreakLength(breakLength - 1)
    }
  }
  
   const incSessionLength = () => {
    if(sessionLength < 60){
      setSessionLength(sessionLength + 1)
      seTtimeLeft(timeLeft + 60)
    }
  }
  
  const decSessionLength = () => {
    if(sessionLength > 1){
      setSessionLength(sessionLength - 1)
      seTtimeLeft(timeLeft - 60)
    }
  }
  
  const reset = () => {
    clearTimeout(timer);
    setPlay(false);
    seTtimeLeft(1500);
    setBreakLength(5);
    setSessionLength(25);
    setTimingtype("SESSION");
    const audio = document.getElementById("beep");
    audio.pause()
    audio.currentTime = 0;
  }
  
  const handleStartStop = () => {
    clearTimeout(timer);
    setPlay(!play);
  }
  
  const resetTimer = () => {
    const audio = document.getElementById("beep");
    if(!timeLeft && timingType === "SESSION"){
      seTtimeLeft(breakLength * 60)
      setTimingtype("BREAK")
      audio.play()
    }
    if(!timeLeft && timingType === "BREAK"){
      seTtimeLeft(sessionLength * 60)
      setTimingtype("SESSION")
      audio.pause()
      audio.currentTime = 0;
    }
  }
  
  const clock = () => {
    if(play){
      timer
      resetTimer()
    }else {
      clearTimeout(timer)
    }
  }
  
  useEffect(() => {
    clock()
  }, [play, timeLeft, timer])
 
  const updateTimer = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${formattedMinutes}:${formattedSeconds}`;
  }
  
  const title = timingType === "SESSION" ? "Session" : "Break";
  
 return (
  <div className="container">
    <div className="display">
      <h2 className="title">25 + 5 Clock</h2>
      <div className="lengths">

        <div className="break">
          <p id="break-label">Break Length</p>
          <div>
            <a id="break-decrement" onClick={decBreakLength} disabled={play}>
              <i className="fa fa-arrow-down fa-2x"/>
            </a>
            <span id="break-length">{breakLength}</span>
            <a disabled={play} onClick={incBreakLength} id="break-increment">
              <i className="fa fa-arrow-up fa-2x"/>
            </a>
          </div>
        </div>

        <div className="session">
          <p id="session-label">Session Length</p>
          <div>
            <a disabled={play} id="session-decrement" onClick={decSessionLength}>
              <i className="fa fa-arrow-down fa-2x"/>
            </a>
            <span id="session-length">{sessionLength}</span>
            <a disabled={play} onClick={incSessionLength} id="session-increment">
              <i className="fa fa-arrow-up fa-2x"/>
            </a>
          </div>
        </div>

      </div>

      <div className="timer">
        <p className="heading" id="timer-label">{title}</p>
        <h3 className="clock" id="time-left">{updateTimer()}</h3>
      </div>

      <div className="buttons">
        <a onClick={handleStartStop} className="play_pause" id="start_stop">
          <i className="fa fa-play fa-2x"/>
          <i className="fa fa-pause fa-2x"/>
        </a>

        <a onClick={reset} id="reset">
          <i className="fa fa-refresh fa-2x"/>
        </a>
      </div>

      <audio id="beep" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav" preload="auto"/>

    </div>
  </div>
); 
}

export default App
