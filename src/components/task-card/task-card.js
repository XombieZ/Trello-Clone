const TaskCard = ({ task }) => {
  return (
    <article className="task-card" draggable>
      <p>{task.title}</p>
    </article>
  );
};

export default TaskCard;
