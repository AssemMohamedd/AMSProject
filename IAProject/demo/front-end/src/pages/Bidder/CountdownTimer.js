import React, { useState, useEffect } from 'react'; 
 
function CountdownTimer({ endTime }) { 
  const [timeLeft, setTimeLeft] = useState(getTimeLeft()); 
 
  useEffect(() => { 
    const intervalId = setInterval(() => { 
      setTimeLeft(getTimeLeft()); 
    }, 1000); 
 
    return () => clearInterval(intervalId); 
  }, [endTime]); 
 
  function getTimeLeft() { 
    const difference = new Date(endTime) - new Date(); 
    const totalSeconds = difference / 1000; 
 
    if (totalSeconds <= 0) { 
      return { 
        days: 0, 
        hours: 0, 
        minutes: 0, 
        seconds: 0, 
      }; 
    } 
 
    const days = Math.floor(difference / (1000 * 60 * 60 * 24)); 
    const hours= Math.floor((difference / (1000 * 60 * 60)) % 24); 
    const minutes= Math.floor((difference / 1000 / 60) % 60); 
    const seconds= Math.floor((difference / 1000) % 60); 
 
 
    return { 
      days, 
      hours, 
      minutes, 
      seconds, 
    }; 
  } 
 
  const { days, hours, minutes, seconds } = timeLeft; 
 
  return ( 
    <div> 
      
      <p> 
        {days} days, {hours} hours, {minutes} minutes, {seconds} seconds 
      </p> 
    </div> 
  ); 
} 
 
export default CountdownTimer;