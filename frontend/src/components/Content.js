import { connect } from 'react-redux';
import SearchBar from "./SearchBar";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

function Content({ isOpenSearch, isOpenAdd }) {
  return (
    <div className="content">
      {isOpenSearch && <SearchBar />}
      {isOpenAdd && <TaskForm />}
      <TaskList />
    </div>
  );
}

const mapStateToProps = state => ({
  isOpenSearch: state.buttons.isOpenSearch,
  isOpenAdd: state.buttons.isOpenAdd
})

export default connect(mapStateToProps, null)(Content);
