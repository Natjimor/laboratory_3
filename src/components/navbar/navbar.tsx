import './navbar.css';

interface NavbarProps {
  showResetButton: boolean;
  onReset: () => void; // Añadir la prop para resetear
}

function Navbar({ showResetButton, onReset }: NavbarProps) {
  return (
    <nav>
      <h1 className='tittle'>EXPENSE PLANNER</h1>
      {showResetButton && <button className='button' onClick={onReset}>RESET APP</button>}
    </nav>
  );
}

export default Navbar;