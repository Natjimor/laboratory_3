import { useState, useRef, useEffect } from 'react';
import './modal.css';
import inputOptions from '../../../utils/data';
import { ExpenseData } from '../../../utils/types';

interface ModalSectProps {
  onClose: (amount: number | null, expenseData?: ExpenseData) => void;
  remaining: number;
  expenseToEdit?: ExpenseData;
}

function ModalSect({ onClose, remaining, expenseToEdit }: ModalSectProps) {
  const todayDate = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    category: '',
    date: todayDate,
  });

  useEffect(() => {
    if (expenseToEdit) {
      setFormData({
        name: expenseToEdit.name,
        amount: expenseToEdit.amount.toString(),
        category: expenseToEdit.category,
        date: expenseToEdit.date,
      });
    }
  }, [expenseToEdit]);

  const modalRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const amount = Number(formData.amount);
    const expenseData: ExpenseData = {
      name: formData.name,
      amount,
      category: formData.category,
      date: formData.date,
      image: inputOptions.find(option => option.tittle === formData.category)?.image || '',
    };
    onClose(amount, expenseData);
  };

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      // Solo cerrar el modal si no hay datos de gasto a editar
      if (!expenseToEdit) {
        onClose(null);
      } else {
        onClose(expenseToEdit.amount, expenseToEdit);
      }
    }
  };

  const isFormValid = () => {
    return (
      formData.name.trim() !== '' &&
      formData.amount.trim() !== '' &&
      Number(formData.amount) > 0 &&
      formData.category.trim() !== '' &&
      formData.date.trim() !== ''
    );
  };

  return (
    <section id='sectionmodal' onClick={handleBackgroundClick}>
      <div className='containermodal' ref={modalRef}>
        <h2>{expenseToEdit ? 'EDIT EXPENSE' : 'NEW EXPENSE'}</h2>
        <hr />
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">EXPENSE NAME</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="ENTER EXPENSE NAME"
            required
          />
          <label htmlFor="amount">AMOUNT</label>
          <input
            type="number"
            name="amount"
            id="amount"
            value={formData.amount}
            onChange={handleInputChange}
            placeholder="0"
            min="0"
            max={remaining} // Asegúrate de que el monto no exceda el presupuesto
            required
          />
          <label htmlFor="category">CATEGORY</label>
          <select
            name="category"
            id="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            <option value="">--SELECT--</option>
            {inputOptions.map(option => (
              <option key={option.tittle} value={option.tittle}>
                {option.tittle}
              </option>
            ))}
          </select>
          <label htmlFor="date">EXPENSE DATE</label>
          <input
            type="date"
            name="date"
            id="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
          <button type="submit" disabled={!isFormValid()}>
            {expenseToEdit ? 'UPDATE EXPENSE' : 'REGISTER EXPENSE'}
          </button>
        </form>
      </div>
    </section>
  );
}

export default ModalSect;