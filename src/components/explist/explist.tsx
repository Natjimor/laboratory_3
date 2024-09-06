import './explist.css';
import { ExpenseData } from '../../../utils/types';
import inputOptions from '../../../utils/data'; 
import { SwipeableList, SwipeableListItem, LeadingActions, TrailingActions, SwipeAction } from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';

interface ListsectProps {
  expenses: ExpenseData[];
  selectedCategory: string;
  onEditExpense: (expense: ExpenseData) => void;
  onDeleteExpense: (amount: number) => void;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

const trailingActions = (amount: number, onDeleteExpense: (amount: number) => void) => (
  <TrailingActions>
    <SwipeAction
      destructive={true}
      onClick={() => onDeleteExpense(amount)}
    >
      <span style={{ backgroundColor: '#ff4343', color: 'white', fontSize: '110%', height: '90%', fontFamily: '"Nunito", sans-serif', fontWeight: '1000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        DELETE
      </span>
    </SwipeAction>
  </TrailingActions>
);

const leadingActions = (expense: ExpenseData, onEditExpense: (expense: ExpenseData) => void) => (
  <LeadingActions>
    <SwipeAction onClick={() => onEditExpense(expense)}>
      <span style={{ backgroundColor: '#005af6', color: 'white', fontSize: '110%', height: '90%', fontFamily: '"Nunito", sans-serif', fontWeight: '1000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        EDIT
      </span>
    </SwipeAction>
  </LeadingActions>
);

function Listsect({ expenses, selectedCategory, onEditExpense, onDeleteExpense }: ListsectProps) {
  const categoryImages = inputOptions.reduce((acc: { [key: string]: string }, option) => {
    acc[option.tittle] = option.image;
    return acc;
  }, {});

  const filteredExpenses = selectedCategory === ''
    ? expenses
    : expenses.filter(expense => expense.category === selectedCategory);

  return (
    <div className='listcontainer'>
      {filteredExpenses.length === 0 ? (
        <h2>NO EXPENSES...</h2>
      ) : (
        <>
          <h2>EXPENSE LIST</h2>
          <SwipeableList>
            {filteredExpenses.map((expense, index) => (
              <SwipeableListItem
                key={index}
                leadingActions={leadingActions(expense, onEditExpense)}
                trailingActions={trailingActions(expense.amount, onDeleteExpense)}
              >
                <div className='expense-item'>
                  <div className='image'>
                    <img 
                      src={categoryImages[expense.category]} 
                      alt={expense.category} 
                    />
                  </div>
                  <div className='text'>
                    <p className='category'>{expense.category}</p>
                    <p>{expense.name}</p>
                    <p>{formatDate(expense.date)}</p>
                  </div>
                  <div className='amount'>
                    <p>${expense.amount}</p>
                  </div>
                </div>
              </SwipeableListItem>
            ))}
          </SwipeableList>
        </>
      )}
    </div>
  );
}

export default Listsect;