import { useState } from 'react';
import './define.css';

function Definescreen({ onBudgetDefined }: { onBudgetDefined: (budget: number) => void }) {
  const [budget, setBudget] = useState<string>(''); // String para permitir la edición

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Permitir solo números positivos
    if (value === '' || (/^\d+$/.test(value) && parseFloat(value) >= 0)) {
      setBudget(value);
    }
  };

  const handleButtonClick = () => {
    const budgetValue = parseFloat(budget);
    if (budgetValue > 0) {
      onBudgetDefined(budgetValue);
    }
  };

  return (
    <>
      <section className='sectionform'>
        <div className='container'>
          <h2>DEFINE BUDGET</h2>
          <input 
            type='number' 
            value={budget} 
            onChange={handleInputChange}
            placeholder="0"
          />
          <button 
            disabled={budget === '' || parseFloat(budget) <= 0} 
            onClick={handleButtonClick}
          >
            DEFINE BUDGET
          </button>
        </div>
      </section>
    </>
  );
}

export default Definescreen;