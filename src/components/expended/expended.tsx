import Progress from '../progress/progress';
import './expended.css';

interface ExpendedsectProps {
  budget: number;
  expense: number;
  remaining: number; // Añadido aquí
}

function Expendedsect({ budget, expense, remaining }: ExpendedsectProps) { // Incluye remaining aquí
  return (
    <>
      <div className='expcontainer'>
        <div className='left'>
          <Progress budget={budget} expense={expense} />
        </div>
        <div className='right'>
          <div className='text'>
            <p className='tittleB'>BUDGET: </p>
            <p className='tittleT'>$ {budget}</p>
          </div>
          <div className='text'>
            <p className='tittleB'>REMAINING: </p>
            <p className='tittleT'>$ {remaining}</p>
          </div>
          <div className='text'>
            <p className='tittleB'>EXPENSE: </p>
            <p className='tittleT'>$ {expense}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Expendedsect;