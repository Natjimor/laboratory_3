import './progress.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface ProgressProps {
  budget: number;
  expense: number;
}

function Progress({ budget, expense }: ProgressProps) {
  const percentage = budget > 0 ? (expense / budget) * 100 : 0;

  return (
    <>
      <div style={{ width: 280, height: 280, marginBottom: 30, marginTop:30}}>
        <CircularProgressbar value={percentage} text={`${Math.round(percentage)}% EXPENDED`} />
      </div>
    </>
  );
}

export default Progress;
