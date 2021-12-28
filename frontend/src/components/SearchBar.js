import './../App.css';
import { useState } from 'react';
import { connect } from 'react-redux';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { searchTask } from './../redux/tasks/actions';

function SearchBar({ isOpenSearch, searchTask }) {
  const [keyword, setKeyword] = useState("");

  const handleChange = e => {
    setKeyword(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    searchTask(keyword);
  };

  return (
    <form 
      className={isOpenSearch ? "search-bar" : "display-none"}
      onSubmit={e => handleSubmit(e)}
    >
      <input 
        type="text" 
        placeholder="Search..." 
        className="form-field search"
        name="keyword"
        value={keyword}
        onChange={e => handleChange(e)}
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

const mapDispatchToProps = {
  searchTask
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
