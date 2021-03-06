import './../App.css';
import { useState } from 'react';
import { connect } from 'react-redux';
import { createTask, deleteTask, updateTask } from '../redux/tasks/actions';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

function TaskForm({ initialFormFields, createTask, deleteTask, updateTask, exitEditMode }) {
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
    if (formFields.title !== "") {
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
  }
  const handleDelete = () => {
    deleteTask(formFields.id);
  }

  return (
    <form 
      onSubmit={e => handleSubmit(e)} 
      className={initialFormFields ? "edit-form" : "form"}
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
            <button type="button" className="form-btn">
              <DeleteOutlinedIcon onClick={handleDelete} />
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
        autoFocus
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

const mapDispatchToProps = {
  createTask,
  deleteTask,
  updateTask
};

export default connect(null, mapDispatchToProps)(TaskForm);
