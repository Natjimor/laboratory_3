import './button.css';

interface ButtonMProps {
  onClick: () => void; // Asegúrate de que el prop onClick esté definido aquí
}

function ButtonM({ onClick }: ButtonMProps): JSX.Element {
  return (
    <button id='buttonModal' onClick={onClick}>+</button>
  );
}

export default ButtonM;