import { connect } from 'react-redux';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { toggleSearch, toggleAdd } from './../redux/buttons/actions';

function Buttons({ toggleSearch, toggleAdd }) {
  return (
    <div className="btn-container">
      <LightbulbOutlinedIcon className="side-btn" fontSize="large" />
      <SearchOutlinedIcon className="side-btn" fontSize="large" onClick={toggleSearch} />
      <AddOutlinedIcon className="side-btn" fontSize="large" onClick={toggleAdd} />
    </div>
  );
}

const mapDispatchToProps = {
  toggleSearch,
  toggleAdd
}

export default connect(null, mapDispatchToProps)(Buttons);
