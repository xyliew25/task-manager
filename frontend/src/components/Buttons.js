import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

function Buttons({ handleSubmit }) {
  return (
    <div className="btn-container">
      <LightbulbOutlinedIcon className="side-btn" fontSize="large" />
      <SearchOutlinedIcon className="side-btn" fontSize="large" />
      <AddOutlinedIcon className="side-btn" fontSize="large" onClick={handleSubmit} />
    </div>
  );
}

export default Buttons;
