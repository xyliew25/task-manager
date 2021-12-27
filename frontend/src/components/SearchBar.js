import './../App.css';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

function SearchBar() {
  return (
    <form className="search-bar">
      <input 
        type="text" 
        placeholder="Search..." 
        className="form-field search"
      />
      <button type="submit" className="form-btn">
        <SearchOutlinedIcon />
      </button>
    </form>
  );
}

export default SearchBar;
