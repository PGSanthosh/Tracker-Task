import Task from "./Task";
const Tasks = ({ task, onDelete, onToggle }) => {
  return (
    <>
      {task.map((ele) => (
        <Task key={ele.id} task={ele} onDelete={onDelete} onToggle={onToggle} />
      ))}
    </>
  );
};
export default Tasks;
