import './../App.css';
import { connect } from 'react-redux';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

function SearchBar({ isOpenSearch }) {
  return (
    <form className={isOpenSearch ? "search-bar" : "display-none"}>
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

const mapStateToProps = state => ({
  isOpenSearch: state.buttons.isOpenSearch
});

export default connect(mapStateToProps, null)(SearchBar);
