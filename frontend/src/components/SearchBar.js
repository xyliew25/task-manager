import './../App.css';
import { useState } from 'react';
import { connect } from 'react-redux';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { searchTask } from './../redux/tasks/actions';

function SearchBar({ searchTask }) {
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
      className={"search-bar"}
      onSubmit={e => handleSubmit(e)}
    >
      <input 
        type="text" 
        placeholder="Search..." 
        className="form-field search"
        name="keyword"
        value={keyword}
        onChange={e => handleChange(e)}
        autoFocus
      />
      <button type="submit" className="form-btn">
        <SearchOutlinedIcon />
      </button>
    </form>
  );
}

const mapDispatchToProps = {
  searchTask
}

export default connect(null, mapDispatchToProps)(SearchBar);
