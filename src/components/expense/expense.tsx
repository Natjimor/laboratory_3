import './expense.css';
import Expendedsect from '../expended/expended';
import Filtersect from '../filter/filter';
import Listsect from '../explist/explist';
import ButtonM from '../button/button';
import { ExpenseData } from '../../../utils/types';

interface ExpenseScreenProps {
  budget: number;
  onButtonClick: () => void;
  expense: number;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  expenses: ExpenseData[];
  onEditExpense: (expense: ExpenseData) => void;
  onDeleteExpense: (amount: number) => void;
}

function ExpenseScreen({ budget, onButtonClick, expense, selectedCategory, setSelectedCategory, expenses, onEditExpense, onDeleteExpense }: ExpenseScreenProps): JSX.Element {
  const remaining = budget - expense; // Calcula el remaining aquí

  return (
    <div className='screen'>
      <Expendedsect budget={budget} expense={expense} remaining={remaining} /> {/* Pasa remaining aquí */}
      <Filtersect setSelectedCategory={setSelectedCategory} />
      <Listsect
        expenses={expenses}
        selectedCategory={selectedCategory}
        onEditExpense={onEditExpense}
        onDeleteExpense={onDeleteExpense}
      />
      <ButtonM onClick={onButtonClick} />
    </div>
  );
}

export default ExpenseScreen;