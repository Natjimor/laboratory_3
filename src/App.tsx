import { useState } from 'react';
import Navbar from './components/navbar/navbar';
import Definescreen from './components/define/define';
import ExpenseScreen from './components/expense/expense';
import ModalSect from './components/modal/modal';
import { ExpenseData } from '../utils/types';

function App() {
  const [showExpenseScreen, setShowExpenseScreen] = useState(false);
  const [budget, setBudget] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);
  const [totalExpense, setTotalExpense] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [expenses, setExpenses] = useState<Array<ExpenseData>>([]);
  const [expenseToEdit, setExpenseToEdit] = useState<ExpenseData | undefined>(undefined);

  const handleBudgetDefined = (budgetValue: number) => {
    setBudget(budgetValue);
    setShowExpenseScreen(true);
  };

  const handleShowModal = () => {
    setExpenseToEdit(undefined); // Resetea el gasto a editar cuando se abre el modal para crear un nuevo gasto
    setShowModal(true);
  };

  const handleCloseModal = (expenseValue: number | null, expenseData?: ExpenseData) => {
    if (expenseValue !== null && expenseData) {
      if (expenseToEdit) {
        // Calcula la diferencia entre el nuevo monto y el monto antiguo
        const amountDifference = expenseValue - (expenseToEdit.amount || 0);
  
        // Actualiza los gastos existentes
        setExpenses(prevExpenses => prevExpenses.map(exp =>
          exp === expenseToEdit ? { ...expenseData, amount: expenseValue } : exp
        ));
  
        // Actualiza el total de gastos y el presupuesto restante
        setTotalExpense(prevTotal => prevTotal + amountDifference);
      } else {
        // Añade un nuevo gasto
        setTotalExpense(prevExpense => prevExpense + expenseValue);
        setExpenses(prevExpenses => [...prevExpenses, expenseData]);
      }
    } else if (expenseToEdit) {
      // Si no hay datos de gasto pero hay un gasto a editar, simplemente remueve el gasto
      setExpenses(prevExpenses => prevExpenses.filter(exp => exp !== expenseToEdit));
      setTotalExpense(prevTotal => prevTotal - (expenseToEdit.amount || 0));
    }
    setShowModal(false);
  };
  
  const handleReset = () => {
    setBudget(0);
    setTotalExpense(0);
    setExpenses([]);
    setSelectedCategory('');
    setShowExpenseScreen(false);
  };

  const handleDeleteExpense = (amount: number) => {
    setTotalExpense(prevTotal => prevTotal - amount);
    setExpenses(prevExpenses => prevExpenses.filter(exp => exp.amount !== amount));
  };

  const handleEditExpense = (expense: ExpenseData) => {
    setExpenseToEdit(expense);
    setShowModal(true);
  };

  return (
    <>
      <Navbar showResetButton={showExpenseScreen} onReset={handleReset} />
      {!showExpenseScreen && (
        <Definescreen onBudgetDefined={handleBudgetDefined} />
      )}
      {showExpenseScreen && (
        <>
          <ExpenseScreen
            budget={budget}
            onButtonClick={handleShowModal}
            expense={totalExpense}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            expenses={expenses}
            onEditExpense={handleEditExpense}
            onDeleteExpense={handleDeleteExpense}
          />
          {showModal && (
            <ModalSect
              onClose={handleCloseModal}
              expenseToEdit={expenseToEdit}
              remaining={budget - totalExpense}
            />
          )}
        </>
      )}
    </>
  );
}

export default App;