import SearchBar from "./SearchBar";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

function Content() {
  return (
    <div className="content">
      <SearchBar />
      <TaskForm />
      <TaskList />
    </div>
  );
}

export default Content;
