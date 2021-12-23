import { Typography } from '@mui/material';

function AddButton({ handleSubmit }) {
  return (
    <div className="add-button" onClick={handleSubmit}>
      <Typography variant="h4">+</Typography>
    </div>
  );
}

export default AddButton;
