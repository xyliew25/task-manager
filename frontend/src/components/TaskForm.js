import './../App.css';
import { useState } from 'react';
import { connect } from 'react-redux';
import { createTask, updateTask } from '../redux/tasks/actions';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

function TaskForm({ initialFormFields, createTask, updateTask, exitEditMode, isOpenAdd }) {
  const emptyFormFields = {
    title: "",
    desc: "",
    tag: ""
  };
  const [formFields, setFormFields] = useState(initialFormFields ? initialFormFields : emptyFormFields);

  const handleChange = e => {
    setFormFields({
      ...formFields,
      [e.target.name]: e.target.value
    });
  }
  const handleSubmit = e => {
    e.preventDefault();
    if (initialFormFields) {
      const taskToUpdate = JSON.stringify(formFields);
      updateTask(formFields.id, taskToUpdate);
      exitEditMode();
    } else {
      const newTask = JSON.stringify({ ...formFields, isDone: false });
      createTask(newTask);
    }
    setFormFields(emptyFormFields);
  }

  return (
    <form 
      onSubmit={e => handleSubmit(e)} 
      className={isOpenAdd ? (initialFormFields ? "edit-form" : "form") : "display-none"}
    >
      <span className="row">
        <input
          type="text"
          className="form-field task-tag"
          name="tag"
          value={formFields?.tag}
          onChange={e => handleChange(e)}
          placeholder="Add tag..."
        />
        {initialFormFields
          ?
          <span>
            <button type="submit" className="form-btn">
              <EditOutlinedIcon />
            </button>
            <button className="form-btn">
              <DeleteOutlinedIcon />
            </button>
          </span>
          :
          <button type="submit" className="form-btn">
            <AddOutlinedIcon />
          </button>
        }
      </span>
      <input
        type="text"
        className="form-field task-title-form"
        name="title"
        value={formFields?.title}
        onChange={e => handleChange(e)}
        placeholder="Add title..."
      />
      <input
        type="text"
        className="form-field task-desc"
        name="desc"
        value={formFields?.desc}
        onChange={e => handleChange(e)}
        placeholder="Add description..."
      />
    </form>
  );
}

const mapStateToProps = state => ({
  isOpenAdd: state.buttons.isOpenAdd
});

const mapDispatchToProps = {
  createTask,
  updateTask
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
