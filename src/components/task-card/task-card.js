const TaskCard = ({ task }) => {
  return (
    <article className="task-card">
      <p>{task.title}</p>
    </article>
  );
};

export default TaskCard;
