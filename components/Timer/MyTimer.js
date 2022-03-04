import { useTimer } from "react-timer-hook";
import { useEffect } from "react";

export default function MyTimer({ expired, newExpiry = false, duration, rerender = false }) {
  const expiryTimestamp = newExpiry === false ? expired : newExpiry
  const time = new Date();
  time.setSeconds(time.getSeconds() + duration * 60);
  const {
    seconds,
    minutes,
    hours,
    restart
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });

  useEffect(() => {
    if (newExpiry !== false) {
      restart(expiryTimestamp)
    }
  }, [rerender])
  return (
    <div className={`${minutes === 0 && hours === 0 ? 'text-red-1' : 'text-blue-1'} text-center font-bold text-xl`}>
      <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
    </div>
  );
}
