import './filter.css';
import inputOptions from '../../../utils/data';

interface FiltersectProps {
  setSelectedCategory: (category: string) => void;
}

function Filtersect({ setSelectedCategory }: FiltersectProps) {
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className='filtercontainer'>
      <p>FILTER CATEGORIES</p>
      <select name="filter" onChange={handleCategoryChange}>
        <option value="">--ALL CATEGORIES--</option>
        {inputOptions.map(option => (
          <option key={option.tittle} value={option.tittle}>
            {option.tittle}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filtersect;