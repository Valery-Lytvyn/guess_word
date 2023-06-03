import { MAX_MISTAKES } from "../../constants/constants";
import "./failedAttempts.scss";

interface FailedAttemptsProps {
  mistakes: number;
}

function FailedAttempts({ mistakes }: FailedAttemptsProps) {
  const isShow = mistakes > 0 && mistakes < MAX_MISTAKES;
  return (
    <>
      {isShow && (
        <div className="failCounter">
          <span>mistakes:</span>
          <div className="failCounterValue"> {mistakes}</div>
        </div>
      )}
    </>
  );
}

export default FailedAttempts;
