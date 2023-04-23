import { formatTime } from '../../utils';

type barProps = {
  currentTime: number;
  duration: number;
}

export default function ProgressBar({currentTime, duration} : barProps) : JSX.Element {

  const timeLeft = formatTime(duration - currentTime);
  const percentage = (currentTime / duration) * 100;

  return (
    <div className="player__controls-row">
      <div className="player__time">
        <progress className="player__progress" value={percentage} max="100"></progress>
        <div className="player__toggler" style={{left: `${percentage}%`}}>Toggler</div>
      </div>
      <div className="player__time-value">{timeLeft}</div>
    </div>
  );
}

